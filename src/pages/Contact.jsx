import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth, googleProvider } from "@/lib/Firebase";
import { socket } from "@/lib/Socket";
import axios from "axios";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  Clock,
  IndianRupee,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState("");
  const bottomRef = useRef(null)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    socket.on("get-private-message",async(messages)=>{
      setMessages((prev)=>[...prev,messages])
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact/setdel`,{id:messages.id})
      console.log(messages)
    })

    return ()=>{
      socket.off("get-private-message")
    }
  },[])

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
      console.log(currentUser)
      const userData = {
        name:currentUser.displayName,
        email:currentUser.email,
        uid:currentUser.uid
      }
      socket.emit("register-user", userData);  
    })
  },[])

  const chatMessage = () => {
    if (chat.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const messagess = {
      message: chat,
      time: currentTime,
    };
    setMessages((prev)=>[...prev,messagess])
    socket.emit("send-private-message",{
      senderId:user.uid,
      receiverId:"6874b8daac189c32a1da72aa",
      messagess
    })
    console.log(messages);
    setChat("")
    }else{
      console.log("Input is empty")
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      const scrollContainer = bottomRef.current.closest('.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages])


  const googleLogin = async()=>{
    try {
      const res = await signInWithPopup(auth, googleProvider)
      const user = res.user
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  const logOut = async()=>{
    try {
      await signOut(auth)
      console.log("logout success")
    } catch (error) {
      console.error
    }
  }
  return (
    <>
      <div className="py-20 flex justify-center flex-col items-center mx-5 text-center">
        <h1>Contact Us</h1>
        <p>
          Welcome back! Start a conversation with our support team or reach out
          through our other contact channels.
        </p>
      </div>
      <div className="flex md:flex-row flex-col md:gap-0 gap-5">
        <Card className="bg-black text-white mx-5 md:w-2/5">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Reach out to us through any of these channels
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex gap-2 items-start ">
              <MessageSquare className="size-6 pt-1" />
              <div>
                <p className="font-medium">Live Chat</p>
                <p className="text-sm text-gray-300">
                  Available 24/7 for instant support
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <Mail className="size-6 pt-1" />
              <div>
                <p className="font-medium">Email</p>
                <Link
                  to={"mailto:contact@twcampaign.in"}
                  className="text-sm text-[#F97316]"
                >
                  contact@twcampaign.in
                </Link>
              </div>
            </div>
            {/* <div className="flex gap-2 items-start">
            <Phone className="size-6 pt-1"/>
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-gray-300">Available 24/7 for instant support</p>
            </div>
          </div> */}
            <div className="flex gap-2 items-start">
              <MapPin className="size-6 pt-1" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-gray-300">
                  Available 24/7 for instant support
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <Clock className="size-6 pt-1" />
              <div>
                <p className="font-medium">Working Hours</p>
                <p className="text-sm text-gray-300">
                  Monday - Saturday: 10:00 AM - 8:00 PM
                </p>
                <p className="text-sm text-gray-300">Sunday: Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black text-white mx-5 md:w-3/5">
          <CardHeader className="flex items-center gap-5">
            <Avatar>
              <AvatarFallback className="bg-black border-2">AP</AvatarFallback>
            </Avatar>
            <div className="flex justify-between w-full">
              <div>
              <CardTitle>Sarah Johnson</CardTitle>
              <p>Customer Support Agent</p>
            </div>
            <div><LogOut onClick={logOut}/></div>
            </div>
          </CardHeader>
          <CardContent className="h-96 flex flex-col">
            {user?<>
              <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <div className="flex flex-col justify-end min-h-full p-5 gap-3">
              {messages.map((chat, index)=>(<div key={index} className={`${chat.isServer?"bg-[#126a2c] self-start":"bg-[#155a69] self-end"} flex flex-col px-2 py-1 rounded-sm max-w-3/4 min-w-20`}>
                <p className="text-[14px]">{chat.message}</p>
                <span className="flex text-[10px] text-gray-300 items-end justify-end">{chat.time}</span>
              </div>))}
              <div ref={bottomRef}/>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    chatMessage()
                  }
                }}
              />
              <Button onClick={chatMessage} className="bg-[#F97316]">
                <Send/>
              </Button>
            </div>
            </>:<div className="flex flex-col gap-5 h-full items-center justify-center">
                <h2>Login first to contact us</h2>
                <Button onClick={googleLogin} className="bg-[#F97316] cursor-pointer hover:bg-white hover:text-black">Login</Button>
              </div>}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Contact;
