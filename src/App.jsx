import { MainLayout } from '@/layouts/MainLayout'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { routes } from '@/routes'

function App() {
  const { pathname } = useLocation()
  return (
    <MainLayout>
      <h1>{pathname}</h1>
      <Routes>
        {routes.map(({ path, element }, key) => element && <Route key={key} exact path={path} element={element} />)}
        <Route path='*' element={<Navigate to='/description' replace />} />
      </Routes>
    </MainLayout>
  )
}

export default App
