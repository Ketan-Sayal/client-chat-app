import React, { useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import SideBar from '../../lib/components/SideBar';
import ChatArea from '../../lib/components/ChatArea';
import { socket } from '../../server';

const Home = () => {
    const {user, user2, setOnlineUsers, isConnected, onlineUsers} = useAuthContext();
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
    socket.on("get-online-users", handleOnlingUsers);
    return ()=>{
        socket.off("get-online-users", handleOnlingUsers);
    }
  }, [setOnlineUsers, onlineUsers, socket]);

  
    console.log(user);
    
  return (
    <div className='w-full h-full flex items-center overflow-hidden'>
      <div className='flex-1/6 h-screen border-r-2 border-r-slate-800 max-h-screen'>
        <SideBar onlineUsers={onlineUsers} user={user}/>
      </div>
      <div className='flex-1/2 h-screen px-2 py-3'>
        <ChatArea user1={user} user2={user2}/>
      </div>
    </div>
  )
}

export default Home
