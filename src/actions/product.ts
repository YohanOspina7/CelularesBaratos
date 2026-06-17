import type { ProductInput } from "../interfaces";
import { supabase } from "../supabase/client";

export const getProducts = async (page: number) => {
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const {
    data: products,
    error,
    count,
  } = await supabase
    .from("products")
    .select("*, variants(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return { products, count };
};

export const getFilteredProducts = async ({
  page = 1,
  brands = [],
}: {
  page: number;
  brands: string[];
}) => {
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("products")
    .select("*, variants(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (brands.length > 0) {
    query = query.in("brand", brands);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return { data, count };
};

export const getRecentProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return products;
};

export const getRandomProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .limit(20);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  // Seleccionar 4 productos al azar
  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);

  return randomProducts;
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const searchProducts = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .ilike("name", `%${searchTerm}%`); // Buscar productos cuyo nombre contenga el termino de busqueda

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
};

// ADMINISTRADOR
export const createProduct = async (productInput: ProductInput) => {
  try {
    // 1. Crear el producto para obtener el ID del producto
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        name: productInput.name,
        brand: productInput.brand,
        slug: productInput.slug,
        features: productInput.features,
        description: productInput.description,
        images: [],
      })
      .select()
      .single();

    if (productError) throw new Error(productError.message);

    // 2. Subir las imagenes al bucket dentro de una carpeta que se creará a partir del producto
    const folderName = product.id;

    const uploadedImages = await Promise.all(
      productInput.images.map(async (image) => {
        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(`${folderName}/${product.id}-${image.name}`, image);

        if (error) throw new Error(error.message);

        const imageUrl = `${
          supabase.storage.from("product-images").getPublicUrl(data.path).data
            .publicUrl
        }`;

        return imageUrl;
      }),
    );

    // 3. Actualizar el producto con las imagenes subidas
    const { error: updatedError } = await supabase
      .from("products")
      .update({
        images: uploadedImages,
      })
      .eq("id", product.id);

    if (updatedError) throw new Error(updatedError.message);

    // 4. Crear las variantes del producto
    const variants = productInput.variants.map((variant) => ({
      product_id: product.id,
      stock: variant.stock,
      price: variant.price,
      storage: variant.storage,
      color: variant.color,
      color_name: variant.color_name,
    }));

    const { error: variantError } = await supabase
      .from("variants")
      .insert(variants);

    if (variantError) throw new Error(variantError.message);

    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el producto, vuelva a intentarlo");
  }
};

export const deleteProduct = async (productId: string) => {
  // 1. Eliminar las variantes del producto
  const { error: variantsError } = await supabase
    .from("variants")
    .delete()
    .eq("product_id", productId);

  if (variantsError) throw new Error(variantsError.message);

  // 2. Obtener las imagenes del producto antes de eliminar
  const { data: productImages, error: productImagesError } = await supabase
    .from("products")
    .select("images")
    .eq("id", productId)
    .single();

  if (productImagesError) throw new Error(productImagesError.message);

  // 3. Eliminar el porducto
  const { error: productDeleteError } = await supabase.from('products').delete().eq('id', productId);

  if (productDeleteError) throw new Error(productDeleteError.message);

  // 4. Eliminar las imagenes del bucket
  if (productImages.images.length > 0) {
    const folderName = productId;
    const paths = productImages.images.map((image => {
      const fileName = image.split('/').pop();
      return `${folderName}/${fileName}`;
    }));

    const { error: storageError } = await supabase.storage.from("product-images").remove(paths);

    if (storageError) throw new Error(storageError.message);
  }

  return true;
};
