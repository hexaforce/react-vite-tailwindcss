import { Description, Stacked, Form, Top, Contact, FlightPointMap, SignIn, NotFound, Slide } from '@/views'

const subLayout = 'header'

export const findNavigation = (pathname) => {
  if (pathname === '/'){
    return navigation.find((nav) => nav.path === '/map')
  }
  return navigation.find((nav) => nav.path === pathname)
}

export const navigation = [
  {
    name: 'FlightPoint',
    path: '/map',
    element: <FlightPointMap />,
    subLayout: 'none',
  },
  {
    name: 'Description',
    path: '/description',
    element: <Description />,
    subLayout: subLayout,
  },
  {
    name: 'Stacked',
    path: '/stacked',
    element: <Stacked />,
    subLayout: subLayout,
  },
  {
    name: 'Form',
    path: '/form',
    element: <Form />,
    subLayout: subLayout,
  },
  {
    name: 'Top',
    path: '/top',
    element: <Top />,
    subLayout: subLayout,
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />,
    subLayout: subLayout,
  },
  {
    name: 'SignIn',
    path: '/sign-in',
    element: <SignIn />,
    subLayout: 'none',
  },
  {
    name: '404',
    path: '/404',
    element: <NotFound />,
    subLayout: 'none',
  },
  {
    name: 'Slide',
    path: '/slide',
    element: <Slide />,
    subLayout: 'none',
  },
]

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
