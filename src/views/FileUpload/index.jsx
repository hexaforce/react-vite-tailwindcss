import { useEffect, useState } from 'react'
import '@/assets/scss/FileUpload.scss'
import { useQuery, useMutation } from '@apollo/client'
import { VideoTemplate, ImageTemplate, FileTemplate } from '@/views/FileUpload/Template'
import { uploadPresignedUrl, CREATE_PRESIGNED_REQUEST, GET_POST_OBJECTS, LIST_OBJECTS } from '@/queries/FileUpload'
import { CREATE_MEDIA_LIBRARY_MUTATION } from '@/queries/MediaLibrary'
import { uploadFileToS3 } from '@/queries/FileUpload'
import { useAuth0 } from '@auth0/auth0-react'

export default function FileUpload() {
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
    console.log(file)
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


  const { getIdTokenClaims } = useAuth0()
  const [createMediaLibrary] = useMutation(CREATE_MEDIA_LIBRARY_MUTATION)
  async function submit(event) {
    event.preventDefault()

    const token = (await getIdTokenClaims()).__raw
    Object.keys(files).forEach((objectURL) => {
      uploadFileToS3(token, 'fpv-japan-public', files[objectURL])
        .then((response) => {
          const createMediaLibraryInput = {
            file_name: files[objectURL].name,
            file_type: files[objectURL].type,
            file_size: files[objectURL].size,
            wasabi_file_key: response.fileKey,
          }
          try {
            createMediaLibrary({ variables: { createMediaLibraryInput } })
              .then((response) => console.log('response:', response.data))
              .catch((error) => console.log('error:', error))
          } catch (error) {
            console.error(error.message)
          }
          // console.log('response:', response.data)
          // response.data.fileKey
        })
        .catch((error) => console.log('error:', error))
    })

    // setSubmitClicked(true)
    // setNames(Object.keys(files).map((objectURL) => files[objectURL].name))
    // refetch()
  }

  // const { loading, error, data, refetch } = useQuery(CREATE_PRESIGNED_REQUEST, {
  //   variables: { fileNames: names, command: 'PutObject', expires: '+2 minutes' },
  //   skip: !submitClicked,
  // })

  // const [submitClicked, setSubmitClicked] = useState(false)
  // const [names, setNames] = useState([])
  // const { loading, error, data, refetch } = useQuery(GET_POST_OBJECTS, {
  //   variables: { names },
  //   skip: !submitClicked,
  // })

  // useEffect(() => {
  //   if (loading || !data) return
  //   // Object.keys(files).map((objectURL) => {
  //   //   const fileBlob = files[objectURL]
  //   //   const presignedUrl = data.createPresignedRequest.find((result) => result.fileName === fileBlob.name).presignedUrl
  //   //   uploadPresignedUrl(fileBlob, presignedUrl)
  //   // })
  // }, [loading, error, data, files])

  return (
    <div className='h-screen w-screen bg-gray-500 sm:px-8 sm:py-8 md:px-16'>
      <form onSubmit={(event) => submit(event)} className='container mx-auto h-full max-w-screen-lg'>
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
                    {files[objectURL].type.match('video.*') ? <VideoTemplate objectURL={files[objectURL]} deleteFile={deleteFile} /> : files[objectURL].type.match('image.*') ? <ImageTemplate objectURL={files[objectURL]} deleteFile={deleteFile} /> : <FileTemplate objectURL={files[objectURL]} deleteFile={deleteFile} />}
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* sticky footer */}
          <footer className='flex justify-end px-8 pb-8 pt-4'>
            <button type='submit' className='focus:shadow-outline rounded-sm bg-blue-700 px-3 py-1 text-white hover:bg-blue-500 focus:outline-none'>
              Upload now
            </button>
            <button type='button' className='focus:shadow-outline ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:outline-none' onClick={() => setFiles({})}>
              Cancel
            </button>
          </footer>
        </article>
      </form>
    </div>
  )
}
