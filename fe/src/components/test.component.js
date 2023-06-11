import React, { useEffect, useState } from 'react';
import UserService from '../services/test.service';
import '../styles/test.style.css';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await UserService.getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error retrieving users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
