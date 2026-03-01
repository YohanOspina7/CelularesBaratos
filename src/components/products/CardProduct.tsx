import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { VariantProduct } from "../../interfaces";
import { formatPrice } from "../helpers";

interface Props {
    img: string;
    name: string;
    price: number;
    slug: string;
    colors: {name: string; color: string}[];
    variants: VariantProduct[];
}

export const CardProduct = ({
    img,
    name,
    price,
    slug,
    colors,
    variants,
}: Props) => {
    const [activeColor, setactiveColor] = useState<{
        name: string; 
        color: string;
    }>(colors[0]);

    // Identificar la variante seleccionada segun el color activo
    const selectedVariant = variants.find(
        variant => variant.color === activeColor.color
    );

    const stock = selectedVariant.stock || 0;
    
    return (
        <div className='relative flex flex-col gap-6 '>
            <Link to={`/productos/${slug}`} className='relative flex overflow-hidden group'>
                <div className='flex h-[350px] w-full items-center justify-center py-2 lg:h-[250px]'>
                    <img 
                        src={img} 
                        alt={name} 
                        className='object-contain w-full h-full' 
                    />
                </div>

                <button className='absolute bottom-0 flex items-center justify-center w-full gap-1 py-3 text-sm font-medium bg-white border 
                    border-slate-200 rounded-3xl hover:bg-stone-100 translate-y-[100%] transition-all duration-300 group-hover:translate-y-0'>
                    <FiPlus />
                    Añadir
                </button>
            </Link>
            
            <div className="flex flex-col items-center gap-1">
                <p className='text-[15px] font-medium '>{name}</p>
                <p className='text-[15px] font-medium '>{formatPrice(price)}</p>

                <div className="flex gap-3">
                    {
                        colors.map(color => (
                            <span key='color.color' className={`grid place-items-center w-5 h-5 rounded-full cursor-pointer`}>
                                <span className='w-[14px] h-[14px] rounded-full' 
                                style={{
                                    backgroundColor: color.color,
                                }}
                                />
                            </span>
                        ))
                    }
                </div>
            </div>
            
            <div className="absolute top-2 left-2">
                {
                    stock === 0 && <span>Agotado</span>
                }
            </div>
        </div>
  )
}
