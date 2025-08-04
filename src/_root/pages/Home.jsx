import React, { useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import SideBar from '../../lib/components/SideBar';
import ChatArea from '../../lib/components/ChatArea';
import { socket } from '../../server';

const Home = () => {
    const {user, user2, setOnlineUsers, isConnected, onlineUsers, setMessages, messages} = useAuthContext();
    // console.log(user);


  useEffect(()=>{
    // console.log(isConnected);
    
    if(isConnected && user && socket){
        // console.log("Connected with user");
        
        socket.emit("user-joined", user);
    }
  }, [isConnected, user,socket]);

  useEffect(()=>{
    // console.log("Online users section called");
    const handleOnlingUsers = (users)=>{
        setOnlineUsers(users);
    }
    const handleRecivedMessages = ({user, message})=>{
      // console.log("message recived: ", message);
      
      if(user?._id === user2?._id){
        setMessages([...messages, {left:true, message}]);
      }
    }
    socket.on("get-online-users", handleOnlingUsers);
    socket.on("new-message-recived", handleRecivedMessages);
    return ()=>{
        socket.off("get-online-users", handleOnlingUsers);
        socket.off("new-message-recived", handleRecivedMessages);
    }
  }, [setOnlineUsers, socket, messages]);
    // console.log(user);
    
  return (
    <div className='w-full h-full flex items-center overflow-hidden'>
      <div className='flex-1/6 h-screen border-r-2 border-r-slate-800 max-h-screen'>
        <SideBar onlineUsers={onlineUsers} user={user}/>
      </div>
      <div className='flex-1/2 h-screen'>
        <ChatArea user1={user} user2={user2}/>
      </div>
    </div>
  )
}

export default Home
