import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { Link, useParams } from 'react-router-dom';
import instance from '../axiosConfig';

function UserCard({user}) {
    const [isFollow, setIsFollow] = useState(false);


    useEffect(() => {
        async function fetchFollowStatus() {
          try {
            const response = await instance.get(`/follower/status/${user._id}`);
            setIsFollow(response.data.isFollowing);
          } catch (error) {
            console.error('Error fetching follow status:', error);
          }
        }
    
        fetchFollowStatus();
      }, [user._id]);

async function handleFollow(id){
    try {
        const response = await instance.post('/follower/follow/' + id);
        console.log(response.data.message);
        setIsFollow(true); 
    } catch (error) {
        console.log(error);
    }
}

async function handleUnfollow(id){
    try {
        const response = await instance.delete('/follower/unfollow/' + id);
        console.log(response.data.message);
        setIsFollow(false);
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div className='w-80 bg-pink-200 rounded p-4 flex justify-between items-center'>
        {user.profilePicture ? (
            <Link to = {`/user/${user._id}`}>
           <img src={user.profilePicture} className='rounded-full w-16 h-16'  />
           </Link>
        )
    : (
        <Link to = {`/user/${user._id}`}>
        <CgProfile className='w-16 h-16 text-neutral-500'/>
        </Link>
    )}
      <div>
        <Link className='font-bold' to = {`/user/${user._id}`}>{user.name}</Link>
        <p className='text-neutral-500'>{user.username}</p>
      </div>
      {isFollow ? (
        <button 
        className='p-2 bg-blue-500 rounded text-white font-bold'
        onClick={()=>handleUnfollow(user._id)}>Unfollow</button>
      ) : (
        <button 
      className='p-2 bg-blue-500 rounded text-white font-bold'
      onClick={()=>handleFollow(user._id)}>Follow</button>
      )}
      
    </div>
  )
}

export default UserCard
