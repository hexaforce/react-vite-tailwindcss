import { Description, Stacked, Form, Top, Contact, Map } from '@/views'

export const navigation = [
  {
    name: 'Description',
    path: '/description',
    element: <Description />,
  },
  {
    name: 'Stacked',
    path: '/stacked',
    element: <Stacked />,
  },
  {
    name: 'Form',
    path: '/form',
    element: <Form />,
  },
  {
    name: 'Top',
    path: '/top',
    element: <Top />,
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />,
  },
  {
    name: 'Map',
    path: '/map',
    element: <Map />,
  },
]

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
