import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    //const { dispatch } = useAuthContext()

    const signup = async(fullName, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://campus-coin-backend.onrender.com/api/users/signUp', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ fullName, email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            //update the authContext
            //dispatch({type: 'SIGN IN', payload: json})

            setIsLoading(false)

        }

       
    }

    return { signup, error, isLoading }
};

export default useSignUp;
 