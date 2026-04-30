import { zodResolver } from "@hookform/resolvers/zod";
import { InputAddress } from "./InputAddress";
import { type AddressFormValues, addressSchema } from "../lib/validators";
import { useForm } from "react-hook-form";
import { ItemsCheckout } from "./ItemsCheckout";

export const FormCheckout = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold tracking-normal">Entrega</h3>

          <InputAddress
            register={register}
            errors={errors}
            name="addressLine1"
            placeholder="Dirección principal"
          />
          
          <InputAddress
            register={register}
            errors={errors}
            name="addressLine2"
            placeholder="Dirección adicional (Opcional)"
          />
          
          <InputAddress
            register={register}
            errors={errors}
            name="state"
            placeholder="Estado / Provincia"
          />

          <InputAddress
            register={register}
            errors={errors}
            name="city"
            placeholder="Ciudad"
          />

          <InputAddress
            register={register}
            errors={errors}
            name="postalCode"
            placeholder="Código Postal (Opcional)"
          />

          <select className="p-3 border rounded-md border-slate-200" {...register('country')}>
            <option value="Colombia">Colombia</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Métodos de envío</p>

          <div className="flex items-center justify-between px-6 py-4 text-sm border rounded-md border-slate-600 bg-stone-100">
            <span className="font-normal">Standard</span>
            <span className="font-semibold">Gratis</span>
          </div>

          <div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 text-sm border border-slate-600 bg-stone-100 rounded-ss-md rounded-se-md">
                <span>Depósito Bancario</span>
              </div>
            </div>

            <div className="bg-stone-100 text-[13px] p-5 space-y-0.5 border border-gray-200 rounded-es-md rounded-ee-md">
              <p>Compra a traves de tranferencia bancaria</p>
              <p>BANCO BANCOLOMBIA</p>
              <p>Razón Social: CelularesBaratos</p>
              <p>RUC: 123456789</p>
              <p>Tipo de cuenta: Corriente</p>
              <p>Número de cuenta: 123456789</p>
              <p>
                La información será compartida nuevamente una vez que se haya
                finalizado la compra
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-3xl font-semibold">Resumen del pedido</h3>

          {/* LISTA DE ELEMENTEOS */}
          <ItemsCheckout />
        </div>

        <button
          type="submit"
          className="text-white bg-black py-3.5 font-bold tracking-wide rounded-md mt-2"
        >
          Finalizar pedido
        </button>
      </form>
    </div>
  );
};
