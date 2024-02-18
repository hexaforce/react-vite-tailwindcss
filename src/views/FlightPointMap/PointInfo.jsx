// import { Fragment, useRef, useState } from 'react'
import { UserIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/20/solid'

import PropTypes from 'prop-types'

PointInfo.propTypes = {
  editMode: PropTypes.bool.isRequired,
}

export default function PointInfo(props) {
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
