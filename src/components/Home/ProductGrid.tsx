import type { preparedProducts } from "../../interfaces";
import { CardProduct } from "../products/CardProduct";

interface Props {
    title: string;
    products: preparedProducts[];
    
}

export const ProductGrid = ({ title, products }: Props) => {
  return (
    <div className='my-32'>
        <h2 className="mb-8 text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
            {title}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 gap-y-8">
            {products.map((product) => (

              <CardProduct 
                key={product.id} 
                name = {product.name} 
                price = {product.price} 
                colors = {product.colors} 
                img = {product.images[0]}
                slug = {product.slug}
                variants={product.variants}
              />
            
            ))}
        </div>

    </div>
  )
}
