export interface Credentials {
    usuario: string,
    clave: string,
}

export interface LoginFactorAutenticacion {
    usuario: string,
    codigoFactorAutenticacion: string,
}

export interface ResultadoLogin {
    validarFactorAutenticacion: boolean;
    jwt?: JwtDto;
}

export interface JwtDto {
    accessToken: string;
    refreshToken: string;
    expiration: string;
}

export interface ForgotPasswordFormModel {
    username: string,

}

export interface ResponseForgotPasswordModel {
    message: string,
}

export interface CreateNewPasswordModel {
    password: string,
    token: string,
}