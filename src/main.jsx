import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router'
import {Admin, AdminLayout, Campaign, Campaigns, Contact, Conversion, Dashboard, Home, Login, NotFound, Offers, Payments, Profile, Submission, Test, Tracker, Verify } from './pages'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='verify' element={<Verify/>}/>
      <Route path='test' element={<Test/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='campaigns' element={<Campaigns/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='tracker' element={<Tracker/>}/>
      <Route path='campaign/:id' element={<Campaign/>}/>
      <Route path='admin' element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
        <Route index element={<Dashboard/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='submission' element={<Submission/>}/>
        <Route path='offers' element={<Offers/>}/>
        <Route path='conversion' element={<Conversion/>}/>
        <Route path='payments' element={<Payments/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
      <Route path="404" element={<NotFound />} />
      <Route path='*' element={<Navigate to="/404" replace state={{ from: window.location.pathname }} />}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
