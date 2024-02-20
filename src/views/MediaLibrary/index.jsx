import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { downloadFileFromS3, downloadFilesFromS3 } from '@/queries/FileUpload'
import { ALL_MEDIA_LIBRARY_QUERY } from '@/queries/MediaLibrary'
import { useAuth0 } from '@auth0/auth0-react'

import MediaDialog from '@/views/MediaLibrary/MediaDialog'

export default function MediaLibrary() {
  const { getIdTokenClaims } = useAuth0()
  const [thumbnailImages, setThumbnailImages] = useState([])

  const { loading, error, data } = useQuery(ALL_MEDIA_LIBRARY_QUERY)

  async function getThumbnailImages() {
    const token = (await getIdTokenClaims()).__raw
    setThumbnailImages(
      await downloadFilesFromS3(
        token,
        'fpv-japan-public',
        data?.allMediaLibraries.map((m) => `${m.wasabi_file_key}_thumbnail`),
      ),
    )
  }

  const [currentBlob, setCurrentBlob] = useState(null)
  const [openMediaDialog, setOpenMediaDialog] = useState(false)

  useEffect(() => {
    if (loading || error) return
    getThumbnailImages()
  }, [data])

  async function clickMedia(wasabi_file_key) {
    const token = (await getIdTokenClaims()).__raw
    const target =  await downloadFileFromS3(token, 'fpv-japan-public', wasabi_file_key)
    setCurrentBlob(target.fileBlob)
    setOpenMediaDialog(true)
  }

  if (loading || thumbnailImages.length === 0) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  function thumbnail(wasabi_file_key) {
    const thumbnail = thumbnailImages.find((t) => t.wasabi_file_key === `${wasabi_file_key}_thumbnail`)
    return URL.createObjectURL(thumbnail.fileBlob)
  }

  return (
    <div className='bg-white'>
      <MediaDialog openMediaDialog={openMediaDialog} setOpenMediaDialog={setOpenMediaDialog} currentBlob={currentBlob} />
      <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>公開動画</h2>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {data?.allMediaLibraries.map(({ id, is_public, file_name, file_type, file_size, wasabi_file_key, registered_at }) => (
            <div key={id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                <img src={thumbnail(wasabi_file_key)} alt={file_type} className='h-full w-full object-cover object-center lg:h-full lg:w-full' />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <span aria-hidden='true' className='absolute inset-0' onClick={() => clickMedia(wasabi_file_key)} />
                    {file_name}
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{registered_at}</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>{file_size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>未公開の動画</h2>
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
      </div> */}
    </div>
  )
}
