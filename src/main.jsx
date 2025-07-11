import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import {Admin, AdminLayout, Campaign, Campaigns, Contact, Dashboard, Home, Login } from './pages'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='campaigns' element={<Campaigns/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='campaign/:id' element={<Campaign/>}/>
      <Route path='admin' element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
        <Route path='dashboard' element={<Dashboard/>}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
