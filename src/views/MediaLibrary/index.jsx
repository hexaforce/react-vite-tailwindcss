import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { downloadFilesFromS3 } from '@/queries/FileUpload'
import { ALL_MEDIA_LIBRARY_QUERY } from '@/queries/MediaLibrary'
import { useAuth0 } from '@auth0/auth0-react'
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
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
]

export default function MediaLibrary() {
  const { getIdTokenClaims } = useAuth0()
  const [objectURLs, setObjectURLs] = useState([])
  // const { loading, error, data } = useQuery(LIST_OBJECTS, {
  //   variables: {
  //     Name: 'fpv-japan-public',
  //     Marker: 0,
  //     MaxKeys: 1000,
  //   },
  // })
  const { loading, error, data } = useQuery(ALL_MEDIA_LIBRARY_QUERY)

  async function getImages() {
    const token = (await getIdTokenClaims()).__raw
    setObjectURLs(
      await downloadFilesFromS3(
        token,
        'fpv-japan-public',
        data?.allMediaLibraries.map((m) => m.wasabi_file_key),
      ),
    )
  }
  useEffect(() => {
    if (loading || error) return
    getImages()
  }, [data])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Customers also purchased</h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {objectURLs.length > 0 &&
            data?.allMediaLibraries.map(({ id, is_public, file_name, file_type, file_size, wasabi_file_key, registered_at }) => (
              <div key={id} className='group relative'>
                <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                  <img src={objectURLs.find((objectURL) => objectURL.wasabi_file_key === wasabi_file_key).objectURL} alt={file_type} className='h-full w-full object-cover object-center lg:h-full lg:w-full' />
                </div>
                <div className='mt-4 flex justify-between'>
                  <div>
                    <h3 className='text-sm text-gray-700'>
                      <a href='#'>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {file_name}
                      </a>
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>{registered_at}</p>
                  </div>
                  <p className='text-sm font-medium text-gray-900'>{file_size}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Customers also purchased</h2>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <div key={product.id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                <img src={product.imageSrc} alt={product.imageAlt} className='h-full w-full object-cover object-center lg:h-full lg:w-full' />
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
