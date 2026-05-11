import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrder, useUser } from "../hooks";
import { Loader } from "../components/shared/Loader";
import { CiCircleCheck } from "react-icons/ci";
import { formatPrice } from "../components/helpers";
import { useEffect } from "react";
import { supabase } from "../supabase/client";

export const ThankyouPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useOrder(Number(id));

  const {isLoading: isLoadingSession} = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login");
      }
    });
  }, [navigate]);

  if (isError) return <div>Error al cargar la orden</div>;

  if (isLoading || !data || isLoadingSession) return <Loader />;

  return (
    <div className="flex flex-col h-screen">
      <header className="flex flex-col items-center justify-center px-10 py-12 text-black">
        <Link
          to="/"
          className="self-center text-4xl font-bold tracking-tighter transition-all md:text-5xl"
        >
          <p>
            Celulares
            <span className="text-cyan-600">Baratos</span>
          </p>
        </Link>
      </header>

      <main className="container flex flex-col items-center flex-1 gap-10">
        <div className="flex items-center gap-3">
          <CiCircleCheck size={40} />
          <p className="text-4xl">
            ¡Gracias por tu compra {data.customer.full_name}!
          </p>
        </div>

        <div className="w-full p-5 space-y-3 border rounded-md border-slate-200 md:w-150">
          <h3 className="font-medium">Tu pedido está confirmado</h3>
          <p className="text-sm">
            Gracias por relizar tu compra en Celulares Baratos. Para realizar la
            transferencia te compartimos los siguientes datos
          </p>

          <div className="space-y-0.5 text-sm ">
            <p>BANCO BANCOLOMBIA</p>
            <p>Razón Social: CelularesBaratos</p>
            <p>RUC: 123456789</p>
            <p>Tipo de cuenta: Corriente</p>
            <p>Número de cuenta: 123456789</p>
          </div>

          <p className="text-sm">
            Una vez ralizada la transferencia, por favor envíanos el comprobante
            a ventas@celularesbaratos.com para procesarla y hacerte la entrega
            de tu dispositivos
          </p>
        </div>

        <div className="w-full p-5 space-y-3 border rounded-md border-slate-200 md:w-150">
          <h3 className="font-medium">Detalles del pedido</h3>
          <div className="flex flex-col gap-5">
            <ul className="space-y-3">
              {data.orderItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="object-contain w-16 h-16"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-semibold">{item.productName}</p>
                      <p className="mt-1 text-sm font-medium text-gray-600">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <p className="text-[13px] text-gray-600">
                        Cantidad: {item.storage} / {item.color_name}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex-justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                {formatPrice(data.totalAmount)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col text-sm">
                <p className="font-semibold">Informacion de contacto:</p>
                <p>{data.customer.email}</p>
              </div>

              <div className="flex flex-col text-sm">
                <p className="font-semibold">Métodos de pagos:</p>
                <p>Deposito bancario - {formatPrice(data.totalAmount)}</p>
              </div>

              <div className="flex flex-col text-sm">
                <p className="font-semibold">Dirección de envío</p>
                <p>{data.address.addressLine1}</p>
                <p>{data.address.addressLine2 && data.address.addressLine2}</p>
                <p>{data.address.city}</p>
                <p>{data.address.state}</p>
                <p>{data.address.postalCode}</p>
                <p>{data.address.country}</p>
              </div>

              <div className="flex flex-col text-sm">
                <p className="font-semibold">Método de envío</p>
                <p>Standard</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full gap-3 mb-5 sm:flex-row md:w-150 md:gap-0">
          <p className="text-sm">
            ¿Necesito ayuda? Ponte en contacto con nosotros
          </p>

          <Link
            to="/celulares"
            className="px-5 py-4 text-sm font-semibold tracking-tight text-white bg-black rounded-md"
          >
            Seguir comprando
          </Link>
        </div>
      </main>
    </div>
  );
};
