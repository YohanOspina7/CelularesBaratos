import { NavLink } from "react-router-dom";

export const ClientLayout = () => {

    const 

  return (
    <div className="flex flex-col gap-5">
      {/* Menú */}
      <nav className="flex justify-center gap-10 text-sm font-medium">
        <NavLink
          to="/accoutn/pedidos"
          className={({ isActive }) =>
            `${isActive ? "underline" : "hover:underline"}`
          }
        >
          Pedidos
        </NavLink>

        {/* TODO: LINK DASHBOARD */}
        <button className='hover:underline'>
            Cerrar sesión
        </button>

      </nav>
    </div>
  );
};
