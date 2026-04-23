import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  fullName: z.string().min(1, "El nombre completo es requerido"),
  phone: z.string().optional(),
});

export type UserRegisterFromValues = z.infer<typeof userRegisterSchema>;

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFromValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
    resolver: zodResolver(userRegisterSchema),
  });

  const onLogin = handleSubmit((data) => {
    console.log(data)
  });

  console.log(errors)

  return (
    <div className="flex flex-col items-center h-full gap-5 mt-12">
      <h1 className="text-4xl font-bold capitalize">Registrate</h1>

      <p className="text-sm font-medium">
        Por favor, rellene los siguientes campos:
      </p>

      <>
        <form className="flex flex-col items-center w-full gap-4 mt-10 sm:w-100 lg:w-125" 
        onSubmit={onLogin}
        >
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full px-5 py-4 text-sm text-black border rounded border-slate-200 placeholder:text-black-full"
            {...register('fullName')}
          />
          {
            errors.fullName && (<p className="text-red-500">{errors.fullName.message}</p>)
          }

          <input
            type="text"
            placeholder="Celular"
            className="w-full px-5 py-4 text-sm text-black border rounded border-slate-200 placeholder:text-black-full"
            {...register('phone')}
          />
          {
            errors.phone && (<p className="text-red-500">{errors.phone.message}</p>)
          }

          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            className="w-full px-5 py-4 text-sm text-black border rounded border-slate-200 placeholder:text-black-full"
            {...register('email')}
          />
          {
            errors.email && (<p className="text-red-500">{errors.email.message}</p>)
          }

          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            className="w-full px-5 py-4 text-sm text-black border rounded border-slate-200 placeholder:text-black-full"
            {...register('password')}
          />
          {
            errors.password && (<p className="text-red-500">{errors.password.message}</p>)
          }

          <button className="w-full py-4 mt-5 text-xs font-semibold tracking-widest text-white uppercase bg-black rounded-full">
            Registrarme
          </button>
        </form>

        <p className="text-sm text-stone-800">
          ¿Ya tienes una cuenta?
          <Link to="/register" className="ml-2 underline">
            Inicia sesion
          </Link>
        </p>
      </>
    </div>
  );
};
