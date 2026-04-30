import { Link } from "react-router-dom";
import { useCartStore } from "../store/Cart.store";
import { FormCheckout } from "../checkout/FormCheckout";
import { ItemsCheckout } from "../checkout/ItemsCheckout";

export const CheckoutPage = () => {

  const totalItems = useCartStore(state => state.totalItemsInCart);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 100px)",
      }}
    >
      <header className="flex flex-col items-center justify-center h-24 px-10 text-black bg-white border-b border-slate-200">
        <Link
          to="/"
          className="self-center text-4xl font-bold tracking-tighter transition-all md:self-start"
        >
          <p>
            Celulares
            <span className="text-cyan-600">Baratos</span>
          </p>
        </Link>
      </header>

      <main className="relative flex w-full h-full">
        {totalItems === 0 ? (
          <div
            className="flex flex-col items-center justify-center w-full gap-5"
            style={{
              height: "calc(100vh - 100px)",
            }}
          >
            <p className="text-sm font-medium tracking-tight">
              Su carro esta vacio
            </p>
            <Link
              to="/celulares"
              className="py-4 text-xs font-semibold tracking-widest text-white uppercase bg-black rounded-full px-7"
            >
              Empezar a comprar
            </Link>
          </div>
        ) : (
          <>
            <div className="w-full md:w-[50%] p-10">              
              <FormCheckout />
            </div>

            <div
              className="bg-stone-100 w-[50%] sticky top-0 right-0 p-10 hidden md:block"
              style={{
                minHeight: "calc(100vh - 100px)",
              }}
            >
              
              {/* ELEMENTOS DEL CARRITO */}

              <ItemsCheckout />
            </div>
          </>
        )}
      </main>
    </div>
  );
};
