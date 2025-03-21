// import React, { createContext, useState, useEffect } from 'react';

// // Create a context
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Retrieve user data from localStorage and parse it safely
//     const userData = localStorage.getItem('userData'); 
//     let parsedUserData = null;

//     try {
//       parsedUserData = userData ? JSON.parse(userData) : null;
//     } catch (error) {
//       console.error("Error parsing user data from localStorage:", error);
//       // Handle invalid JSON or missing data
//       parsedUserData = null;
//     }

//     // Update the state with parsed user data if available
//     if (parsedUserData) {
//       setUser(parsedUserData);
//     } else {
//       setUser(null);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import dotenv from 'dotenv';


//const API_URL = "http://localhost:5000";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                const storedToken = localStorage.getItem("token");
            
                // Check if storedUser is valid before parsing
                let parsedUser = null;
                if (storedUser) {
                    try {
                        parsedUser = JSON.parse(storedUser);
                    } catch (error) {
                        console.error("Error parsing stored user:", error);
                        localStorage.removeItem("user"); // Remove corrupt data
                    }
                }
            
                if (parsedUser && storedToken) {
                    setUser(parsedUser);
                    setToken(storedToken);
                    await validateToken(storedToken);
                }
            } catch (err) {
                console.error("Auth initialization error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);
    

    const validateToken = async (token) => {
        try {
            const res = await axios.get("http://localhost:5000/api/validate", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 200) {
                setToken(token);
                return true;
            } else {
                return await refreshToken(refreshToken);
            }
        } catch (error) {
            return await refreshToken(refreshToken);
        }
    };

    const refreshToken = async (refreshToken) => {
        try {
            const res = await axios.post("http://localhost:5000/api/refresh", { refreshToken });
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            return true;
        } catch (error) {
            signout();
            return false;
        }
    };

    // Register function
    const signup = async (fullName, email, password) => {
        try {
            setError(null);
            const response = await axios.post("http://localhost:5000/api/users/signUp", { fullName, email, password });
            navigate('/dashboard')
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Registration failed";
            setError(errorMessage);
            throw errorMessage;
        }
    };

    // Login function
    const signin = async (email, password) => {
        try {
            setError(null);
            const res = await axios.post("http://localhost:5000/api/users/signIn", { email, password });
            
             if (!res.data.user) {
                 throw new Error("User data not received from server");
             }

            
            setUser(res.data.user)
            setToken(res.data.token);

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            

            navigate('/dashboard');
            return res.data.user;
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Login failed";
            setError(errorMessage);
            console.error(errorMessage);
            throw errorMessage;
        }
    };

    // Logout function
    const signout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                await axios.post("http://localhost:5000/api/users/logout", { refreshToken });
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate('/signIn');
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            loading,
            error,
            setUser,  
            signup, 
            signin, 
            signout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};