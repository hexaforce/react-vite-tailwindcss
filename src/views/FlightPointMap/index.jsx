import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/20/solid'
import MapBox from '@/components/mapbox-gl'
import PointInfo from '@/views/FlightPointMap/PointInfo'
import PointForm, { PointFormInput } from '@/views/FlightPointMap/PointForm'

export default function FlightPointMap() {
  const [editMode, setEditMode] = useState(false)
  const [selectPoint, setSelectPoint] = useState(null)
  const [selectMarker, setSelectMarker] = useState(null)

  const [openPointForm, setOpenPointForm] = useState(false)

  const editAction = () => {
    setEditMode(!editMode)
    editMode && setSelectPoint(null)
  }

  return (
    <div className='bg-white px-4 lg:px-0'>
      <div className='lg:flex lg:items-center lg:justify-between'>
        <PointInfo editMode={editMode} selectMarker={selectMarker} />
        <div className='mt-3 flex lg:ml-4 lg:mt-0'>
          <span className='sm:ml-3'>
            <button type='button' className={`inline-flex items-center rounded-md bg-${editMode ? 'red' : 'indigo'}-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-${editMode ? 'red' : 'indigo'}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${editMode ? 'red' : 'indigo'}-600`} onClick={() => editAction()}>
              {editMode ? (
                <>
                  <XMarkIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-white' aria-hidden='true' />
                  キャンセル
                </>
              ) : (
                <>
                  <PencilSquareIcon className='-ml-0.5 mr-1.5 h-5 w-5 text-white' aria-hidden='true' />
                  新しいマーカーを登録
                </>
              )}
            </button>
          </span>
        </div>
      </div>

      <div className='mx-auto max-w-7xl py-3'>
        <MapBox editMode={editMode} selectPoint={selectPoint} setSelectPoint={setSelectPoint} selectMarker={selectMarker} setSelectMarker={setSelectMarker} setOpenPointForm={setOpenPointForm} />
      </div>

      <PointForm openPointForm={openPointForm} setOpenPointForm={setOpenPointForm}>
        <PointFormInput setOpenPointForm={setOpenPointForm} selectPoint={selectPoint} />
      </PointForm>
    </div>
  )
}
