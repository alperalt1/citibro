export interface RespuestaGenerica {
    codigo: string;
    mensaje: string;
    esExitosa: boolean;
    existeExcepcion: boolean;
}

export interface RespuestaGenericaConsultaDto<T> {
    respuesta: RespuestaGenerica;
    resultado?: T;
}

export interface RespuestaGenericaConsultasDto<T> {
    respuesta: RespuestaGenerica,
    resultado?: T[];
}