import axios from 'axios';

export const myList = async (user_id) => {
    return await axios.get(
        `http://localhost:5000/api/v1/categories/my-reminder/${user_id}`
    )
}