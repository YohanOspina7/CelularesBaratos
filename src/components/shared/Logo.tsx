import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src="/img/logo-carol.svg"
        alt="Logo"
        className="h-10 w-auto object-contain"
      />
    </Link>
  );
};