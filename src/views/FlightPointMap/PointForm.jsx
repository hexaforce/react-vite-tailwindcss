import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon, PhotoIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from '@apollo/client'
import { CREATE_FLIGHT_POINT_MUTATION } from '@/queries/FlightPoint'
import { uploadFileToS3 } from '@/queries/FileUpload'

PointForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    title: PropTypes.string,
    markerImage: PropTypes.instanceOf(Blob),
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
}

export default function PointForm(props) {

  const { open, setOpen, formData, setFormData } = props

  const cancelButtonRef = useRef(null)

  const inputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function fileInputChange(event) {
    setFormData({ ...formData, markerImage: event.target.files[0] })
  }

  const { getIdTokenClaims } = useAuth0()
  const [createFlightPoint] = useMutation(CREATE_FLIGHT_POINT_MUTATION)
  const onSubmit = async (event) => {
    event.preventDefault()
    const token = (await getIdTokenClaims()).__raw
    const data = await uploadFileToS3(token, 'fpv-japan-public', formData.markerImage)
    const createFlightPointInput = {
      latitude: formData.latitude,
      longitude: formData.longitude,
      title: formData.title,
      marker_image: data.fileKey,
    }
    try {
      createFlightPoint({ variables: { createFlightPointInput } })
        .then((response) => console.log('response:', response.data))
        .catch((error) => console.log('error:', error))
      setOpen(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <form onSubmit={onSubmit}>
                  <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div className='mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className='sm:col-span-3'>
                          <label htmlFor='latitude' className='block text-sm font-medium leading-6 text-gray-900'>
                            緯度
                          </label>
                          <div className='mt-2'>
                            <input type='text' name='latitude' value={formData.latitude} onChange={inputChange} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                          </div>
                        </div>

                        <div className='sm:col-span-3'>
                          <label htmlFor='longitude' className='block text-sm font-medium leading-6 text-gray-900'>
                            経度
                          </label>
                          <div className='mt-2'>
                            <input type='text' name='longitude' value={formData.longitude} onChange={inputChange} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                          </div>
                        </div>

                        <div className='col-span-full'>
                          <label className='block text-sm font-medium leading-6 text-gray-900'>
                            マーカー画像
                            {formData.markerImage ? (
                              <img
                                // style={{ objectFit:'cover',width: 50, height: 50, display: 'block', border: 'none', borderRadius: '50%', cursor: 'pointer', padding: 0 }}
                                src={URL.createObjectURL(formData.markerImage)}
                                alt={formData.markerImage.name}
                                className='img-preview sticky h-12 w-12 rounded-full bg-fixed object-cover'
                              />
                            ) : (
                              <CameraIcon className='h-12 w-12 text-gray-300' aria-hidden='true' />
                            )}
                          </label>
                          <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                            <div className='text-center'>
                              <PhotoIcon className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true' />
                              <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                                <label htmlFor='markerImage' className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                                  <span>画像ファイルをアップロード</span>
                                  <input type='file' id='markerImage' name='markerImage' onChange={fileInputChange} className='sr-only' />
                                </label>
                                <p className='pl-1'>するかここにドラッグ&ドロップ</p>
                              </div>
                              <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF ファイル (最大10MB)</p>
                            </div>
                          </div>
                        </div>
                        <div className='sm:col-span-6 sm:col-start-1'>
                          <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900'>
                            タイトル
                          </label>
                          <div className='mt-2'>
                            <input type='text' name='title' value={formData.title} onChange={inputChange} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                    <button type='submit' className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto'>
                      作成
                    </button>
                    <button type='button' className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto' onClick={() => setOpen(false)} ref={cancelButtonRef}>
                      キャンセル
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
