import { Link } from "react-router-dom";
import { useOrders } from "../hooks";
import { Loader } from "../components/shared/Loader";
import { TableOrders } from "../components/orders/TableOrders";

export const OrdersUserPage = () => {
  const { data: orders, isLoading } = useOrders();

  if (isLoading || !orders) return <Loader />;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2">
        <h1 className="text-3xl font-bold">Pedidos</h1>
        <span className="w-5 h-5 text-white bg-black rounded-full text-[11px] flex justify-center items-center mt-1">
          {orders.length}
        </span>
      </div>

      {orders.length === 0 ? (
        <>
          <p className="text-slate-300">Todavia no has hecho ningun pedido</p>
          <Link
            to="/celulares"
            className="px-8 py-4 text-xs font-semibold tracking-widest text-white uppercase bg-black rounded-full"
          >
            Empezar a comprar
          </Link>
        </>
      ) : (
        <TableOrders orders={orders} />
      )}
    </div>
  );
};
