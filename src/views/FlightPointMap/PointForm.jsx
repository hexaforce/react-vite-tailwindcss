import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon, PhotoIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'

PointForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}

export default function PointForm(props) {
  const { open, setOpen } = props

  const cancelButtonRef = useRef(null)

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
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                        <label htmlFor='latitude' className='block text-sm font-medium leading-6 text-gray-900'>
                          緯度
                        </label>
                        <div className='mt-2'>
                          <input type='text' name='latitude' id='latitude' autoComplete='latitude' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                        </div>
                      </div>

                      <div className='sm:col-span-3'>
                        <label htmlFor='longitude' className='block text-sm font-medium leading-6 text-gray-900'>
                          経度
                        </label>
                        <div className='mt-2'>
                          <input type='text' name='longitude' id='longitude' autoComplete='longitude' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                        </div>
                      </div>

                      <div className='col-span-full'>
                        <label htmlFor='cover-photo' className='block text-sm font-medium leading-6 text-gray-900'>
                          マーカー画像
                          <CameraIcon className='h-12 w-12 text-gray-300' aria-hidden='true' />
                        </label>
                        <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                          <div className='text-center'>
                            <PhotoIcon className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true' />
                            <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                              <label htmlFor='file-upload' className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                                <span>画像ファイルをアップロードする</span>
                                <input id='file-upload' name='file-upload' type='file' className='sr-only' />
                              </label>
                              <p className='pl-1'>かここにドラッグ&ドロップ</p>
                            </div>
                            <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF ファイル (最大10MB)</p>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-full'>
                        <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900'>
                          タイトル
                        </label>
                        <div className='mt-2'>
                          <input type='text' name='title' id='title' autoComplete='title' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                        </div>
                      </div>

                      <div className='sm:col-span-2 sm:col-start-1'>
                        <label htmlFor='city' className='block text-sm font-medium leading-6 text-gray-900'>
                          City
                        </label>
                        <div className='mt-2'>
                          <input type='text' name='city' id='city' autoComplete='address-level2' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button type='button' className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto' onClick={() => setOpen(false)}>
                    Deactivate
                  </button>
                  <button type='button' className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto' onClick={() => setOpen(false)} ref={cancelButtonRef}>
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
