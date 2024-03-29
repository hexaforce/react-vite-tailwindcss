import { MainLayout } from '@/layouts/MainLayout'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { findNavigation, navigation, userNavigation } from '@/navigation'
import FlightPointMap from '@/views/FlightPointMap'
import { useAuth0 } from '@auth0/auth0-react'
import { Loading } from '@/assets/Loading'

function App() {
  const { pathname } = useLocation()
  const currentNav = findNavigation(pathname)
  const { isLoading, error } = useAuth0()

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isLoading) {
    return <Loading />
  }

  // getAccessTokenSilently().then((token) => console.log('token:', token))
  // const token = await getAccessTokenSilently()
  // console.log("token:",token)
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
        <Route exact path='/' element={<FlightPointMap />} />
        {navigation.map(({ path, element }, key) => element && <Route key={key} exact path={path} element={element} />)}
        {userNavigation.map(({ path, element }, key) => element && <Route key={key} exact path={path} element={element} />)}
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </MainLayout>
  )
}

export default App
