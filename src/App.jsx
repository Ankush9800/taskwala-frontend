import { useEffect, useState } from 'react'
import './App.css'
import { matchPath, Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { MainContextProvider } from './lib/context'
import { trackPage } from './lib/Analytics'

function App() {
  const location = useLocation();
  const path = location.pathname;

  useEffect(()=>{
    trackPage(location.pathname)
    window.scrollTo(0, 0);
  },[location])

  const hidePaths = ['/ref','/date','/login','/camp', '/register','/admin', '/admintemp', '/admin/dashboard','/admin/offers', '/admin/submission', '/admin/submission-export', '/tracker','/admin/conversion','/404','/admin/payments','/admin/profile','/admin/support','/verify','/test'];

  const hideHeaderFooter =
    hidePaths.includes(path)

  return (
    <MainContextProvider>
      {!hideHeaderFooter && <Header />}
      <Outlet/>
      {!hideHeaderFooter && <Footer />}
    </MainContextProvider>
  )
}

export default App
