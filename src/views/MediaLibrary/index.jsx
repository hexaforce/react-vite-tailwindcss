import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { downloadFileFromS3, downloadFilesFromS3 } from '@/queries/FileUpload'
import { ALL_MEDIA_LIBRARY_QUERY } from '@/queries/MediaLibrary'
import { useAuth0 } from '@auth0/auth0-react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import MediaPreview from '@/views/MediaLibrary/MediaPreview'
import FileUpload, { FileUploadForm } from '@/views/MediaLibrary/FileUpload'

export default function MediaLibrary() {
  const { getIdTokenClaims } = useAuth0()

  const { loading, error, data } = useQuery(ALL_MEDIA_LIBRARY_QUERY)
  const [thumbnailImages, setThumbnailImages] = useState([])
  useEffect(() => {
    async function getThumbnailImages() {
      const token = (await getIdTokenClaims()).__raw
      const images = await downloadFilesFromS3(
        token,
        'fpv-japan-public',
        data?.allMediaLibraries.map((m) => m.wasabi_file_key),
        true,
      )
      setThumbnailImages(images)
    }
    if (!loading && !error) {
      getThumbnailImages()
    }
  }, [data, loading, error, getIdTokenClaims])
  function thumbnail(wasabi_file_key, file_type) {
    const thumbnail = thumbnailImages.find((t) => t.wasabi_file_key === wasabi_file_key)
    if (!thumbnail || !thumbnail.fileBlob) return <QuestionMarkCircleIcon />
    return <img src={URL.createObjectURL(thumbnail.fileBlob)} alt={file_type} className='h-full w-full object-cover object-center lg:h-full lg:w-full' />
  }

  const [openFileUpload, setOpenFileUpload] = useState(false)

  const [currentBlob, setCurrentBlob] = useState(null)
  const [openMediaPreview, setOpenMediaPreview] = useState(false)

  async function clickMedia(wasabi_file_key) {
    const token = (await getIdTokenClaims()).__raw
    const target = await downloadFileFromS3(token, 'fpv-japan-public', wasabi_file_key, false)
    setCurrentBlob(target.fileBlob)
    if (target.fileBlob) {
      setOpenMediaPreview(true)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='bg-white'>
      <FileUpload openFileUpload={openFileUpload} setOpenFileUpload={setOpenFileUpload}>
        <FileUploadForm setOpenFileUpload={setOpenFileUpload} />
      </FileUpload>
      <MediaPreview openMediaPreview={openMediaPreview} setOpenMediaPreview={setOpenMediaPreview} currentBlob={currentBlob} />
      <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>公開動画</h2>
          <button type='button' onClick={() => setOpenFileUpload(true)} className='rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            追加
          </button>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {thumbnailImages.length === 0 && <>Nothing</>}
          {data?.allMediaLibraries.map(({ id, is_public, file_name, file_type, file_size, wasabi_file_key, registered_at }) => (
            <div key={id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>{thumbnail(wasabi_file_key, file_type)}</div>
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
