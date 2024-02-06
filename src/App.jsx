import { MainLayout } from '@/layouts/MainLayout'
import { SubLayout } from '@/layouts/SubLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { navigation } from '@/navigation'

function App() {
  const { pathname } = useLocation()
  const currentNav = navigation.find((nav) => nav.path === pathname)

  let layout;

  switch (currentNav?.layout) {
    case 'main':
      layout = <MainLayout currentNav={currentNav} />;
      break;
    case 'public':
      layout = <PublicLayout currentNav={currentNav} />;
      break;
    case 'sub':
      layout = <SubLayout currentNav={currentNav} />;
      break;
    default:
      layout = <MainLayout currentNav={currentNav} />;
  }

  return (
    <>
      {layout}
      <Routes>
        {navigation.map(({ path, element }, key) => element && <Route key={key} exact path={path} element={element} />)}
        <Route path='*' element={<Navigate to='/description' replace />} />
      </Routes>
    </>
  )
}

export default App;
