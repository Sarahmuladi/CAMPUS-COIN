import { AuthContext } from "../components/Context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {

    const context = useContext(AuthContext)
    
    if (!context){
        throw Error('useAuthContext must be used within an AuthContext')
    }

    return context
}