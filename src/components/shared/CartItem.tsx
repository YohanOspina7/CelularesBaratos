import { LuMinus, LuPlus } from "react-icons/lu";
import { formatPrice } from "../helpers";
import { useCartStore } from "../../store/Cart.store";

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
    
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);

    const increment = () => {
        updateQuantity(item.variantId, item.quantity + 1);
    };

    const decrement = () => {
      if (item.quantity > 1) {
        updateQuantity(item.variantId, item.quantity - 1);
      }
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

        <div className="flex gap-4">
          {/* 1. Selector de Cantidad */}
          <div className="flex items-center gap-5 px-2 py-1 border rounded-full border-slate-200 w-fit">
            <button onClick={decrement} disabled={item.quantity === 1}>
              <LuMinus size={15} />
            </button>
            <span className="text-sm font-medium text-slate-500">
              {item.quantity}
            </span>
            <button onClick={increment}>
              <LuPlus size={15} />
            </button>
          </div>

          <button
            className="font-medium underline text-[10px]"
            onClick={() => removeItem(item.variantId)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
};
