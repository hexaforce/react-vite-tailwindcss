import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PhotoIcon, CameraIcon } from '@heroicons/react/24/solid'

import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from '@apollo/client'
import { CREATE_FLIGHT_POINT_MUTATION } from '@/queries/FlightPoint'
import { upload } from '@/views/FlightPointMap/PointFormSupport'

const initialFormValue = {
  latitude: 0.0,
  longitude: 0.0,
  title: '',
  markerImage: null,
}

PointFormInput.propTypes = {
  setOpenPointForm: PropTypes.func.isRequired,
  selectPoint: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
}

export function PointFormInput({ setOpenPointForm, selectPoint }) {
  const [formData, setFormData] = useState({ ...initialFormValue })

  useEffect(() => {
    if (!selectPoint) return
    setFormData((prevFormData) => ({ ...prevFormData, ...selectPoint }))
  }, [selectPoint])

  function inputChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function fileInputChange(event) {
    const { name, files } = event.target
    setFormData({ ...formData, [name]: files[0] })
  }

  const { getIdTokenClaims } = useAuth0()
  const [createFlightPoint] = useMutation(CREATE_FLIGHT_POINT_MUTATION)

  async function submit(event) {
    event.preventDefault()

    const token = (await getIdTokenClaims()).__raw
    upload(token, formData, createFlightPoint)
    setOpenPointForm(false)
    setFormData(initialFormValue)
  }

  return (
    <form action='#' method='POST' className='mx-auto max-w-xl' onSubmit={submit}>
      <div className='border-b border-gray-900/10 pb-12'>
        <div className='mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
          <div className='col-span-full'>
            <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900'>
              タイトル
            </label>
            <div className='mt-2'>
              <input type='text' name='title' value={formData.title} onChange={inputChange} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
            </div>
          </div>

          <div className='col-span-full'>
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              マーカー画像
              {formData.markerImage ? <img src={URL.createObjectURL(formData.markerImage)} alt={formData.markerImage.name} className='img-preview sticky h-12 w-12 rounded-full bg-fixed object-cover' /> : <CameraIcon className='h-12 w-12 text-gray-300' aria-hidden='true' />}
            </label>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
              <div className='text-center'>
                <PhotoIcon className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true' />
                <div className='mt-4 flex justify-center items-center text-sm leading-6 text-gray-600'>
                  <label htmlFor='markerImage' className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                    <span className='text-base'>画像ファイルをアップロード</span>
                    <input type='file' id='markerImage' name='markerImage' onChange={fileInputChange} className='sr-only' />
                  </label>
                </div>
                <p className='text-sm pt-4'>するかここにドラッグ&ドロップ</p>
                <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF ファイル (最大10MB)</p>
              </div>
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label htmlFor='latitude' className='block text-sm font-medium leading-6 text-gray-900'>
              緯度
            </label>
            <div className='mt-2'>
              <input type='number' step='0.01' name='latitude' value={formData.latitude} onChange={inputChange} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label htmlFor='longitude' className='block text-sm font-medium leading-6 text-gray-900'>
              経度
            </label>
            <div className='mt-2'>
              <input type='number' step='0.01' name='longitude' value={formData.longitude} onChange={inputChange} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button type='submit' className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          作成する
        </button>
      </div>
    </form>
  )
}

PointForm.propTypes = {
  children: PropTypes.node.isRequired,
  openPointForm: PropTypes.bool.isRequired,
  setOpenPointForm: PropTypes.func.isRequired,
}

export default function PointForm({ children, openPointForm, setOpenPointForm }) {
  return (
    <Transition.Root show={openPointForm} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpenPointForm}>
        <Transition.Child as={Fragment} enter='ease-in-out duration-500' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in-out duration-500' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child as={Fragment} enter='transform transition ease-in-out duration-500 sm:duration-700' enterFrom='translate-x-full' enterTo='translate-x-0' leave='transform transition ease-in-out duration-500 sm:duration-700' leaveFrom='translate-x-0' leaveTo='translate-x-full'>
                <Dialog.Panel className='pointer-events-auto relative w-screen max-w-md'>
                  <Transition.Child as={Fragment} enter='ease-in-out duration-500' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in-out duration-500' leaveFrom='opacity-100' leaveTo='opacity-0'>
                    <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
                      <button type='button' className='relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white' onClick={() => setOpenPointForm(false)}>
                        <span className='absolute -inset-2.5' />
                        <span className='sr-only'>パネルを閉じる</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                    <div className='px-4 sm:px-6'>
                      <Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>マーカーを作成</Dialog.Title>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 sm:px-6'>{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
