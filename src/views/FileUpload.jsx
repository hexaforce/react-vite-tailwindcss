import { useState } from 'react'
import '@/assets/scss/FileUpload.scss'

function FileUpload() {
  const [files, setFiles] = useState({})
  const [isDraggedOver, setIsDraggedOver] = useState(false)

  function addFile(file) {
    const newFiles = { ...files }
    const objectURL = URL.createObjectURL(file)
    newFiles[objectURL] = file
    setFiles(newFiles)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDraggedOver(false)
    const droppedFiles = event.dataTransfer.files
    for (const file of droppedFiles) {
      addFile(file)
    }
  }

  function handleDragOver(event) {
    event.preventDefault()
  }

  function handleDragEnter(event) {
    event.preventDefault()
    setIsDraggedOver(true)
  }

  function handleDragLeave(event) {
    event.preventDefault()
    setIsDraggedOver(false)
  }

  function handleFileInputChange(event) {
    const selectedFiles = event.target.files
    for (const file of selectedFiles) {
      addFile(file)
    }
  }

  function handleDelete(objectURL) {
    const newFiles = { ...files }
    delete newFiles[objectURL]
    setFiles(newFiles)
  }

  function handleSubmit() {
    alert(`Submitted Files:\n${JSON.stringify(files)}`)
    console.log(files)
  }

  function handleCancel() {
    setFiles({})
  }

  return (
    <div className='h-screen w-screen bg-gray-500 sm:px-8 sm:py-8 md:px-16'>
      <div className='container mx-auto h-full max-w-screen-lg'>
        <article aria-label='File Upload Modal' className='relative flex h-full flex-col rounded-md bg-white shadow-xl' onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
          <div id='overlay' className={`pointer-events-none absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center rounded-md ${isDraggedOver ? 'draggedover' : ''}`}>
            <i>
              <svg className='mb-3 h-12 w-12 fill-current text-blue-700' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path d='M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z' />
              </svg>
            </i>
            <p className='text-lg text-blue-700'>Drop files to upload</p>
          </div>

          <section className='flex h-full w-full flex-col overflow-auto p-8'>
            <header className='flex flex-col items-center justify-center border-2 border-dashed border-gray-400 py-12'>
              <p className='mb-3 flex flex-wrap justify-center font-semibold text-gray-900'>
                <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
              </p>
              <input id='hidden-input' type='file' multiple className='hidden' onChange={handleFileInputChange} />
              <button id='button' className='focus:shadow-outline mt-2 rounded-sm bg-gray-200 px-3 py-1 hover:bg-gray-300 focus:outline-none' onClick={() => document.getElementById('hidden-input').click()}>
                Upload a file
              </button>
            </header>

            <h1 className='pb-3 pt-8 font-semibold text-gray-900 sm:text-lg'>To Upload</h1>

            <ul id='gallery' className='-m-1 flex flex-1 flex-wrap'>
              {Object.keys(files).length === 0 ? (
                <li id='empty' className='flex h-full w-full flex-col items-center justify-center text-center'>
                  <img className='mx-auto w-32' src='https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png' alt='no data' />
                  <span className='text-small text-gray-500'>No files selected</span>
                </li>
              ) : (
                Object.keys(files).map((objectURL) => (
                  <li key={objectURL} className='xl:w-1/8 block h-24 w-1/2 p-1 sm:w-1/3 md:w-1/4 lg:w-1/6'>
                    <article className='focus:shadow-outline elative group relative h-full w-full cursor-pointer rounded-md bg-gray-100 shadow-sm focus:outline-none'>
                      {files[objectURL].type.match('image.*') ? (
                        <img src={objectURL} alt='upload preview' className='img-preview sticky hidden h-full w-full rounded-md bg-fixed object-cover' />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center bg-gray-300'>
                          <span className='text-gray-700'>{files[objectURL].name}</span>
                        </div>
                      )}
                      <section className='absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md px-3 py-2 text-xs'>
                        <h1 className='flex-1 group-hover:text-blue-800'>{files[objectURL].name}</h1>
                        <div className='flex'>
                          <span className='p-1 text-blue-800'>
                            <i>
                              <svg className='ml-auto h-4 w-4 fill-current pt-1' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                                <path d='M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z' />
                              </svg>
                            </i>
                          </span>
                          <p className='size p-1 text-xs text-gray-700'>{files[objectURL].size > 1024 ? (files[objectURL].size > 1048576 ? Math.round(files[objectURL].size / 1048576) + 'mb' : Math.round(files[objectURL].size / 1024) + 'kb') : files[objectURL].size + 'b'}</p>
                          <button className='delete ml-auto rounded-md p-1 text-gray-800 hover:bg-gray-300 focus:outline-none' onClick={() => handleDelete(objectURL)}>
                            <svg className='pointer-events-none ml-auto h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                              <path className='pointer-events-none' d='M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z' />
                            </svg>
                          </button>
                        </div>
                      </section>
                    </article>
                  </li>
                ))
              )}
            </ul>
          </section>

          <footer className='flex justify-end px-8 pb-8 pt-4'>
            <button id='submit' className='focus:shadow-outline rounded-sm bg-blue-700 px-3 py-1 text-white hover:bg-blue-500 focus:outline-none' onClick={handleSubmit}>
              Upload now
            </button>
            <button id='cancel' className='focus:shadow-outline ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:outline-none' onClick={handleCancel}>
              Cancel
            </button>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default FileUpload
