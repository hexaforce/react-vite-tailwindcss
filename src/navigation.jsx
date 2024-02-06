import { Description, Stacked, Form, Top, Contact, Map } from '@/views'

export const navigation = [
  {
    name: 'Description',
    path: '/description',
    element: <Description />,
    layout: "main",
  },
  {
    name: 'Stacked',
    path: '/stacked',
    element: <Stacked />,
    layout: "public",
  },
  {
    name: 'Form',
    path: '/form',
    element: <Form />,
    layout: "public",
  },
  {
    name: 'Top',
    path: '/top',
    element: <Top />,
    layout: "sub",
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />,
    layout: "sub",
  },
  {
    name: 'Map',
    path: '/map',
    element: <Map />,
    layout: "main",
  },
]

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
