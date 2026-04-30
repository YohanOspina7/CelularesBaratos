import { useGlobalStore } from "../../store/global.store";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";

export const NavBarMobile = () => {
  const activeNavMobile = useGlobalStore((state) => state.activeNavMobile);
  const setActiveNavMobile = useGlobalStore(
    (state) => state.setActiveNavMobile,
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center w-full h-screen py-32 text-black bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        activeNavMobile ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="absolute top-5 right-5"
        onClick={() => setActiveNavMobile(false)}
      >
        <IoMdClose size={30} className="text-black" />
      </button>

      {/* Contenido */}
      <div className="flex flex-col gap-20">
        <Link
          to="/"
          className="text-4xl font-bold tracking-tighter transition-all"
          onClick={() => setActiveNavMobile(false)}
        >
          <p>
            Celulares
            <span className="text-cyan-600">Baratos</span>
          </p>
        </Link>

        <nav className="flex flex-col items-center gap-5">
          {navbarLinks.map((item) => (
            <NavLink
              to={item.href}
              key={item.id}
              className={({ isActive }) => `
                            ${isActive ? "text-cyan-600 underline" : ""} transition-all duration-300 font-semibold text-xl hover:text-cyan-600 hober:underline
                        `}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
