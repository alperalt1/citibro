
import { useAppDispatch, useAppSelector } from "../../../../redux/Hooks";
import { RootState } from "../../../../redux/Store";
import { signIn, signOut } from "../slices/AuthSlice";


export const useAuthStore = () => {
    
    const dispatch = useAppDispatch();
    const { authenticated, accessToken, resfreshToken, permissions } = useAppSelector((state: RootState) => state.auth);

    const handleSignIn = (data: { 
        accessToken: string, 
        resfreshToken: string,
    }) => {
        dispatch(signIn(data));
    }

    const handleSignOut = () => {
        dispatch(signOut());
    }

    return {
        authenticated,
        accessToken,
        resfreshToken,
        permissions,
        handleSignIn,
        handleSignOut,
        dispatch,
    }
}