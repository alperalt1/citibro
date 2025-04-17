
import { useEffect } from "react";
import { useAuthStore } from "../redux/store/AuthStore";
import { AuthenticationRepository } from "../Repositories/AuthenticationRepository";
import { LoginInputModel } from "../Models/LoginModels";
import {toast} from 'sonner';
export const AuthenticationService = () => {
    const { handleSignIn } = useAuthStore();
    const { useIniciarSesionMutation } = AuthenticationRepository;


    const [triggerIniciarSesion, {
        isLoading: isLoadingLogin,
        data: dataLogin,
        error: errorLogin
    }] = useIniciarSesionMutation();
    

    const iniciarSesion = (data: LoginInputModel) => {
        triggerIniciarSesion(data)
    }

    useEffect(() => {
        if (errorLogin) {
            toast.warning('Credenciales Inválidas')
        }
        if (dataLogin?.respuesta.esExitosa) {
            handleSignIn({
                accessToken: dataLogin.resultado.jwt.accessToken,
                resfreshToken: dataLogin.resultado.jwt.refreshToken,
            });
            toast.success('Inicio de sesión exitoso')
            
        } 

        if (!dataLogin?.respuesta.esExitosa && dataLogin?.respuesta.mensaje) {
            toast.error('Error al Iniciar Sesión')
            console.log("ver otro error")
        }
        
    }, [dataLogin, errorLogin]);


    return {
        iniciarSesion,
        isLoadingLogin: isLoadingLogin,
        dataLogin,
        errorLogin
    }
}