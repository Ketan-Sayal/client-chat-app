import React from 'react'
import { FaUserSecret } from 'react-icons/fa'
import { useAuthContext } from '../../context/AuthContext'

const UserCard = ({user}) => {
    const {setUser2} = useAuthContext();
    // console.log(user);
    
  return (
    <div onClick={()=>setUser2(user)} className='w-full h-fit py-3 hover:bg-slate-800 px-4 gap-5 cursor-pointer transition-all delay-200 flex items-center'>
      {user?.image?<img src={user?.image} alt="user-pic" className='w-10 h-10 xl:w-14 xl:h-14 rounded-full'/>:(<FaUserSecret size={30} className='rounded-full xl:w-14 xl:h-14'/>)}
        <div className='flex flex-col w-full h-10'>
            <h3 className='text-sm xl:text-base font-bold'>{user?.username}</h3>
            <p className='text-xs xl:text-sm font-light'>{user?.email}</p>
        </div>
    </div>
  )
}

export default UserCard
