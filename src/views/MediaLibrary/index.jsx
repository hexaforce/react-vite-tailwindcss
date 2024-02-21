import { useEffect, useState, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { downloadFileFromS3, downloadFilesFromS3 } from '@/queries/FileUpload'
import { ALL_MEDIA_LIBRARY_QUERY } from '@/queries/MediaLibrary'
import { useAuth0 } from '@auth0/auth0-react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import MediaPreview, { MediaContent } from '@/views/MediaLibrary/MediaPreview'
import FileUpload, { FileUploadForm } from '@/views/MediaLibrary/FileUpload'
import { Loading } from '@/assets/Loading'

export default function MediaLibrary() {
  const { getIdTokenClaims } = useAuth0()

  const { loading, error, data, refetch } = useQuery(ALL_MEDIA_LIBRARY_QUERY)
  const [loading2, setLoading2] = useState(true)
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
      setLoading2(false)
    }
    if (!loading && !error) {
      getThumbnailImages()
    }
  }, [data, loading, error, getIdTokenClaims])
  function thumbnail(mediaLibrary) {
    const thumbnail = thumbnailImages.find((t) => t.wasabi_file_key === mediaLibrary.wasabi_file_key)
    if (!thumbnail || !thumbnail.fileBlob) return <QuestionMarkCircleIcon />
    return <img src={URL.createObjectURL(thumbnail.fileBlob)} alt={mediaLibrary.file_type} className='h-full w-full object-cover object-center lg:h-full lg:w-full' />
  }

  const [openFileUpload, setOpenFileUpload] = useState(false)
  const [openMediaPreview, setOpenMediaPreview] = useState(false)
  const [mediaContent, setMediaContent] = useState(null)
  const [widthImage, setWidthImage] = useState(false)
  async function getImageSize(fileBlob) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = function () {
        resolve({ width: this.width, height: this.height })
      }
      image.onerror = function () {
        reject(new Error('Failed to load image'))
      }
      image.src = URL.createObjectURL(fileBlob)
    })
  }

  const cancelButtonRef = useRef(null)
  // useEffect(() => {
  //   console.log('openMediaPreview:', openMediaPreview)
  // }, [openMediaPreview])

  if (loading || loading2) return <Loading />
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>公開動画</h2>
          <button type='button' onClick={() => setOpenFileUpload(true)} className='rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            追加
          </button>
        </div>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {thumbnailImages.length === 0 && <>Nothing</>}
          {data?.allMediaLibraries.map((mediaLibrary) => (
            <div key={mediaLibrary.id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40'>{thumbnail(mediaLibrary)}</div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <span
                      aria-hidden='true'
                      className='absolute inset-0'
                      onClick={() => {
                        async function getMediaFile(wasabi_file_key) {
                          const token = (await getIdTokenClaims()).__raw
                          const target = await downloadFileFromS3(token, 'fpv-japan-public', wasabi_file_key, false)
                          const imageSize = await getImageSize(target.fileBlob)
                          setWidthImage(imageSize.width > imageSize.height)
                          setMediaContent(target.fileBlob)
                          console.log('fileBlob:', target.fileBlob)
                          setOpenMediaPreview(true)
                        }
                        getMediaFile(mediaLibrary.wasabi_file_key)
                        console.log('onClick:', mediaLibrary)
                      }}
                    />
                    {mediaLibrary.file_name}
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{mediaLibrary.registered_at}</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>{mediaLibrary.file_size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FileUpload openFileUpload={openFileUpload} setOpenFileUpload={setOpenFileUpload}>
        <FileUploadForm setOpenFileUpload={setOpenFileUpload} refetch={refetch} />
      </FileUpload>
      <MediaPreview cancelButtonRef={cancelButtonRef} openMediaPreview={openMediaPreview} setOpenMediaPreview={setOpenMediaPreview} widthImage={widthImage}>
        <MediaContent cancelButtonRef={cancelButtonRef} openMediaPreview={openMediaPreview} setOpenMediaPreview={setOpenMediaPreview} mediaContent={mediaContent} />
      </MediaPreview>
    </div>
  )
}
