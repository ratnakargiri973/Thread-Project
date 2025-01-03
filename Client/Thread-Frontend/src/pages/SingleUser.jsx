import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../axiosConfig';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

function SingleUser() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);

  const {id} = useParams();
  if(!id){
    navigate('/users');
  }

  useEffect(() => {
    if(id) fetchSingleUser(id);
  }, [id])

  useEffect(() => {
   if(id) getFollowersAndFollowingCount(id);
  }, []);

  async function fetchSingleUser(id) {
    try {
        const response = await instance.get('/user/' + id);
        setUser(response.data.user);
    } catch (error) {
        console.log(error);
    }
  }

  async function getFollowersAndFollowingCount(id){
    try {
        const response = await instance.get("/follower/count/" + id);
        setFollowersCount(response.data.totalFollowers);
        setFollowingsCount(response.data.totalFollowings);

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>{
        user && (
     <div className='w-full h-full flex justify-center p-16 gap-12'>
        <div className='w-2/5 h-4/5 p-8 flex justify-between items-start bg-pink-200 rounded'>
            <div className='flex flex-col justify-start items-center gap-4 w-1/2'>
            {
              user.profilePicture ? 
                                  <img src={user.profilePicture} className='w-36 h-36 rounded-full'/>
                                  : <CgProfile  className='w-36 h-36 rounded-full'/>
            }
             <p className='font-bold'>{user.name}</p>
             <p className='text-gray-700 text-center'>{user.bio}</p>
             </div>
        <div className='w-1/2 flex flex-col gap-4'>
        <div className='w-full flex justify-between items-center pt-12'>
             <div className='flex flex-col gap-2 justify-center items-center'>
                <span>{followersCount}</span>
                 <Link className='font-bold'>Followers</Link>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center'>
                <span>{followingsCount}</span>
                <Link className='font-bold'>Following</Link>
            </div>
         </div>
         <Link className='w-full bg-blue-500 rounded text-white p-2 font-bold text-center' to={`/messenger/${id}`}>Message</Link>
         </div>
        </div>
     </div>
        )
    }
    </>
  )
}

export default SingleUser;
