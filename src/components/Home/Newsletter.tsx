export const Newsletter = () => {
  return (
    <div className='relative py-20 text-white bg-gray-500'>

        {/* IMAGEN DE FONDO */}
        <div 
            className="absolute inset-0 h-full bg-center bg-cover opacity-70" 
            style={{ backgroundImage: 'url(/img/background-newsletter.webp)' }}
        />

        {/* CONTENIDO DE NEWSLETTER */}
        <div className="container relative z-10 p-5 mx-auto md:p-0">

            <div className="w-full p-12 space-y-5 text-black bg-white md:w-[50%] lg:w-[40%]">
                
                <p className="text-xs font-semibold uppercase">
                    Suscríbete a nuestro boletín y recibe promociones exclusivas
                </p>
                
                <p className="text-xs font-medium w-[80%] leading-5">
                    Introduce tu correo para recibir ofertas
                </p>
                
                <form className='flex flex-col gap-5 xl:flex-row'>
                    <input 
                        type="email" 
                        className='w-full px-5 py-3 text-xs font-medium border rounded-full border-slate-200 focus:outline-none' 
                        placeholder='Correo Electronico'
                    />

                    <button className='py-3 text-xs font-semibold tracking-wider text-white uppercase bg-black rounded-full xl:px-5'>
                        Suscribirme
                    </button>
                </form>
            </div>

        </div>
        

    </div>
  )
}
