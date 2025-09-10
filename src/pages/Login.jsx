import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { Eye, EyeOff } from 'lucide-react';
import { account } from '@/lib/Appwrite'


function Login() {

  let navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false);

  useEffect(()=>{
    const auth = async()=>{
      try {
      const admin = await account.get()

        if (admin) {
          navigate("/admin")
        }
    } catch (error) {
      console.log("do login")
    }
    }

    auth()
  },[])

  const handleLogin = async()=>{
    try {
      const res = await account.createEmailPasswordSession(
        email,
        password)
        navigate("/admin")
    } catch (error) {
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
                onKeyDown={(e)=>{
                  if (e.key === "Enter") {
                    handleLogin()
                  }
                }}
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
          <Button className='bg-gradient-to-r from-[#F97316] to-[#713306] px-10 cursor-pointer' disabled={!email || !password} onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
      </div>
    </>
  )
}

export default Login