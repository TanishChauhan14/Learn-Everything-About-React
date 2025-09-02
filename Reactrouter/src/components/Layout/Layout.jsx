import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
