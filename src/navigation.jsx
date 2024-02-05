import { Description, Stacked, Form, Top, Contact } from '@/views'

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
]

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
