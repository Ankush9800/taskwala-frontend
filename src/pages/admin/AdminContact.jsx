import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { socket } from "@/lib/Socket";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import axios from "axios";
import { Divide, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

function AdminContact() {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState("");
  const bottomRef = useRef(null);
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    const user = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getadmin`,
        {
          withCredentials: true,
        }
      );
      const admin = res.data.data;
      console.log(res.data.data);
      const userData = {
        name:admin.fullName,
        email:admin.email,
        uid:admin._id,
      }
      socket.emit("register-user", userData);
      socket.emit("request-users",admin._id)
    };
    user();
  }, []);

  useEffect(() => {
    socket.on("get-private-message", (messages) => {
      setMessages((prev) => [...prev, messages]);
      console.log(messages);
    });

    return () => {
      socket.off("get-private-message");
    };
  }, []);

  const secletChatUser =(value)=>{
    setSelectedUser(value)
    console.log(value)
  }

  const chatMessage = () => {
      console.log(selectedUser)
    if (chat.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const messagess = {
        message: chat,
        time: currentTime,
      };
      setMessages((prev) => [...prev, messagess]);
      socket.emit("send-private-message", {
        id: selectedUser.userId,
        messagess,
      });
      setChat("");
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      const scrollContainer = bottomRef.current.closest(".overflow-y-auto");
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  useEffect(()=>{
    socket.on("get-users",(allUsers)=>{
      setUsers(allUsers)
      console.log(allUsers)
    })
  },[])
  return (
    <>
      <div></div>
      <div className="flex md:flex-row flex-col w-full gap-5 h-[calc(100vh-80px)]">
        <div className="md:w-2/5 w-full h-full">
          <Card className="bg-black text-white h-full">
            <CardHeader>
              <Input placeholder="Search users"/>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] flex flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              {users?.map((user, index)=>(
                <div key={index} className="border-2 rounded-md p-2 cursor-pointer" onClick={()=>secletChatUser(user)}>
                  <p className="text-sm">{user.fullName}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="md:w-3/5 w-full h-full"><Card className="bg-black text-white h-full">
        <CardHeader className="flex items-center gap-5 border-b-1 pb-2">
          <Avatar>
            {selectedUser?<AvatarFallback className="bg-black border-2 rounded-4xl p-1">
              {(selectedUser?.fullName)?.split(" ").map(word =>word[0]).join("")}
            </AvatarFallback>:<></>}
          </Avatar>
          <div>
            <CardTitle>{selectedUser.fullName}</CardTitle>
            <p>{selectedUser.email}</p>
          </div>
        </CardHeader>
        <CardContent className="h-[calc(100%-80px)] flex flex-col">
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col justify-end min-h-full p-5 gap-3">
              {messages.map((chat, index) => (
                <div
                  key={index}
                  className={`${
                    chat.isServer
                      ? "bg-[#126a2c] self-start"
                      : "bg-[#155a69] self-end"
                  } flex flex-col px-2 py-1 rounded-sm max-w-3/4 min-w-20`}
                >
                  <p className="text-[14px]">{chat.message}</p>
                  <span className="flex text-[10px] text-gray-300 items-end justify-end">
                    {chat.time}
                  </span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  chatMessage();
                }
              }}
            />
            <Button onClick={chatMessage} className="bg-[#F97316]">
              <Send />
            </Button>
          </div>
        </CardContent>
      </Card></div>
      </div>
    </>
  );
}

export default AdminContact;
