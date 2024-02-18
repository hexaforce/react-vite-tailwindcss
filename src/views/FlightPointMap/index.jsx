import { Fragment, useState, useEffect } from 'react'
import { ChevronDownIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from '@/utils'

import MapBox from '@/components/mapbox-gl'
import PointInfo from '@/views/FlightPointMap/PointInfo'
import PointForm from '@/views/FlightPointMap/PointForm'

export default function FlightPointMap() {
  const [editMode, setEditMode] = useState(false)
  const [selectPoint, setSelectPoint] = useState(null)

  const [open, setOpen] = useState(false)

  const editAction = () => {
    setEditMode(!editMode)
    editMode && setSelectPoint(null)
  }

  const [formData, setFormData] = useState({
    latitude: 0.0000,
    longitude: 0.0000,
    title: '',
    markerImage: null,
  })

  useEffect(() => {
    if (!selectPoint) return
    setFormData({ ...formData, latitude: selectPoint.latitude, longitude: selectPoint.longitude })
  }, [selectPoint])

  return (
    <div className='bg-white px-4 lg:px-0'>
      <div className='lg:flex lg:items-center lg:justify-between'>
        <PointInfo editMode={editMode} />
        <div className='mt-3 flex lg:ml-4 lg:mt-0'>
          <span className='hidden sm:block'>
            {editMode ? (
              <button type='button' className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto' onClick={() => editAction()}>
                <XMarkIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-white' aria-hidden='true' />
                Cancel
              </button>
            ) : (
              <button type='button' className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => editAction()}>
                <PencilSquareIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-white' aria-hidden='true' />
                New Point
              </button>
            )}
          </span>
          {/* <span className='sm:ml-3'>
            <button type='button' className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              <CheckIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
              公開する
            </button>
          </span> */}

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
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className='mx-auto max-w-7xl py-3'>
        <MapBox editMode={editMode} selectPoint={selectPoint} setSelectPoint={setSelectPoint} setOpen={setOpen} />
      </div>
      <PointForm open={open} setOpen={setOpen} formData={formData} setFormData={setFormData} />
    </div>
  )
}
