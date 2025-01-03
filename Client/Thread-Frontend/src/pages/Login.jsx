import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/Auth.jsx';
import instance from '../axiosConfig.js';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const [data, setData] = useState({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) {
      const referer = searchParams.get("referer");
      if (referer) navigate(referer);
    }
  }, [isAuthenticated, navigate, searchParams]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await instance.post('/user/login', data);
      if (response.status === 200) {
        login(response.data.user);
        navigate('/');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center text-black bg-gray-300">
      <div className="bg-pink-300 flex justify-center items-center flex-col p-4 rounded-xl gap-3 w-1/4">
        {message.length > 0 ? (
          <p><em className="font-bold text-2xl text-center">{message}</em></p>
        ) : (
          <>
            <h2 className="font-bold text-2xl">Log in to your account</h2>
            <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col w-full">
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={data.username}
                onChange={handleChange}
                className="rounded p-1.5 border-none outline-none w-10/12 focus:shadow-md focus:shadow-lime-400"
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange}
                className="rounded p-1.5 border-none outline-none w-10/12 focus:shadow-md focus:shadow-lime-400"
              />
              <br />
              <button type="submit" className="p-2 rounded bg-cyan-600 text-white font-bold hover:bg-sky-400">
                Log In
              </button>
            </form>
            <Link to="/forgot-password" className="underline text-blue-700">Forgot Password</Link>
            <p>
              New User? <Link to="/register" className="text-indigo-800">Register</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
