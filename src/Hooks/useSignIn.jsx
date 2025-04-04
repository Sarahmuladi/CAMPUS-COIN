import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignIn = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signin = async( email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://campus-coin-backend.onrender.com/api/users/signIn', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
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
            dispatch({type: 'SIGN IN', payload: json})

            setIsLoading(false)

        }

    }

    return { signin, error, isLoading }
};

export default useSignIn;
 