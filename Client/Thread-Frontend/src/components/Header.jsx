import React, { useContext, useEffect, useRef, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { SiMessenger } from "react-icons/si";
import { IoIosHome } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/Auth'
import ProfilePicture from './ProfilePicture';
import instance from '../axiosConfig';
import useProfile from '../hooks/useProfile';
import { FaUserFriends } from "react-icons/fa";

function Header() {
    
    const { isAuthenticated, user, logout, loading } = useAuth();


 const { profileUrl, getProfile } = useProfile(); 

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    async function handleLogout() {
      await logout();
      setIsOpen(false); 
    }
  
    function handleDropdown() {
      setIsOpen((prev) => !prev);
    }

    useEffect(()=>{
      getProfile();
    }, []);
  
    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  
    if (loading) {
      return (
        <header className="flex justify-center items-center h-16 bg-zinc-700 text-white">
          <p>Loading...</p>
        </header>
      );
    }

  return (
    <div className='w-full h-12 px-12 flex justify-between items-center bg-pink-500'>
      <h2 className='font-bold text-white text-3xl'>TwistTalk</h2>
      <div className='w-auto'>
        <ul className='flex justify-center items-center text-white gap-4'>
          <Link className='text-2xl'><IoIosHome /></Link>
          <Link className='text-2xl' to="/users"><FaUserFriends /></Link>
          <Link className='text-xl'><SiMessenger /></Link>
          <li className="relative" ref={dropdownRef}>
              <button
                onClick={handleDropdown}
                className="hover:text-gray-300 focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {profileUrl ? (
                  <img src={profileUrl} alt=""  className='w-8 h-8 rounded-full'/>
                ):
                <CgProfile className="text-2xl" />
              }
              </button>

              {isOpen && (
                <ul className="absolute top-full right-0 mt-2 bg-pink-200 shadow-md rounded-lg flex flex-col py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-blue-500"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-500 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Header;
