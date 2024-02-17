import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useQuery, useMutation } from '@apollo/client'
import { LIST_OBJECTS } from '@/queries/FileUpload'
import { USER_QUERY, ALL_USERS_QUERY, CREATE_USER_MUTATION, UPDATE_USER_MUTATION, DELETE_USER_MUTATION } from '@/queries/User'
import { useState } from 'react'

export function Description() {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
      <div className='px-4 sm:px-0'>
        <h3 className='text-base font-semibold leading-7 text-gray-900'>Applicant Information</h3>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>Personal details and application.</p>
      </div>
      <button onClick={() => setAgreed(true)}>Create User</button>
      {agreed && <CreateUserComponent />}

      {/* <DisplayEcho /> */}
      {agreed && <DisplayUsers />}
      <div className='mt-6 border-t border-gray-100'>
        <dl className='divide-y divide-gray-100'>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>Full name</dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>Margot Foster</dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>Application for</dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>Backend Developer</dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>Email address</dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>margotfoster@example.com</dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>Salary expectation</dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>$120,000</dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>About</dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>Attachments</dt>
            <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <ul role='list' className='divide-y divide-gray-100 rounded-md border border-gray-200'>
                <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
                  <div className='flex w-0 flex-1 items-center'>
                    <PaperClipIcon className='h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                    <div className='ml-4 flex min-w-0 flex-1 gap-2'>
                      <span className='truncate font-medium'>resume_back_end_developer.pdf</span>
                      <span className='flex-shrink-0 text-gray-400'>2.4mb</span>
                    </div>
                  </div>
                  <div className='ml-4 flex-shrink-0'>
                    <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                      Download
                    </a>
                  </div>
                </li>
                <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
                  <div className='flex w-0 flex-1 items-center'>
                    <PaperClipIcon className='h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
                    <div className='ml-4 flex min-w-0 flex-1 gap-2'>
                      <span className='truncate font-medium'>coverletter_back_end_developer.pdf</span>
                      <span className='flex-shrink-0 text-gray-400'>4.5mb</span>
                    </div>
                  </div>
                  <div className='ml-4 flex-shrink-0'>
                    <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

function DisplayEcho() {
  const { loading, error, data } = useQuery(LIST_OBJECTS)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <pre>{JSON.stringify(data?.listObjectsV2.Contents, null, 2)}</pre>
}

function DisplayUsers() {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return data?.allUsers.map(({ id, email, registered_at }) => (
    <div key={id}>
      <p>Email: {email}</p>
      <p>Registered At: {registered_at}</p>
    </div>
  ))
}

function CreateUserComponent() {
  const [createUser] = useMutation(CREATE_USER_MUTATION)
  const handleCreateUser = () => {
    const options = {
      variables: {
        user: {
          email: 'example@example.com',
          password: 'password123',
        },
      },
    }
    createUser(options)
      .then((response) => console.log('response:', response.data))
      .catch((error) => console.log('error:', error))
  }
  return <button onClick={handleCreateUser}>Create User</button>
}
