import PropTypes from 'prop-types'
import { MainHeader } from '@/layouts/MainHeader'

MainLayout.propTypes = {
  children: PropTypes.node,
  currentNav: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    element: PropTypes.element.isRequired,
    subLayout: PropTypes.string.isRequired,
  }).isRequired,
}

export function MainLayout({ children, currentNav }) {
  return (
    <div className='h-screen bg-white'>
      <MainHeader currentPath={currentNav.path} />
      {currentNav.subLayout === 'header' && (
        <header>
          <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>{currentNav.name}</h1>
          </div>
        </header>
      )}
      <main>
        <div className=' mx-auto max-w-7xl py-4 sm:px-6 lg:px-8 lg:py-6'>{children}</div>
      </main>
    </div>
  )
}
