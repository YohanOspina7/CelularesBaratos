import { formatPrice } from "../components/helpers";
import { useCartStore } from "../store/Cart.store";

export const ItemsCheckout = () => {
  const cartItems = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);

  return (
    <div>
      <ul className="space-y-5">
        {cartItems.map((item) => (
          <li
            key={item.variantId}
            className="flex items-center justify-between gap-5"
          >
            <div className="relative flex border rounded-md border-stone-300 bg-store-200">
              <img
                src={item.image}
                alt={item.name}
                className="object-contain w-20"
              />

              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-gray-500 rounded-full -right-1 -top-2">
                {item.quantity}
              </span>
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
                  {item.storage} /{
                    item.color
                  }
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-5 p-7">
        <div className="flex justify-between">
          <p className="text-sm font-medium">Envío</p>
          <p className="text-sm font-medium uppercase">Gratis</p>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <p>Total:</p>
          <p>{formatPrice(totalAmount)}</p>
        </div>
      </div>
    </div>
  );
};
