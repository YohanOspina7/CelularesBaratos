import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { Banner } from "../components/Home/Banner";
import { Newsletter } from "../components/Home/Newsletter";
import { Sheet } from "../components/shared/Sheet";

export const RootLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col h-screen font-montserrat">
      <Navbar />

      {pathname === "/" && <Banner />}

      <main className="container flex-1 px-4 mx-auto my-8">
        <Outlet />
      </main>

      {pathname === "/" && <Newsletter />}

      {true && <Sheet />}

      <Footer />
    </div>
  );
};
