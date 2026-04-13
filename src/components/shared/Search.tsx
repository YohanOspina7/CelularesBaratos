import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/global.store";
import { formatPrice } from "../helpers";
import { searchProducts } from "../../actions";
import type { Product } from "../../interfaces";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, SetSearchResults] = useState<Product[]>([]);

  const closeSheet = useGlobalStore((state) => state.closeSheet);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      const products = await searchProducts(searchTerm);
      SetSearchResults(products);
    }
  };

  return (
    <>
      <div className="flex items-center gap-10 py-5 border-b border-slate-200">
        <form
          className="flex items-center flex-1 gap-3"
          onSubmit={handleSearch}
        >
          <HiOutlineSearch />
          <input
            type="text"
            placeholder="¿Qué busca?"
            className="w-full text-sm outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <button onClick={closeSheet}>
          <IoMdClose size={25} className="text-black" />
        </button>
      </div>

      {/* RESULTADOS DE BUSQUEDA */}
      <div className="p-5">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((product) => (
              <li className="py-2 group" key={product.id}>
                <button className="flex items-center gap-3">
                  <img src={product.images[0]} alt={product.name} className="w-20 h-20 p-3 object-cotain" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold group-hover:underline">
                      {product.name}
                    </p>

                    <p className="text-[13px] text-gray-500">
                      {product.variants[0].storage} /{' '}
                      {product.variants[0].color_name}
                      </p>

                    <p className="text-sm font-medium text-gray-600">
                      {formatPrice(product.variants[0].price)}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No se encontraron resultados</p>
        )}
      </div>
    </>
  );
};
