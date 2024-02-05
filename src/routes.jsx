import { Description, Stacked, Form } from '@/views'

export const routes = [
    {
      name: 'description',
      path: '/description',
      element: <Description />,
    },
    {
      name: 'stacked',
      path: '/stacked',
      element: <Stacked />,
    },
    {
      name: 'form',
      path: '/form',
      element: <Form />,
    },
  ]
