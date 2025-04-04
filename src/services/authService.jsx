import axios from 'axios';


export const signup = async (userData) => {
    return await axios.post(`https://campus-coin-backend.onrender.com/api/users/signUp`, userData);
};

export const signin = async (userData) => {
    return await axios.post(`https://campus-coin-backend.onrender.com/api/users/signIn`, userData, { withCredentials: true });
};
