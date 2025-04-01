import { useAuthContext } from "./useAuthContext";

export const useSignOut = () => {

    //const {dispatch} = useAuthContext();

    const signout = () => {
        //remove user from storage
        localStorage.removeItem('user');

        //localStorage.removeItem('token');

        //dispatch logout action
        //dispatch({type: 'LOG OUT'})
        
    }
 
    return {signout}

}