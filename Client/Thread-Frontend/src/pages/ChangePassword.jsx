import React, { useState } from 'react'
import instance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await instance.post("/user/change-password", {username, password});
      setMessage(response.message || response.error);
      navigate("/login");
    };
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center bg-gray-300'>
      
      <form onSubmit={handleSubmit} className='flex  flex-col gap-4 bg-pink-300 px-12 py-8 rounded'>
      <h2 className='font-bold text-2xl'>Change Password</h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
           className='border-none outline-none p-2 rounded'
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           className='border-none outline-none p-2 rounded'
        />
        <button type="submit" className='p-2 rounded bg-blue-500 text-white'>Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ChangePassword
