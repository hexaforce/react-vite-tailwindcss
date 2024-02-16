import './index.css'
import { Cloudinary } from '@cloudinary/url-gen'
import {
  AdvancedImage, // AdvancedVideo, accessibility, responsive, lazyload, placeholder
} from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { useQuery } from '@apollo/client'
import { ASSETS_QUERY } from '@/queries/MediaLibrary'

export default function CloudinaryImage() {
  const { loading, error, data } = useQuery(ASSETS_QUERY)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const c = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      // apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
      // apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
    },
  })

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Customers also purchased</h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {data?.assets.resources.map(({ asset_id, public_id, format, version, resource_type, type, created_at, bytes, width, height, folder, url, secure_url }) => (
            <div key={asset_id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                {/* <img src={product.imageSrc} alt={product.imageAlt} className='h-full w-full object-cover object-center lg:h-full lg:w-full' /> */}
                <AdvancedImage cldImg={c.image(public_id).resize(fill().width(200).height(300))} className='h-full w-full object-cover object-center lg:h-full lg:w-full' />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a href={url}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {`${width} x ${height}`}
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{resource_type}</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>{created_at}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
