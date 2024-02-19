import { Description, Stacked, Contact,  Form, NotFound, Chat, Products } from '@/views'
import { Cog6ToothIcon, UserIcon } from '@heroicons/react/20/solid'

import Calendar from '@/components/fullcalendar'

// import FileUpload2 from '@/views/FileUpload2'
import FileUpload from '@/views/FileUpload'
import Dialogs from '@/views/Dialogs'
import MediaLibrary from '@/views/MediaLibrary'

import FlightPointMap from '@/views/FlightPointMap'

const subLayout = 'header'

export const findNavigation = (pathname) => {
  let path = pathname === '/' ? '/map' : pathname
  let currentNav = navigation.find((nav) => nav.path === path)
  if (!currentNav) currentNav = userNavigation.find((nav) => nav.path === path)
  if (!currentNav)
    return {
      name: '404',
      path: '/404',
      element: <NotFound />,
      subLayout: 'none',
    }
  return currentNav
}

export const navigation = [
  {
    name: 'FlightPoint',
    path: '/map',
    element: <FlightPointMap />,
    subLayout: 'none',
  },
  {
    name: 'EventSchedule',
    path: '/calendar',
    element: <Calendar />,
    subLayout: subLayout,
  },
  {
    name: 'MediaLibrary',
    path: '/movie',
    element: <MediaLibrary />,
    subLayout: 'none',
  },
  {
    name: 'OpenChat',
    path: '/chat',
    element: <Chat />,
    subLayout: subLayout,
  },
  // {
  //   name: 'Dialogs',
  //   path: '/dialogs',
  //   element: <Dialogs />,
  //   subLayout: subLayout,
  // },
  {
    name: 'Description',
    path: '/description',
    element: <Description />,
    subLayout: subLayout,
  },
  {
    name: 'FileUpload',
    path: '/fileUpload',
    element: <FileUpload />,
    subLayout: subLayout,
  },
  // mysqldump -h 127.0.0.1 -u fpv_v2008 -p -P 3307 fpv_v2008 --no-data > dumpfile.sql
  // {
  //   name: 'Products',
  //   path: '/products',
  //   element: <Products />,
  //   subLayout: subLayout,
  // },

  // {
  //   name: 'Stacked',
  //   path: '/stacked',
  //   element: <Stacked />,
  //   subLayout: subLayout,
  // },
  {
    name: 'Form',
    path: '/form',
    element: <Form />,
    subLayout: subLayout,
  },
  // {
  //   name: 'Top',
  //   path: '/top',
  //   element: <Top />,
  //   subLayout: subLayout,
  // },
  // {
  //   name: 'Contact',
  //   path: '/contact',
  //   element: <Contact />,
  //   subLayout: subLayout,
  // },
  // {
  //   name: 'SignIn',
  //   path: '/sign-in',
  //   element: <SignIn />,
  //   subLayout: 'none',
  // },
  // {
  //   name: 'Slide',
  //   path: '/slide',
  //   element: <Slide />,
  //   subLayout: 'none',
  // },
]

export const userNavigation = [
  {
    icon: <UserIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />,
    name: 'Your Profile',
    path: '/profile',
    element: <Contact />,
    subLayout: subLayout,
  },
  {
    icon: <Cog6ToothIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />,
    name: 'Settings',
    path: '/settings',
    element: <Stacked />,
    subLayout: subLayout,
  },
]
