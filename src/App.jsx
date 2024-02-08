import { MainLayout } from '@/layouts/MainLayout'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { findNavigation, navigation } from '@/navigation'


function App() {
  const { pathname } = useLocation()
  const currentNav = findNavigation(pathname)

  // let layout

  // switch (currentNav?.layout) {
  //   case 'main':
  //     layout = <MainLayout currentNav={currentNav} />
  //     break
  //   case 'public':
  //     layout = <PublicLayout currentNav={currentNav} />
  //     break
  //   case 'sub':
  //     layout = <SubLayout currentNav={currentNav} />
  //     break
  //   default:
  //     layout = <></>
  // }

  return (
    <MainLayout currentNav={currentNav}>
      <Routes>
        {navigation.map(({ path, element }, key) => element && <Route key={key} exact path={path} element={element} />)}
        <Route path='/' element={<Navigate to='/map' replace />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </MainLayout>
  )
}

export default App
