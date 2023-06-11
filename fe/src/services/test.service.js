import axios from 'axios';
// import { Server } from "../dataConfig";

const UserService = {
  getUsers: async () => {
    try {
      // const response = await axios.get(`${Server}/users`);
      const response = await axios.get(`https://647cb1eec0bae2880ad1148c.mockapi.io/users`);
      return response.data;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  },
};

export default UserService;
