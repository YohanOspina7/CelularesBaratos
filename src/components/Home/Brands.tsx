const brands = [
    {
        image: 'img/brands/Apple-Logo.webp',
        alt: 'Apple'
    },
    {
        image: 'img/brands/Samsung_Logo.webp',
        alt: 'Samsung'
    },
    {
        image: 'img/brands/xiaomi-logo.webp',
        alt: 'Xiaomi'
    },
    {
        image: 'img/brands/realme-logo.webp',
        alt: 'Realme'
    },
    {
        image: 'img/brands/huawei-logo.png',
        alt: 'Huawei'
    },
    {
        image: 'img/brands/honor-logo.png',
        alt: 'Honor'
    }
]

export const Brands = () => {
  return (
    <div className='flex flex-col items-center gap-3 pt-16 pb-12'>
        
        <h2 className='text-2xl font-bold'>Marcas que disponemos</h2>
        <p className='w-2/3 text-sm text-center md:text-base'>Tenemos las prendas mas modernas y lo ultimo en moda disponible</p>

        <div className="grid items-center grid-cols-3 gap-6 mt-8 md:grid-cols-6">
            {brands.map( (brand, index) => (
              <div key={index}>
                <img src={brand.image} alt={brand.alt} /> 
              </div> 
            ))}
        </div>
        
    </div>
  )
}
