import { MainLayout } from '@/layouts/MainLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { navigation } from '@/navigation'

function App() {
  const { pathname } = useLocation()
  return (
    // <MainLayout pathname={pathname} title={navigation.find((nav) => nav.path === pathname)?.name ?? ''}>
    //   <Routes>
    //     {navigation.map(({ path, element }, key) => element && <Route key={key} exact path={path} element={element} />)}
    //     <Route path='*' element={<Navigate to='/description' replace />} />
    //   </Routes>
    // </MainLayout>
    <PublicLayout pathname={pathname} title={navigation.find((nav) => nav.path === pathname)?.name ?? ''}>
      <Routes>
        {navigation.map(({ path, element }, key) => element && <Route key={key} exact path={path} element={element} />)}
        <Route path='*' element={<Navigate to='/description' replace />} />
      </Routes>
    </PublicLayout>
  )
}

export default App
