import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../hooks";
import { Loader } from "../components/shared/Loader";
import { IoChevronBack } from "react-icons/io5";
import { formatDateLong, formatPrice } from "../components/helpers";

const tableHeaders = ["Producto", "Cantidad", "Total"];

export const OrderUserPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading } = useOrder(Number(id!));

  const navigate = useNavigate();

  if (isLoading || !order) return <Loader />;

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
        <button
          className="flex items-center justify-center gap-2 px-5 py-2 text-xs font-medium tracking-widest uppercase transition-all border rounded-full border-slate-200 hover:bg-stone-100"
          onClick={() => navigate(-1)}
        >
          <IoChevronBack size={16} />
          Volver a los pedidos
        </button>
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-3xl font-bold">Pedido #{id}</h1>
          <p className="text-sm">{formatDateLong(order.created_at)}</p>
        </div>
        <div></div>
        <div></div>
      </div>

      <div className="flex flex-col gap-10 mt-10 mb-5">
        <table className="w-full overflow-auto text-sm caption-bottom">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className="h-12 font-medium tracking-wide text-center uppercase text-stone-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {order.orderItems.map((product, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="flex items-center gap-3 p-4 font-medium tracking-tighter">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="object-contain w-20 h-20 rounded-lg"
                  />
                  <div className="space-y-2">
                    <h3>{product.productName}</h3>
                    <p className="text-xs">
                      {product.color_name} / {product.storage}
                    </p>

                    <p className="text-sm">{formatPrice(product.price)}</p>
                  </div>
                </td>

                <td className="p-4 font-medium tracking-tighter text-center ">
                  <p>{product.quantity}</p>
                </td>
                <td className="p-4 font-medium tracking-tighter text-center ">
                  <p>{formatPrice(product.price * product.quantity)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col self-end w-1/2 gap-3 text-sm text-state-600">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{formatPrice(order.totalAmount)}</p>
          </div>
          <div className="flex justify-between">
            <p>Envío (Standard)</p>
            <p>{formatPrice(0)}</p>
          </div>

          <div className="flex justify-between font-semibold text-black">
            <p>Total</p>
            <p>{formatPrice(order.totalAmount)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Dirección</h2>
          <div className="flex flex-col gap-5 p-5 border border-stone-300">
            <div className="space-y-1">
              <h3 className="font-medium">Cliente:</h3>
              <p>{order.customer.full_name}</p>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <h3 className="text-base font-medium">Envió:</h3>

              <p>{order.address.addressLine1}</p>
              <p>{order.address.addressLine2 && order.address.addressLine2}</p>
              <p>{order.address.city}</p>
              <p>{order.address.state}</p>
              <p>{order.address.postalCode}</p>
              <p>{order.address.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
