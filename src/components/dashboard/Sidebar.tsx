import { NavLink } from "react-router-dom";
import { dashboardLinks } from "../../constants/links";
import { Logo } from "../shared/Logo";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "../../actions";

export const Sidebar = () => {

    const handleLogout = async () => {
        await signOut();
    }
    
  return (
    <div className="fixed flex flex-col items-center h-screen gap-10 p-5 text-white w-30 bg-stone-800 lg:w-62.5">
      <Logo isDashboard/>

      <nav className="flex-1 w-full space-y-5">
        {dashboardLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `flex items-center gap-3 pl-0 py-3 transition-all duration-300 rounded-md ${isActive ? "text-white bg-cyan-600" : "hover:text-white bg-cyan-600"} lg:pl-5 lg:justify-items-start`
            }
          >
            {link.icon}
            <p className="hidden font-semibold lg:block">{link.title}</p>
          </NavLink>
        ))}
      </nav>

      <button className="w-full bg-red-500 py-2.5 rounded-md flex items-center justify-center gap-2 font-semibold text-sm hover:underline"
      onClick={handleLogout}
      >
        <span className="hidden lg:block">Cerrar sesión</span>
        <IoLogOutOutline size={20} className="inline-block" />
      </button>
    </div>
  );
};
