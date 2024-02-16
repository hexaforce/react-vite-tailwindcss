import { Fragment, useRef, useState } from 'react'
import { UserIcon, BriefcaseIcon, CalendarIcon, CheckIcon, ChevronDownIcon, CurrencyDollarIcon, LinkIcon, MapPinIcon, PencilIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { classNames } from '@/utils'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import MapBox from '@/components/mapbox-gl'

function PointInfo(props) {
  const { editMode } = props
  return (
    <div className='min-w-0 flex-1'>
      <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>{editMode ? 'ポイントを選択してください。' : 'Acn秋葉原ビル'}</h2>

      <div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
        {!editMode && (
          <div className='mt-2 flex items-center text-sm text-gray-500'>
            <UserIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
            作成者: aaaa.aaaaa
          </div>
        )}
        <div className='mt-2 flex items-center text-sm text-gray-500'>
          <MapPinIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
          Remote
        </div>
        {!editMode && (
          <div className='mt-2 flex items-center text-sm text-gray-500'>
            <CalendarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
            作成日:2023/12/24
          </div>
        )}
      </div>
    </div>
  )
}

export default function FlightPointMap() {
  const [editMode, setEditMode] = useState(false)
  const [selectPoint, setSelectPoint] = useState(null)

  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  const editAction = () => {
    setEditMode(!editMode)
    editMode && setSelectPoint(null)
  }

  return (
    <div className='bg-white px-4 lg:px-0'>
      <div className='lg:flex lg:items-center lg:justify-between'>
        <PointInfo editMode={editMode} />
        <div className='mt-3 flex lg:ml-4 lg:mt-0'>
          <span className='hidden sm:block'>
            <button type='button' className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' onClick={() => editAction()}>
              {!editMode && <PencilSquareIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />}
              {editMode && <XMarkIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />}
              {editMode ? 'Cancel' : 'New Point'}
            </button>
          </span>
          <span className='sm:ml-3'>
            <button type='button' className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              <CheckIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
              Publish
            </button>
          </span>

          {/* Dropdown */}
          <Menu as='div' className='relative ml-3 sm:hidden'>
            <Menu.Button className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400'>
              More
              <ChevronDownIcon className='-mr-1 ml-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />
            </Menu.Button>
            <Transition as={Fragment} enter='transition ease-out duration-200' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
              <Menu.Items className='absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <Menu.Item>
                  {({ active }) => (
                    <a href='#' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                      Edit
                    </a>
                  )}
                </Menu.Item>
                {/* <Menu.Item>
                  {({ active }) => (
                    <a href='#' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                      View
                    </a>
                  )}
                </Menu.Item> */}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className='mx-auto max-w-7xl py-3'>
        <MapBox editMode={editMode} selectPoint={selectPoint} setSelectPoint={setSelectPoint} setOpen={setOpen} />
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                  {/* <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                        <ExclamationTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                      </div>
                      <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                        <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-900'>
                          Deactivate account
                        </Dialog.Title>
                        <div className='mt-2'>
                          <p className='text-sm text-gray-500'>Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
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
                  </div> */}
                  <div className='isolate bg-white px-6 py-12 sm:py-16 lg:px-8'>
                    <form action='#' method='POST' className='mx-auto  max-w-xl '>
                      <div>
                        <div className='border-b border-gray-900/10 pb-12'>
                          <h2 className='text-base font-semibold leading-7 text-gray-900'>Profile</h2>
                          <p className='mt-1 text-sm leading-6 text-gray-600'>This information will be displayed publicly so be careful what you share.</p>
                          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='col-span-full'>
                              <label htmlFor='photo' className='block text-sm font-medium leading-6 text-gray-900'>
                                Photo
                              </label>
                              <div className='mt-2 flex items-center gap-x-3'>
                                <UserCircleIcon className='h-12 w-12 text-gray-300' aria-hidden='true' />
                                <button type='button' className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                                  Change
                                </button>
                              </div>
                            </div>
                            <div className='col-span-full'>
                              <label htmlFor='cover-photo' className='block text-sm font-medium leading-6 text-gray-900'>
                                Cover photo
                              </label>
                              <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                                <div className='text-center'>
                                  <PhotoIcon className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true' />
                                  <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                                    <label htmlFor='file-upload' className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                                      <span>Upload a file</span>
                                      <input id='file-upload' name='file-upload' type='file' className='sr-only' />
                                    </label>
                                    <p className='pl-1'>or drag and drop</p>
                                  </div>
                                  <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF up to 10MB</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='border-b border-gray-900/10 pb-12'>
                          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-3'>
                              <label htmlFor='first-name' className='block text-sm font-medium leading-6 text-gray-900'>
                                First name
                              </label>
                              <div className='mt-2'>
                                <input type='text' name='first-name' id='first-name' autoComplete='given-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                              </div>
                            </div>

                            <div className='sm:col-span-3'>
                              <label htmlFor='last-name' className='block text-sm font-medium leading-6 text-gray-900'>
                                Last name
                              </label>
                              <div className='mt-2'>
                                <input type='text' name='last-name' id='last-name' autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                              </div>
                            </div>

                            <div className='col-span-full'>
                              <label htmlFor='street-address' className='block text-sm font-medium leading-6 text-gray-900'>
                                Street address
                              </label>
                              <div className='mt-2'>
                                <input type='text' name='street-address' id='street-address' autoComplete='street-address' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='mt-6 flex items-center justify-end gap-x-6'>
                        <button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
                          Cancel
                        </button>
                        <button type='submit' className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
