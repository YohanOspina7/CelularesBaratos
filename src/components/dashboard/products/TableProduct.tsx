import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router";

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

  const handleDeleteProduct = (id: string) => {
    console.log(id);
  };

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
            <tr>
              <td className="p-4 align-middle sm:table-cell">
                <img
                  src="https://source.unsplash.com/random/240x240/?product"
                  alt="Imagen Product"
                  loading="lazy"
                  decoding="async"
                  className="object-contain w-16 h-16 rounded-md aspect-square"
                />
              </td>
              <td className="p-4 font-medium tracking-tighter">Producto 1</td>
              <td className="p-4 font-medium tracking-tighter">Variante 1</td>
              <td className="p-4 font-medium tracking-tighter">32.00</td>
              <td className="p-4 font-medium tracking-tighter">12</td>
              <td className="p-4 font-medium tracking-tighter">12/12/2023</td>
              <td className="relative">
                <button
                  className="text-slate-900"
                  onClick={() => setOpenMenuIndex(1)}
                >
                  <FaEllipsis />
                </button>
                {openMenuIndex === 1 && (
                  <div
                    className="absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-xl w-30"
                    role="menu"
                  >
                    <Link
                      to={`/dashboard/productos/${"text-prueba"}`}
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
                      onClick={() => handleDeleteProduct("1")}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
