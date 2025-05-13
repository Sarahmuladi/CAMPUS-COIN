import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Load tokens from localStorage
    useEffect(() => {
        const checkAuth = async () => {
            const storedAccessToken = localStorage.getItem("accessToken");
            const storedRefreshToken = localStorage.getItem("refreshToken");

            if (storedAccessToken) {
                try {
                    const decoded = jwtDecode(storedAccessToken);
                    setUser(decoded);
                    setAccessToken(storedAccessToken);

                    // Auto refresh token before it expires
                    const expiryTime = decoded.exp * 1000 - Date.now();
                    setTimeout(refreshToken, expiryTime - 60000); // Refresh 1 min before expiry

                } catch (error) {
                    //console.error("Invalid token:", error);
                    signout();
                }
            } else if (storedRefreshToken) {
                await refreshToken(); // Try refreshing if access token is missing
            }
        };
        checkAuth();
    }, []);

    // Refresh token function
    const refreshToken = async () => {
        const storedRefreshToken = localStorage.getItem("refreshToken");
        if (!storedRefreshToken) return signout();

        try {
            const res = await axios.post("https://campus-coin-backend.onrender.com/api/auth/refresh", {
                refreshToken: storedRefreshToken,
            });

            if (res.data.accessToken) {
                setAccessToken(res.data.accessToken);
                localStorage.setItem("accessToken", res.data.accessToken);

                // Decode new access token
                const decoded = jwtDecode(res.data.accessToken);
                setUser(decoded);

                // Set next refresh before expiry
                const expiryTime = decoded.exp * 1000 - Date.now();
                setTimeout(refreshToken, expiryTime - 60000); // Refresh 1 min before expiry
            } else {
                throw new Error("New access token not received");
            }
        } catch (error) {
            console.error("Refresh token failed:", error);
            signout();
        }
    };

    // Register function
    const signup = async (fullName, email, password) => {
        try {
            setError(null);
            const response = await axios.post("https://campus-coin-backend.onrender.com/api/auth/signUp", { fullName, email, password });
            navigate('/dashboard');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Registration failed";
            setError(errorMessage);
            throw new Error(errorMessage); 
        }
    };
    

    // Login function
    const signin = async (email, password) => {
        try {
            setError(null);
            const res = await axios.post("https://campus-coin-backend.onrender.com/api/auth/signIn", { email, password }, {
                headers: { "Content-Type": "application/json" },
            });
    
            console.log("Response from server:", res.data);
    
            if (!res.data.user || !res.data.accessToken || !res.data.refreshToken) {
                throw new Error("User data or tokens not received from server");
            }
    
            setUser(res.data.user);
            setAccessToken(res.data.accessToken);
    
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
    
            navigate('/dashboard');
            return res.data.user;
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Login failed";
            setError(errorMessage);
            console.error("Login error:", errorMessage);
            throw new Error(errorMessage);  
        }
    };
    

    // Logout function
    const signout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/signIn";
    };

    return (
        <AuthContext.Provider value={{
            user,
            accessToken,
            loading,
            error,
            signup,
            signin,
            signout
        }}>
            {children}
        </AuthContext.Provider>
    );
};


