import { Description, Stacked, Form, Top, Contact, Map, SignIn, NotFound, Slide } from '@/views'

const layout = "main"
// const layout = "public"
// const layout = 'sub'

export const navigation = [
  {
    name: 'Description',
    path: '/description',
    element: <Description />,
    layout: layout,
  },
  {
    name: 'Stacked',
    path: '/stacked',
    element: <Stacked />,
    layout: layout,
  },
  {
    name: 'Form',
    path: '/form',
    element: <Form />,
    layout: layout,
  },
  {
    name: 'Top',
    path: '/top',
    element: <Top />,
    layout: layout,
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />,
    layout: layout,
  },
  {
    name: 'Map',
    path: '/map',
    element: <Map />,
    layout: layout,
  },
  {
    name: 'SignIn',
    path: '/sign-in',
    element: <SignIn />,
    layout: 'none',
  },
  {
    name: '404',
    path: '/404',
    element: <NotFound />,
    layout: 'none',
  },
  {
    name: 'Slide',
    path: '/slide',
    element: <Slide />,
    layout: 'none',
  },
]

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
