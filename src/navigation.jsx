import { Description, Stacked, Form, Contact } from '@/views'

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
    name: 'Contact',
    path: '/contact',
    element: <Contact />,
  },
]