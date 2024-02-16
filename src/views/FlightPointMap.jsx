import { Fragment, useRef, useState } from 'react'
import { BriefcaseIcon, CalendarIcon, CheckIcon, ChevronDownIcon, CurrencyDollarIcon, LinkIcon, MapPinIcon, PencilIcon } from '@heroicons/react/20/solid'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { classNames } from '@/utils'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import MapBox from '@/components/mapbox-gl'

export function FlightPointMap() {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <div className='bg-white px-4 lg:px-0'>
      <div className='lg:flex lg:items-center lg:justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>Acn秋葉原ビル</h2>
          <div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
            <div className='mt-2 flex items-center text-sm text-gray-500'>
              <BriefcaseIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
              Full-time
            </div>
            <div className='mt-2 flex items-center text-sm text-gray-500'>
              <MapPinIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
              Remote
            </div>
            <div className='mt-2 flex items-center text-sm text-gray-500'>
              <CurrencyDollarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
              $120k &ndash; $140k
            </div>
            <div className='mt-2 flex items-center text-sm text-gray-500'>
              <CalendarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
              Closing on January 9, 2020
            </div>
          </div>
        </div>
        <div className='mt-3 flex lg:ml-4 lg:mt-0'>
          <span className='hidden sm:block'>
            <button type='button' className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
              <PencilIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />
              Edit
            </button>
          </span>

          <span className='ml-3 hidden sm:block'>
            <button type='button' className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
              <LinkIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400' aria-hidden='true' />
              View
            </button>
          </span>

          <span className='sm:ml-3'>
            <button type='button' className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => setOpen(true)}>
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
                <Menu.Item>
                  {({ active }) => (
                    <a href='#' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                      View
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className='mx-auto max-w-7xl py-3'>
        <MapBox />
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
                  <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
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
