import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router";
import { TableProduct } from "../../components/dashboard";

export const DashboardProductsPage = () => {
  return (
    <div className="flex flex-col h-full gap-2">
      <Link
        to="/dashboard/products/new"
        className="flex items-center self-end text-white bg-black py-1.5 px-2 rounded-md text-sm gap-1 font-semibold"
      >
        <IoAddCircleOutline className="inline-block" />
        Nuevo Producto
      </Link>

      <TableProduct />
    </div>
  );
};
