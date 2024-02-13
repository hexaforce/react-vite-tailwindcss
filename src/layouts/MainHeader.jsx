import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/utils'
import { navigation, userNavigation } from '@/navigation'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'

import { ArrowRightStartOnRectangleIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/20/solid'

MainHeader.propTypes = {
  currentPath: PropTypes.string.isRequired,
}

export function MainHeader({ currentPath }) {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? <XMarkIcon className='block h-6 w-6' aria-hidden='true' /> : <Bars3Icon className='block h-6 w-6' aria-hidden='true' />}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <img className='h-8 w-auto' src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500' alt='Your Company' />
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation?.map(({ name, path }) => (
                      <Link key={name} to={path} className={classNames(path === currentPath ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')} aria-current={path === currentPath ? 'page' : undefined}>
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {isAuthenticated && (
                  <button type='button' className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                    <span className='absolute -inset-1.5' />
                    <span className='sr-only'>View notifications</span>
                    <BellIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                )}

                {/* Profile dropdown */}
                {isAuthenticated && (
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <span className='absolute -inset-1.5' />
                        <span className='sr-only'>{user.nickname}</span>
                        <img className='h-8 w-8 rounded-full' src={user.picture} alt={user.email} />
                      </Menu.Button>
                    </div>
                    <Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {userNavigation?.map(({ icon, name, path }) => (
                          <Menu.Item key={name}>
                            {({ active }) => (
                              <Link to={path} className={classNames(active ? 'bg-gray-100' : '', 'inline-flex items-center px-4 py-2 text-sm text-gray-700')}>
                                {icon}
                                {name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item onClick={() => logoutWithRedirect()}>
                          {({ active }) => (
                            <Link to='#' className={classNames(active ? 'bg-gray-100' : '', 'inline-flex items-center px-4 py-2 text-sm text-gray-700')}>
                              <ArrowRightStartOnRectangleIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}

                {!isAuthenticated && (
                  <span className='sm:ml-3'>
                    <button type='button' onClick={() => loginWithRedirect()} className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                      <ArrowRightEndOnRectangleIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
                      Sign in
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation?.map(({ name, path }) => (
                <Link key={name} to={path}>
                  <Disclosure.Button key={name} className={classNames(path === currentPath ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')} aria-current={path === currentPath ? 'page' : undefined}>
                    {name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
