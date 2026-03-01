import { BiWorld } from "react-icons/bi";
import { FaHammer } from "react-icons/fa6";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { MdLocalShipping } from "react-icons/md";

export const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-8 mb-16 mt-7 lg:grid-cols-4 lg:gap-5">
      <div className="flex items-center gap-6">
        <span className="text-slate-600">
          <MdLocalShipping size={40} />
        </span>

        <div className="space-y-1">
          <p className="font-semibold">Envio gratis</p>
          <p className="text-sm">Todos nuestros productos</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-slate-600">
          <HiMiniReceiptRefund size={40} />
        </span>

        <div className="space-y-1">
          <p className="font-semibold">Devoluciones</p>
          <p className="text-sm">Devuelve el producto si no te satisface la compra dentro de 72 horas</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-slate-600">
          <FaHammer size={40} />
        </span>

        <div className="space-y-1">
          <p className="font-semibold">Soporte</p>
          <p className="text-sm">Soporte tecnico 24/7</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-slate-600">
          <BiWorld size={40} />
        </span>

        <div className="space-y-1">
          <p className="font-semibold">Garantía</p>
          <p className="text-sm">Garantía de un año en todos los productos</p>
        </div>
      </div>
    </div>
  );
};
