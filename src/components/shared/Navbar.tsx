import { NavLink, Link } from "react-router-dom";
import { navbarLinks } from "../../constants/links";
import { HiOutlineSearch, HiOutlineShoppingBag } from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";
import { useGlobalStore } from "../../store/global.store";

export const Navbar = () => {
  const openSheet = useGlobalStore((state) => state.openSheet);

  const setActiveNavMobile = useGlobalStore(
    (state) => state.setActiveNavMobile,
  );

  return (
    <header className="flex items-center justify-between px-5 py-4 text-black bg-white border-b border-slate-200 lg:px-12">
      <Logo />

      <nav className="hidden space-x-5 md:flex">
        {navbarLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `${
                isActive ? "text-cyan-600 underline" : ""
              } transition-all duration-300 font-medium hover:text-cyan-600 hover:underline`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </nav>

      {/* SEARCH NAV */}
      <div className="flex items-center gap-5">
        <button className="cursor-pointer" onClick={() => openSheet("search")}>
          <HiOutlineSearch size={25} />
        </button>

        <div className="relative">
          {/* USER NAV */}
          <Link
            to="/account"
            className="grid text-lg font-bold border-2 rounded-full border-slate-700 w-9 h-9 place-items-center"
          >
            R
          </Link>
        </div>

        {/* CART NAV */}
        <button
          className="relative cursor-pointer"
          onClick={() => openSheet("cart")}
        >
          <span className="absolute grid w-5 h-5 text-xs text-white bg-black rounded-full -bottom-2 -right-2 place-items-center">
            0
          </span>
          <HiOutlineShoppingBag size={25} />
        </button>
      </div>

      <button className="md:hidden" onClick={() => setActiveNavMobile(true)}>
        <FaBarsStaggered size={25} />
      </button>
    </header>
  );
};
