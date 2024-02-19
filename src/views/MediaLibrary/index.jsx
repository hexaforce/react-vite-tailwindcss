import { useQuery } from '@apollo/client'
import { LIST_OBJECTS } from '@/queries/FileUpload'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // {
  //   id: 2,
  //   name: 'Basic Tee',
  //   href: '#',
  //   imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
  //   imageAlt: "Front of men's Basic Tee in black.",
  //   price: '$35',
  //   color: 'Black',
  // },
  // {
  //   id: 3,
  //   name: 'Basic Tee',
  //   href: '#',
  //   imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
  //   imageAlt: "Front of men's Basic Tee in black.",
  //   price: '$35',
  //   color: 'Black',
  // },
  // {
  //   id: 4,
  //   name: 'Basic Tee',
  //   href: '#',
  //   imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
  //   imageAlt: "Front of men's Basic Tee in black.",
  //   price: '$35',
  //   color: 'Black',
  // },
  // {
  //   id: 5,
  //   name: 'Basic Tee',
  //   href: '#',
  //   imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
  //   imageAlt: "Front of men's Basic Tee in black.",
  //   price: '$35',
  //   color: 'Black',
  // },
]

export default function MediaLibrary() {

  const { loading, error, data } = useQuery(LIST_OBJECTS, {
    variables: {     Name: 'fpv-japan-public',
    Marker: 0,
    MaxKeys: 1000, },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  console.log(data)

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-8 sm:px-2 sm:py-4 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Customers also purchased</h2>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <div key={product.id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-60 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40'>
                <img src={product.imageSrc} alt={product.imageAlt} className='h-40 w-60 object-cover object-center lg:h-40 lg:w-60' />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a href={product.href}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {product.name}
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{product.color}</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='mx-auto max-w-2xl px-4 py-8 sm:px-2 sm:py-4 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Customers also purchased</h2>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <div key={product.id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-60 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40'>
                <img src={product.imageSrc} alt={product.imageAlt} className='h-40 w-60 object-cover object-center lg:h-40 lg:w-60' />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a href={product.href}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {product.name}
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{product.color}</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}