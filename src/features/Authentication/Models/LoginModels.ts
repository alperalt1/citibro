export interface LoginInputModel {
    usuario: string;
    clave: string;
    recordarSesion: boolean;
}

export interface LoginResponseModel {
    respuesta: {
        codigo: string;
        mensaje: string;
        esExitosa: boolean;
        existeExcepcion: boolean;
    };
    resultado: {
        validarFactorAutenticacion: boolean;
        jwt: {
            accessToken: string;
            refreshToken: string;
            expiration: string;
            daysValidityRefreshToken: number;
        };
    };
}