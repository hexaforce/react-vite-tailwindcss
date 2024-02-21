import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import PropTypes from 'prop-types'

MediaContent.propTypes = {
  cancelButtonRef: PropTypes.object.isRequired,
  openMediaPreview: PropTypes.bool.isRequired,
  setOpenMediaPreview: PropTypes.func.isRequired,
  mediaContent: PropTypes.instanceOf(Blob),
}

export function MediaContent({ cancelButtonRef, openMediaPreview, setOpenMediaPreview, mediaContent }) {
  function MediaImage() {
    if (!mediaContent) return <div>Loading...</div>
    return <img src={URL.createObjectURL(mediaContent)} alt={mediaContent.name} />
  }
  if (!openMediaPreview) return <></>
  return (
    <>
      <MediaImage />
      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
        {/* 
<button type='button' className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto' onClick={() => setOpenMediaPreview(false)}>
Deactivate
</button> 
*/}
        <button
          ref={cancelButtonRef}
          type='button'
          className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
          onClick={() => {
            setOpenMediaPreview(false)
          }}
        >
          Cancel
        </button>
      </div>
    </>
  )
}

MediaPreview.propTypes = {
  children: PropTypes.node.isRequired,
  cancelButtonRef: PropTypes.object.isRequired,
  openMediaPreview: PropTypes.bool.isRequired,
  setOpenMediaPreview: PropTypes.func.isRequired,
  widthImage: PropTypes.bool.isRequired,
}

export default function MediaPreview({ children, cancelButtonRef, openMediaPreview, setOpenMediaPreview, widthImage }) {
  return (
    <Transition.Root show={openMediaPreview} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpenMediaPreview}>
        <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  ${widthImage ? 'sm:max-w-6xl' : 'sm:max-w-xl'}`}>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
