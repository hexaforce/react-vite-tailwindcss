import { UserIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/20/solid'

import PropTypes from 'prop-types'

PointInfo.propTypes = {
  editMode: PropTypes.bool.isRequired,
  selectMarker: PropTypes.shape({
    id: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    create_user: PropTypes.string.isRequired,
    marker_image: PropTypes.string.isRequired,
    registered_at: PropTypes.string.isRequired,
  }),
}

const options = { 
  year: 'numeric',
  month: 'long', 
  day: 'numeric',
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit',
  hour12: true
}

export default function PointInfo(props) {
  const { editMode, selectMarker } = props
  return (
    <div className='min-w-0 flex-1'>
      <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>{editMode ? 'ポイントを選択してください。' : selectMarker ? selectMarker.title : '---'}</h2>

      <div className='mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6'>
        {!editMode && (
          <div className='mt-2 flex items-center text-sm text-gray-500'>
            <UserIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
            作成者:{selectMarker ? selectMarker.create_user : '---' }
          </div>
        )}
        <div className='mt-2 flex items-center text-sm text-gray-500'>
          <MapPinIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
          緯度:{selectMarker ? selectMarker.latitude : '---' }
          <br />
          軽度:{selectMarker ? selectMarker.longitude : '---' }
        </div>
        {!editMode && (
          <div className='mt-2 flex items-center text-sm text-gray-500'>
            <CalendarIcon className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
            作成日時:{selectMarker ? new Date(selectMarker.registered_at).toLocaleString('ja-JP', options) : '---' }
          </div>
        )}
      </div>
    </div>
  )
}
