import { useState } from 'react'
import './App.css'
import { matchPath, Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const location = useLocation();
  const path = location.pathname;

  const hidePaths = ['/login', '/register','/admin', '/admintemp', '/admin/dashboard','/admin/offers', '/admin/submission', '/tracker'];

  const hideHeaderFooter =
    hidePaths.includes(path) ||
    matchPath('/campaign/:id', path);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet/>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}

export default App
