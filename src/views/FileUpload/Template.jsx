import PropTypes from 'prop-types'
import { fileSize } from '@/queries/FileUpload'

VideoTemplate.propTypes = {
  objectURL: PropTypes.instanceOf(Blob).isRequired,
  deleteFile: PropTypes.func.isRequired,
}

export function VideoTemplate({ objectURL, deleteFile }) {
  return (
    <article tabIndex='0' className='hasImage focus:shadow-outline group relative h-full w-full cursor-pointer rounded-md bg-gray-100 text-transparent shadow-sm hover:text-white focus:outline-none'>
      <video src={URL.createObjectURL(objectURL)} alt={objectURL.name} className='img-preview sticky h-full w-full rounded-md bg-fixed object-cover' />
      <section className='absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md px-3 py-2 text-xs'>
        <h1 className='flex-1'>{objectURL.name}</h1>
        <div className='flex'>
          <span className='p-1'>
            <i>
              <svg className='pt- ml-auto h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path d='m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z' />
              </svg>
            </i>
          </span>
          <p className='size p-1 text-xs'>{fileSize(objectURL.size)}</p>
          <button className='delete ml-auto rounded-md p-1 hover:bg-gray-300 focus:outline-none' onClick={() => deleteFile(objectURL)}>
            <svg className='pointer-events-none ml-auto h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path className='pointer-events-none' d='M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z' />
            </svg>
          </button>
        </div>
      </section>
    </article>
  )
}

ImageTemplate.propTypes = {
  objectURL: PropTypes.instanceOf(Blob).isRequired,
  deleteFile: PropTypes.func.isRequired,
}

export function ImageTemplate({ objectURL, deleteFile }) {
  return (
    <article tabIndex='0' className='hasImage focus:shadow-outline group relative h-full w-full cursor-pointer rounded-md bg-gray-100 text-transparent shadow-sm hover:text-white focus:outline-none'>
      <img src={URL.createObjectURL(objectURL)} alt={objectURL.name} className='img-preview sticky h-full w-full rounded-md bg-fixed object-cover' />
      <section className='absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md px-3 py-2 text-xs'>
        <h1 className='flex-1'>{objectURL.name}</h1>
        <div className='flex'>
          <span className='p-1'>
            <i>
              <svg className='pt- ml-auto h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path d='M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z' />
              </svg>
            </i>
          </span>
          <p className='size p-1 text-xs'>{fileSize(objectURL.size)}</p>
          <button className='delete ml-auto rounded-md p-1 hover:bg-gray-300 focus:outline-none' onClick={() => deleteFile(objectURL)}>
            <svg className='pointer-events-none ml-auto h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path className='pointer-events-none' d='M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z' />
            </svg>
          </button>
        </div>
      </section>
    </article>
  )
}

FileTemplate.propTypes = {
  objectURL: PropTypes.instanceOf(Blob).isRequired,
  deleteFile: PropTypes.func.isRequired,
}

export function FileTemplate({ objectURL, deleteFile }) {
  return (
    <article tabIndex='0' className='focus:shadow-outline elative group relative h-full w-full cursor-pointer rounded-md bg-gray-100 shadow-sm focus:outline-none'>
      <img alt='upload preview' className='img-preview sticky hidden h-full w-full rounded-md bg-fixed object-cover' />

      <section className='absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md px-3 py-2 text-xs'>
        <h1 className='flex-1 group-hover:text-blue-800'>{objectURL.name}</h1>
        <div className='flex'>
          <span className='p-1 text-blue-800'>
            <i>
              <svg className='ml-auto h-4 w-4 fill-current pt-1' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path d='M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z' />
              </svg>
            </i>
          </span>
          <p className='size p-1 text-xs text-gray-700'>{fileSize(objectURL.size)}</p>
          <button className='ml-auto rounded-md p-1 text-gray-800 hover:bg-gray-300 focus:outline-none' onClick={() => deleteFile(objectURL)}>
            <svg className='pointer-events-none ml-auto h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path className='pointer-events-none' d='M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z' />
            </svg>
          </button>
        </div>
      </section>
    </article>
  )
}
