import axios from 'axios';

const API_URL = 'https://api.example.com';

const UserService = {
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  },
};

export default UserService;
