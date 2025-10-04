import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { account } from '@/lib/Appwrite';
import axios from 'axios';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  Shield,
  ArrowRight,
  CheckCircle,
  Target,
  Award,
  Users,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("")
  const [btnActive, setbtnActive] = useState(false)
  const captchaRef = useRef(null);

  useEffect(() => {
    const auth = async () => {
      try {
        const admin = await account.get();

        if (admin) {
          navigate('/admin');
        }
      } catch (error) {
        console.log('do login');
      }
    };

    auth();
  }, []);

  useEffect(()=>{
    window.turnstile?.render("#cf-captcha", {
      sitekey: "0x4AAAAAAB40acTEPL3N1nB8",
      callback: (token) => setToken(token),
    });
  },[])

  useEffect(()=>{
    console.log("attemped")
    const run = async()=>{
      try {
        const res = await axios.post(`http://localhost:8000/admin/verifytoken`,
          {token:token}
        )
        console.log(res.data)
        setbtnActive(true)
      } catch (error) {
        console.log(error)
      }
    }
    if (token) {
      run()
    }
  },[token])

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await account.createEmailPasswordSession(email, password);
      toast.success('Login successful! Redirecting...');
      navigate('/admin');
    } catch (error) {
      console.log(error);
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <Toaster />
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          {/* Logo and Title */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316]/20 to-[#713306]/20 border border-[#F97316]/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm font-medium text-white">Admin Portal</span>
              <Sparkles className="w-4 h-4 text-[#F97316]" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="text-white">Welcome to</span>
              <br />
              <span className="bg-gradient-to-r from-[#F97316] to-[#713306] bg-clip-text text-transparent">
                TaskWala
              </span>
              <br />
              <span className="text-white">Admin</span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              Access your dashboard to manage campaigns, track performance, and monitor rewards distribution.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-[#F97316] to-[#713306] p-2 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Campaign Management</h3>
                <p className="text-gray-400 text-sm">Create and monitor campaign performance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-[#155a69] to-[#F97316] p-2 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">User Analytics</h3>
                <p className="text-gray-400 text-sm">Track user engagement and participation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-[#10B981] to-[#155a69] p-2 rounded-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Reward Distribution</h3>
                <p className="text-gray-400 text-sm">Manage payments and reward systems</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="bg-black/80 backdrop-blur-sm border-gray-800 shadow-2xl">
            <CardHeader className="space-y-4 pb-8">
              {/* Mobile Logo */}
              <div className="lg:hidden text-center mb-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316]/20 to-[#713306]/20 border border-[#F97316]/30 rounded-full px-4 py-2 mb-4">
                  <Shield className="w-4 h-4 text-[#F97316]" />
                  <span className="text-sm font-medium text-white">Admin Portal</span>
                </div>
                <h1 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-[#F97316] to-[#713306] bg-clip-text text-transparent">
                    TaskWala Admin
                  </span>
                </h1>
              </div>

              <div className="text-center lg:text-left">
                <CardTitle className="text-2xl text-white font-bold">
                  Sign in to your account
                </CardTitle>
                <CardDescription className="text-gray-400 mt-2">
                  Enter your credentials to access the admin dashboard
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@taskwala.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#F97316] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin();
                      }
                    }}
                    className="pl-10 pr-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#F97316] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div ref={captchaRef} id="cf-captcha"></div>

              {/* Security Note */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#155a69]/20 to-[#F97316]/20 border border-[#155a69]/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#155a69] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium select-none">Secure Login</p>
                  <p className="text-xs text-gray-400 select-none">Your credentials are encrypted and secure</p>
                </div>
              </div>

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                disabled={!email || !password || loading || !btnActive}
                className="w-full bg-gradient-to-r from-[#F97316] to-[#713306] hover:from-[#F97316]/80 hover:to-[#713306]/80 text-white font-medium py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="select-none w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 select-none">
                    <Shield className="w-5 h-5" />
                    Sign in to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>

              {/* Additional Info */}
              <div className="text-center pt-4">
                <p className="text-xs text-gray-400 select-none">
                  Need help? Contact your system administrator
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;