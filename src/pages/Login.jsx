import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { Eye, EyeOff } from 'lucide-react';


function Login() {

  let navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false);

  const isLocal = window.location.hostname === "localhost";
  const backendUrl = isLocal? "http://localhost:8000" : "https://backend.hellome.site"

  const handleLogin = async()=>{
    const data = {
      email : email,
      password : password
    }

    try {
      const res = await axios.post(`${backendUrl}/admin/adminlogin`, data,{
        withCredentials : true
      })
      console.log(res)
      navigate('/admin')
    } catch (error) {
      toast(`Login failed. Please enter correct credentials`, {
      style: {
        backgroundColor: "#BA2D0B",
        color: "#fff",
        borderColor: "#fff",
        border: "2px",
      },
      duration: 2000,
      position: "top-right",
    });
      console.log(error)
    }
  }

  return (
    <>
    <Toaster/>
      <div className='w-full h-screen flex justify-center items-center content-center'>
        <Card className='max-w-100 w-full bg-[#071e23] text-white mx-5 border-0'>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-9 text-gray-400 hover:text-white"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button className='bg-gradient-to-r from-[#F97316] to-[#713306] px-10 cursor-pointer' onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
      </div>
    </>
  )
}

export default Login