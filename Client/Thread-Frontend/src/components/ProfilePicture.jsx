import React, { useState } from "react";
import instance from "../axiosConfig";
import useProfile from "../hooks/useProfile";
import { ToastContainer, toast } from 'react-toastify';

function ProfilePicture() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { setProfileUrl, profileUrl, deleteProfile } = useProfile();
  const notify = () => toast("Profile Picture uploaded !!!");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an image to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await instance.post("/user/profile-picture", formData);

      setProfileUrl(response.data.profilePicture);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Error uploading the profile picture."
      );
    }
  }

  return (
    <>
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">My Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="relative">
          <input
            name="image"
            type="file"
            onChange={handleChange}
            className="absolute opacity-0 w-32 h-32 cursor-pointer rounded-full"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="w-32 h-32 bg-gray-300 border-2 border-gray-400 rounded-full cursor-pointer flex justify-center items-center text-white"
          >
            {profileUrl ? (
              <img
                src={profileUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <span>+</span>
            )}
          </label>
        </div>
        {!profileUrl ? (
          <button
            type="submit"
            className="p-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-400 mt-4"
            onClick={notify}
          >
            Upload
          </button>
        ) : (
          <button
            type="button"
            className="p-2 rounded bg-red-600 text-white font-bold hover:bg-red-400 mt-4"
            onClick={deleteProfile}
          >
            Remove
          </button>
        )}
      </form>
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
  );
}

export default ProfilePicture;
