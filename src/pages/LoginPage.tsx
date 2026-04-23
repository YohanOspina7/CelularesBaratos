import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
  return (
    <div className="flex flex-col items-center h-full gap-5 mt-12">
        <h1 className="text-4xl font-bold capitalize">
            Iniciar sesión
        </h1>
        
        <p className="text-sm font-medium">
            ¡Que bueno tenerte de vuelta!
        </p>

        <>
            <form className="flex flex-col items-center w-full gap-4 mt-10 sm:w-100 lg:w-125">
                <input 
                    type="email" 
                    placeholder="Ingresa tu correo electrónico"
                    className="w-full px-5 py-4 text-sm text-black border rounded border-slate-200 placeholder:text-black-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                
                <input 
                    type="password" 
                    placeholder="Ingresa tu contraseña"
                    className="w-full px-5 py-4 text-sm text-black border rounded border-slate-200 placeholder:text-black-full"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button className="w-full py-4 mt-5 text-xs font-semibold tracking-widest text-white uppercase bg-black rounded-full">
                    Iniciar sesion
                </button>
            </form>

            <p className="text-sm text-stone-800">
                ¿No tienes cuenta?
                <Link to='/register' className="ml-2 underline">
                    Registrate
                </Link>
            </p>
        </>
    </div>
  );
};
