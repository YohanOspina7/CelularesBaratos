import { NavLink, Link } from "react-router-dom";
import { navbarLinks } from "../../constants/links";
import {
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";
import { useGlobalStore } from "../../store/global.store";
import { useCartStore } from "../../store/Cart.store";
import { useUser } from "../../hooks";
import { LuLoader } from "react-icons/lu";

export const Navbar = () => {
  const openSheet = useGlobalStore((state) => state.openSheet);

  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart);

  const setActiveNavMobile = useGlobalStore(
    (state) => state.setActiveNavMobile,
  );

	const { session, isLoading } = useUser();

  const userId = session?.user.id;

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

        {isLoading ? (
          <LuLoader className="animate-spin" size={60} />
        ) : session ? (
          <div className="relative">
            {/* USER NAV */}
            <Link
              to="/account"
              className="grid text-lg font-bold border-2 rounded-full border-slate-700 w-9 h-9 place-items-center"
            >
              R
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <HiOutlineUser size={25} />
          </Link>
        )}

        {/* CART NAV */}
        <button
          className="relative cursor-pointer"
          onClick={() => openSheet("cart")}
        >
          <span className="absolute grid w-5 h-5 text-xs text-white bg-black rounded-full -bottom-2 -right-2 place-items-center">
            {totalItemsInCart}
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
