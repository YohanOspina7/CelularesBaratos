import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router";
import { useDeleteProduct, useProducts } from "../../../hooks";
import { Loader } from "../../shared/Loader";
import { type VariantProduct } from "../../../interfaces";
import { formatDate, formatPrice } from "../../helpers";
import { Pagination } from "../../shared/Pagination";
import { CellTableProduct } from "./CellTableProduct";

const tableHeaders = [
  "",
  "Nombre",
  "Variante",
  "Precio",
  "Stock",
  "Fecha de creación",
  "",
];

export const TableProduct = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: number;
  }>({});

  const [page, setPage] = useState(1);

  const {
    products: productsData,
    isLoading,
    totalProducts,
  } = useProducts({
    page,
  });

  const { mutate, isPending } = useDeleteProduct();

  const handleMenuToggle = (index: number) => {
    if (openMenuIndex == index) {
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

  const handleVariantChange = (productId: string, variantIndex: number) => {
    setSelectedVariants({
      ...selectedVariants,
      [productId]: variantIndex,
    });
  };

  const handleDeleteProduct = (id: string) => {
    mutate(id);
    setOpenMenuIndex(null);
  };

  if (!productsData || isLoading || !totalProducts || isPending) return <Loader />;

  const products = productsData.products;

  return (
    <div className="flex flex-col flex-1 p-5 bg-white border border-gray-200 rounded-lg">
      <h1 className="text-xl font-bold">Productos</h1>

      <p className="mt-1 mb-8 text-sm text-gray-500 font-regular">
        Gestiona tus productos y mira las estadisticas de tus ventas
      </p>

      {/* TABLA */}
      <div className="relative w-full h-full">
        <table className="w-full overflow-auto text-sm caption-bottom">
          <thead className="pb-3 border-b border-gray-200">
            <tr className="text-sm font-bold">
              {tableHeaders.map((header, index) => (
                <th key={index} className="h-12 px-4 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const selectedVariantIndex = selectedVariants[product.id] ?? 0;
              const selectedVariant = product.variants[selectedVariantIndex] || {};

              return (
                <tr key={index}>
                  <td className="p-4 align-middle sm:table-cell">
                    <img
                      src={
                        product.images[0] ||
                        "https://ui.shadcn.com/placeholder.svg"
                      }
                      alt="Imagen Product"
                      loading="lazy"
                      decoding="async"
                      className="object-contain w-16 h-16 rounded-md aspect-square"
                    />
                  </td>
                  <CellTableProduct content={product.name} />
                  <td className="p-4 font-medium tracking-tighter">
                    <select
                      className="w-full p-1 border border-gray-300 rounded-md"
                      onChange={(e) =>
                        handleVariantChange(product.id, Number(e.target.value))
                      }
                      value={selectedVariantIndex}
                    >
                      {product.variants.map(
                        (variant: VariantProduct, variantIndex: number) => (
                          <option key={variant.id} value={variantIndex}>
                            {variant.color_name} - {variant.storage}
                          </option>
                        ),
                      )}
                    </select>
                  </td>
                  <CellTableProduct
                    content={formatPrice(selectedVariant?.price)}
                  />
                  <CellTableProduct
                    content={(selectedVariant.stock || 0).toString()}
                  />
                  <CellTableProduct content={formatDate(product.created_at)} />
                  <td className="relative">
                    <button
                      className="cursor-pointer text-slate-900"
                      onClick={() => handleMenuToggle(index)}
                    >
                      <FaEllipsis />
                    </button>
                    {openMenuIndex === index && (
                      <div
                        className="absolute right-0 z-10 w-32 mt-2 bg-white border border-gray-200 rounded-md shadow-xl"
                        role="menu"
                      >
                        <Link
                          to={`/dashboard/productos/${product.slug}`}
                          className="flex items-center w-full gap-1 px-4 py-2 text-xs font-medium text-left text-gray-700 hover:bg-gray-100"
                        >
                          Editar
                          <HiOutlineExternalLink
                            size={13}
                            className="inline-block"
                          />
                        </Link>
                        <button
                          className="block w-full px-4 py-2 text-xs font-medium text-left text-gray-700 hover:bg-gray-100"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CONTROLES DE PAGINACION */}
      <Pagination page={page} setPage={setPage} totalItems={totalProducts} />
    </div>
  );
};
