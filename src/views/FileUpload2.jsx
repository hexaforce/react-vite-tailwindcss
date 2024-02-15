import { useState } from 'react'
import '@/assets/scss/FileUpload.scss'
import PropTypes from 'prop-types'

const fileSize = (size) => {
  return size > 1024 ? (size > 1048576 ? Math.round(size / 1048576) + 'mb' : Math.round(size / 1024) + 'kb') : size + 'b'
}

ImageTemplate.propTypes = {
  objectURL: {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  },
  deleteFile: PropTypes.func.isRequired,
}

function ImageTemplate({ objectURL, deleteFile }) {
  return (
    <article tabIndex='0' className='group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm'>
      <img src={URL.createObjectURL(objectURL)} alt={objectURL.name} className='img-preview w-full h-full sticky object-cover rounded-md bg-fixed' />

      <section className='flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3'>
        <h1 className='flex-1'>{objectURL.name}</h1>
        <div className='flex'>
          <span className='p-1'>
            <i>
              <svg className='fill-current w-4 h-4 ml-auto pt-' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path d='M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z' />
              </svg>
            </i>
          </span>

          <p className='p-1 size text-xs'>{fileSize(objectURL.size)}</p>
          <button className='delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md' onClick={() => deleteFile(objectURL)}>
            <svg className='pointer-events-none fill-current w-4 h-4 ml-auto' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path className='pointer-events-none' d='M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z' />
            </svg>
          </button>
        </div>
      </section>
    </article>
  )
}

FileFemplate.propTypes = {
  objectURL: {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  },
  deleteFile: PropTypes.func.isRequired,
}

function FileFemplate({ objectURL, deleteFile }) {
  return (
    <article tabIndex='0' className='group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm'>
      <img alt='upload preview' className='img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed' />

      <section className='flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3'>
        <h1 className='flex-1 group-hover:text-blue-800'>{objectURL.name}</h1>
        <div className='flex'>
          <span className='p-1 text-blue-800'>
            <i>
              <svg className='fill-current w-4 h-4 ml-auto pt-1' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path d='M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z' />
              </svg>
            </i>
          </span>
          <p className='p-1 size text-xs text-gray-700'>{fileSize(objectURL.size)}</p>
          <button className='ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800' onClick={() => deleteFile(objectURL)}>
            <svg className='pointer-events-none fill-current w-4 h-4 ml-auto' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <path className='pointer-events-none' d='M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z' />
            </svg>
          </button>
        </div>
      </section>
    </article>
  )
}

function FileUpload2() {
  const [isDraggedOver, setIsDraggedOver] = useState(false)
  const [counter, setCounter] = useState(0)

  function dropHandler(event) {
    event.preventDefault()
    setIsDraggedOver(false)
    setCounter(0)
    const droppedFiles = event.dataTransfer.files
    for (const file of droppedFiles) {
      addFile(file)
    }
  }

  function dragOverHandler(event) {
    event.preventDefault()
  }

  function dragLeaveHandler(event) {
    event.preventDefault()
    if (1 > counter - 1) {
      setIsDraggedOver(false)
    } else {
      setCounter(counter - 1)
    }
  }

  function dragEnterHandler(event) {
    event.preventDefault()
    setIsDraggedOver(true)
    setCounter(1 + counter)
  }

  const [files, setFiles] = useState({})

  function addFile(file) {
    const newFiles = { ...files }
    const objectURL = URL.createObjectURL(file)
    newFiles[objectURL] = file
    setFiles(newFiles)
  }

  function fileInputChange(event) {
    const selectedFiles = event.target.files
    for (const file of selectedFiles) {
      addFile(file)
    }
  }

  function deleteFile(objectURL) {
    const newFiles = { ...files }
    const keys = Object.keys(newFiles)
    for (const key of keys) {
      if (newFiles[key] === objectURL) {
        delete newFiles[key]
        break
      }
    }
    setFiles(newFiles)
  }

  function submit() {
    console.log(files)
  }

  return (
    <div className='h-screen w-screen bg-gray-500 sm:px-8 sm:py-8 md:px-16'>
      <main className='container mx-auto h-full max-w-screen-lg'>
        {/* file upload modal */}
        <article aria-label='File Upload Modal' className='relative flex h-full flex-col rounded-md bg-white shadow-xl' onDrop={dropHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDragEnter={dragEnterHandler}>
          {/* overlay */}
          <div id='overlay' className={`pointer-events-none absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center rounded-md ${isDraggedOver ? 'draggedover' : ''}`}>
            <i>
              <svg className='mb-3 h-12 w-12 fill-current text-blue-700' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path d='M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z' />
              </svg>
            </i>
            <p className='text-lg text-blue-700'>Drop files to upload</p>
          </div>

          {/* scroll area */}
          <section className='flex h-full w-full flex-col overflow-auto p-8'>
            <header className='flex flex-col items-center justify-center border-2 border-dashed border-gray-400 py-12'>
              <p className='mb-3 flex flex-wrap justify-center font-semibold text-gray-900'>
                <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
              </p>
              <input id='file-input' type='file' multiple className='hidden' onChange={fileInputChange} />
              <button id='button' className='focus:shadow-outline mt-2 rounded-sm bg-gray-200 px-3 py-1 hover:bg-gray-300 focus:outline-none' onClick={() => document.getElementById('file-input').click()}>
                Upload a file
              </button>
            </header>

            <h1 className='pb-3 pt-8 font-semibold text-gray-900 sm:text-lg'>To Upload</h1>

            <ul id='gallery' className='-m-1 flex flex-1 flex-wrap'>
              {Object.keys(files).length === 0 ? (
                <li className='flex h-full w-full flex-col items-center justify-center text-center'>
                  <img className='mx-auto w-32' src='https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png' alt='no data' />
                  <span className='text-small text-gray-500'>No files selected</span>
                </li>
              ) : (
                Object.keys(files).map((objectURL) => (
                  <li key={objectURL} className='xl:w-1/8 block h-24 w-1/2 p-1 sm:w-1/3 md:w-1/4 lg:w-1/6'>
                    {files[objectURL].type.match('image.*') ? <ImageTemplate objectURL={files[objectURL]} deleteFile={deleteFile} /> : <FileFemplate objectURL={files[objectURL]} deleteFile={deleteFile} />}
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* sticky footer */}
          <footer className='flex justify-end px-8 pb-8 pt-4'>
            <button className='focus:shadow-outline rounded-sm bg-blue-700 px-3 py-1 text-white hover:bg-blue-500 focus:outline-none' onClick={() => submit()}>
              Upload now
            </button>
            <button id='cancel' className='focus:shadow-outline ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:outline-none' onClick={() => setFiles({})}>
              Cancel
            </button>
          </footer>
        </article>
      </main>
    </div>
  )
}

export default FileUpload2
