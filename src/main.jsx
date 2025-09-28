import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router'
import { AdminLayout, Campaign, Campaigns, Contact, Conversion, Dashboard, Home, Login, NotFound, Offers, Payments, Profile, Refer, Submission, SubmissionExport, Support, Tracker } from './pages'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='campaigns' element={<Campaigns/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='tracker' element={<Tracker/>}/>
      <Route path='camp' element={<Campaign/>}/>
      <Route path='ref' element={<Refer/>}/>
      <Route path='admin' element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
        <Route index element={<Dashboard/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='submission' element={<Submission/>}/>
        <Route path='offers' element={<Offers/>}/>
        <Route path='conversion' element={<Conversion/>}/>
        <Route path='payments' element={<Payments/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='support' element={<Support/>}/>
        <Route path='submission-export' element={<SubmissionExport/>}/>
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
