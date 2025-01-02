import React, { createContext, useState } from 'react';
import instance from '../axiosConfig';

export const profileContext = createContext(null);

function ProfileContext({children}) {
    const [profileUrl, setProfileUrl] = useState(null);

    async function getProfile(){
          try {
            const response = await instance.get("/user/profile-picture");
            setProfileUrl(response.data.profilePicture);
          } catch (error) {
            console.log(error);
          }
    }

    async function deleteProfile(){
        try {
            const response = await instance.delete("/user/profile-picture");
            setProfileUrl(null); 
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <profileContext.Provider value={{ profileUrl, getProfile, setProfileUrl, deleteProfile }}>
        {children}
      </profileContext.Provider>
    );
}

export default ProfileContext;
