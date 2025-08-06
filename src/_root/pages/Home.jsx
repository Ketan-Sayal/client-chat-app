import { useEffect, useRef } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import SideBar from '../../lib/components/SideBar';
import ChatArea from '../../lib/components/ChatArea';
import sound from "../../assets/sound.mp3";
import { socket } from '../../server';

const Home = () => {
    const {user, user2, setOnlineUsers, isConnected, onlineUsers, setMessages, messages} = useAuthContext();
    const audioRef = useRef();
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
    const handleOnlingUsers = ({users, disconnectedUser})=>{
        if(!disconnectedUser || disconnectedUser === null || disconnectedUser===undefined){
          setOnlineUsers(users);
        }else{
          setOnlineUsers((prev)=>(prev.map((prevOnlineUser)=>prevOnlineUser?.mongodbId!==disconnectedUser?.mongodbId?prevOnlineUser:null)));
        }
    }
    const handleRecivedMessages = ({user, message})=>{
      // console.log(user);
      
        if(user?.mongodbId?.toString() === user2?._id?.toString()){
          setMessages([...messages, {left:true, message, user}]);
          
        }else{
          // console.log(user);
          // console.log(onlineUsers);
          
          setOnlineUsers(prev=>(prev.map((prevOnlineUser)=>((prevOnlineUser?.mongodbId.toString() === user?.mongodbId.toString())?({...prevOnlineUser, unreadMessages:(parseInt(prevOnlineUser?.unreadMessages?.toString()))+1}):prevOnlineUser))));
        }
        audioRef.current.play();
    }
    socket.on("get-online-users", handleOnlingUsers);
    socket.on("new-message-recived", handleRecivedMessages);
    return ()=>{
        socket.off("get-online-users", handleOnlingUsers);
        socket.off("new-message-recived", handleRecivedMessages);
    }
  }, [socket, messages, onlineUsers]);
    // console.log(user);
    
  return (
    <div className='w-full h-full flex items-center overflow-hidden'>
      <audio ref={audioRef} src={sound} className='hidden'></audio>
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
