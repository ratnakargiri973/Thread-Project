import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import instance from '../axiosConfig';
import { FaAngleRight } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import ProfilePicture from '../components/ProfilePicture';

function Profile() {
    const [data, setData] = useState({});
    // const [message, setMessage] = useState(null);
    const [changes, setChanges] = useState(false);
    const notify = () => toast("Your Profile has been updated !");

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData(){
        try {
            const response = await instance.get("/user/profile", {
                withCredentials: true
            });
            // console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log(error)
            setData({});
        }
    }

    function handleChange(e){
        const {name, value} = e.target;
        setData((prev) => {
            return {...prev, [name]: value}
        });
        setChanges(true);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const response = await instance.put('/user/edit-profile', data);
        if(response.status === 200){
            navigate("/profile?sucess=true");
        }
    }
  return (
    <>
    <div className='w-full h-full flex justify-start items-start'>
      <aside className='w-1/5 h-full bg-pink-200 '>
        <ul className='w-full flex flex-col justify-start items-center gap-3 text-black'>
            <li className='w-full py-2 px-2 shadow-md'>
                <Link className='flex justify-between w-full '><span>Personal Details</span> <FaAngleRight /> </Link>
            </li>
        </ul>
      </aside>
      <main className='w-4/5 h-full flex justify-center gap-16 items-center '>
        {data.name && (
            <form action="" 
                  onSubmit={handleSubmit} 
                  className='w-2/5 h-10/12 flex flex-col justify-center items-start gap-2 p-4 
                             bg-pink-300 rounded-xl text-black'>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="" className=''>Name </label>
                    <input 
                       type="text" 
                       name="name" 
                       placeholder='Your Name'
                       value={data.name}
                       onChange={handleChange} 
                       className="rounded p-1.5 border-none outline-none bg-white w-full focus:shadow-md focus:shadow-lime-400"/>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="">Email </label>
                    <input 
                       type="text" 
                       name="email" 
                       placeholder='Your Email'
                       value={data.email}
                       onChange={handleChange} 
                       className="rounded p-1.5 border-none outline-none bg-white w-full focus:shadow-md focus:shadow-lime-400"/>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="">Username </label>
                    <input 
                       type="text" 
                       name="username" 
                       placeholder='Your Username'
                       value={data.username}
                       onChange={handleChange} 
                       className="rounded p-1.5 border-none outline-none bg-white w-full focus:shadow-md focus:shadow-lime-400"/>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="">Phone </label>
                    <input 
                       type="number" 
                       name="phone" 
                       placeholder='Your Phone'
                       value={data.phone}
                       onChange={handleChange} 
                       className="rounded p-1.5 border-none outline-none bg-white w-full focus:shadow-md focus:shadow-lime-400"/>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="">Bio </label>
                    <input 
                       type="text" 
                       name="bio" 
                       placeholder='Bio'
                       value={data.bio}
                       onChange={handleChange} 
                       className="rounded p-1.5 border-none outline-none bg-white w-full focus:shadow-md focus:shadow-lime-400"/>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <button type='submit' 
                            onClick={notify}
                            disabled={changes ? false : true} className="p-2 rounded bg-sky-600 text-white font-bold hover:bg-rose-900">
                        Save Details
                    </button>
                </div>
            </form>
        )}
        <ProfilePicture />
      </main>
    </div>
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    // transition={Bounce}
    />
    </>
  )
}

export default Profile
