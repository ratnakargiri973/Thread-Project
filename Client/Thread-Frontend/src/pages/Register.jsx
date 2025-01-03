import React, { useState } from 'react';
import instance from '../axiosConfig.js';
import { Link } from 'react-router-dom';

function Register() {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const finalData = Object.fromEntries(formData.entries());

      const response = await instance.post('/user/register', finalData);
      console.log(response);
      if (response.status === 201) {
        setMessage(response.data.message);
        setData({
          name: "",
          username: "",
          email: "",
          password: "",
          phone: "",
          gender: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center text-black bg-gray-300">
      <div
        className="bg-pink-300
      flex justify-center items-center flex-col p-4 rounded-xl gap-3 w-1/4"
      >
        {message.length > 0 ? (
          <>
          <h3 className='font-bold text-2xl text-center'>{message}</h3>
          <p>Now you can {" "}
            <Link to="/login" className="text-indigo-800">
                Sign In
              </Link></p>
          </>
        ) : (
          <>
            <h2 className="font-bold text-2xl">Create Your Account</h2>

            <form
              action=""
              onSubmit={handleSubmit}
              className="flex justify-center items-center flex-col w-full"
            >
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={data.name}
                onChange={handleChange}
                className="rounded p-1.5 border-none outline-none w-10/12 focus:shadow-md focus:shadow-lime-400"
              />
              <br />

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={data.username}
                onChange={handleChange}
                className="rounded p-1.5 border-none outline-none w-10/12 focus:shadow-md focus:shadow-lime-400"
              />
              <br />

              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={data.email}
                onChange={handleChange}
                className="rounded p-1.5 border-none outline-none w-10/12 focus:shadow-md focus:shadow-lime-400"
              />
              <br />

              <input
                type="text"
                name="password"
                placeholder="Enter Password"
                value={data.password}
                onChange={handleChange}
                className="rounded p-1.5 border-none outline-none  w-10/12 focus:shadow-md focus:shadow-lime-400"
              />
              <br />

              <input
                type="number"
                name="phone"
                placeholder="Phone"
                value={data.phone}
                onChange={handleChange}
                className="rounded p-1.5 border-none outline-none w-10/12 focus:shadow-md focus:shadow-lime-400"
              />
              <br />

              <select name="gender" id=""
                      className="rounded p-1.5 border-none outline-none w-10/12 focus:shadow-md focus:shadow-lime-400"
                      onChange={handleChange}>
                <option value="Select">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <br />

              <button
                type="submit"
                className="p-2 rounded bg-cyan-600 text-white font-bold hover:bg-sky-400"
              >
                Register
              </button>
            </form>
            <p>
              Already have an account ? {" "}
              <Link to="/login" className="text-indigo-800">
                Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
