export interface TipoProveedor {
    idTipoProveedor: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
}

export interface TipoProveedorActualizacion {
    idTipoProveedor: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
}