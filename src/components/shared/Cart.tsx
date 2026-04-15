import { HiOutlineShoppingBag } from "react-icons/hi";
import { useGlobalStore } from "../../store/global.store";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const closeSheet = useGlobalStore((state) => state.closeSheet);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 border-b py-7 border-slate-200">
        <span className="flex items-center font-semibold">
          <HiOutlineShoppingBag size={20} />4 articulos
        </span>
        <button onClick={closeSheet}>
          <IoMdClose size={25} className="text-black" />
        </button>
      </div>

      {/* Lista de productos añadidos al carrito */}
      <>
        <div className="flex-1 overflow-auto p-7">
          <ul>
            <CartItem 
              item={{}}
            />
          </ul>
        </div>

        {/* BOTONES ACCION */}
        <div className="mt-4 p-7">
          <Link
            to='/checkout'
            className='w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center gap-3'
          >
            <RiSecurePaymentLine size={24} />
            Continuar con la compra
          </Link>

          <button
            className='w-full py-3 mt-3 text-black border border-black rounded-full'
          >
            Limpiar Carrito
          </button>
        </div>
      </>
    </div>
  );
};
