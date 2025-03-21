import axios from 'axios';


export const signup = async (userData) => {
    return await axios.post(`http://localhost:5000/api/users/signUp`, userData);
};

export const signin = async (userData) => {
    return await axios.post(`http://localhost:5000/api/users/signIn`, userData, { withCredentials: true });
};
