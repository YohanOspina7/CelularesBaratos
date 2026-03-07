import { CardProduct } from "../components/products/CardProduct";
import { prepareProducts } from "../components/helpers";
import { ContainerFilter } from "../components/products/ContainerFilter";
import { useFilteredProducts } from "../hooks";
import { useState } from "react";

export const CellPhonesPage = () => {
  const [page, setPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const {
    data: products,
    isLoading,
    totalProducts,
  } = useFilteredProducts({
    page,
    brands: selectedBrands,
  });

  if (isLoading || !products) return <p>Cargando...</p>;

  const preparedProducts = prepareProducts(products);

  return (
    <>
      <h1 className="mb-12 text-5xl font-semibold text-center">Productos</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-col-3 xl:grid-cols-5">
        {/* FILTROS */}
        <ContainerFilter
          setSelectedBrands={setSelectedBrands}
          selectedBrands={selectedBrands}
        />

        {isLoading ? (
          <div className="flex items-center justify-center col-span-2 h-[500px]">
            <p className="text-2xl">Cargando...</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center gap-12 lg:col-span-2 xl:col-span-4">
            <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
              {preparedProducts.map((product) => (
                <CardProduct
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  colors={product.colors}
                  img={product.images[0]}
                  slug={product.slug}
                  variants={product.variants}
                />
              ))}
            </div>

            {/* TO DO: PAGINACION */}
          </div>
        )}
      </div>
    </>
  );
};
