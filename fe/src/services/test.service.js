import axios from 'axios';
import { Server } from "../dataConfig";

const UserService = {
  getUsers: async () => {
    try {
      const response = await axios.get(`${Server}/users`);
      return response.data;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  },
};

export default UserService;
