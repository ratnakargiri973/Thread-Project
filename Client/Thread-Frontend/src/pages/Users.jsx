import React, { useEffect, useState } from 'react';
import instance from '../axiosConfig';
import UserCard from '../components/UserCard';

function Users() {
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await instance.get('/user');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  return (
    <div className='w-full h-full p-8 flex justify-start items-start gap-8'>
      {users.length > 0 ? ( 
        users.map((user) => (
          <UserCard user={user} key={user._id}/>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

export default Users;
