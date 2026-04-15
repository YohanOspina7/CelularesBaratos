import { LuMinus, LuPlus } from "react-icons/lu";
import { formatPrice } from "../helpers";

export interface ICartItem {
  variantId: string;
  productId: string;
  name: string;
  color: string;
  storage: string;
  price: number;
  quantity: number;
  image: string;
}

interface Props {
  item: ICartItem;
}

export const CartItem = ({ item }: Props) => {
    
    // TODO: Añadir funciones de incremento y decremento
    
    const increment = () => {
        console.log('increment');
    };

    const decrement = () => {
        console.log('decrement');
    }
        
    
  return (
    <li className="flex items-center justify-between gap-5">
      <div className="flex">
        <img src={item.image} alt="item.name" className="object-contain w-20" />
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex justify-between">
          <p className="font-semibold">{item.name}</p>
          <p className="mt-1 text-sm font-medium text-gray-600">
            {formatPrice(item.price)}
          </p>
        </div>

        <div className="flex gap-3">
          <p className="text-[13px] text-gray-600">
            {item.storage} / {item.color}
          </p>
        </div>

        <div className="flex gap-4"></div>
        <div className="flex items-center gap-5 px-2 py-1 border border-slate-200 w-fit-rounded-full">
          <button onClick={decrement} disabled={item.quantity === 1}>
            <LuMinus size={15} />
          </button>
          <span className="text-sm text-slate-500">{item.quantity}</span>
          <button onClick={increment}>
            <LuPlus size={15} />
          </button>
        </div>
      </div>
    </li>
  );
};
