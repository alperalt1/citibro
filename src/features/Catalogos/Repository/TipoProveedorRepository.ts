import { IBaseRepository } from "../Interfaces/IBaseRepository";
import { TipoProveedor, TipoProveedorActualizacion } from "../Model/TipoProveedor";
import AxiosHelper, { AxiosConfig, ResponseData } from "../../../services/AxiosHelper";


export default class TipoProveedorRepository implements IBaseRepository<TipoProveedor, TipoProveedorActualizacion> {
    
    async update(dataSave: TipoProveedorActualizacion): Promise<ResponseData<TipoProveedor>> {
        const config: AxiosConfig = {
            method: 'POST',
            url: 'TipoProveedor/Editar',
            data: dataSave
        };
        
        return await AxiosHelper.fetch<ResponseData<TipoProveedor>>(config);
    }

    async save(dataSave: TipoProveedorActualizacion): Promise<ResponseData<TipoProveedor>> {
        const config: AxiosConfig = {
            method: 'POST',
            url: 'TipoProveedor/Guardar',
            data: dataSave
        };
        
        return await AxiosHelper.fetch<ResponseData<TipoProveedor>>(config);
    }

    async getById(id: number): Promise<ResponseData<TipoProveedor>> {
        const config: AxiosConfig = {
            method: 'GET',
            url: 'TipoProveedor/ConsultarTipoProveedor',
            params: {
                id: id
            }
        };
        
        return await AxiosHelper.fetch<ResponseData<TipoProveedor>>(config);
    }

    async getAll(): Promise<ResponseData<TipoProveedor[]>> {
        const config: AxiosConfig = {
            method: 'GET',
            url: 'TipoProveedor/ConsultarTodos',
        };
        
        return await AxiosHelper.fetch<ResponseData<TipoProveedor[]>>(config);
    }

    async GetDataAllByFilter(filterDataDynamic: Record<string, string | number | boolean | null>): Promise<ResponseData<TipoProveedor[]>> {
        const config: AxiosConfig = {
            method: 'POST',
            url: 'TipoProveedor/ConsultarTodosFiltros',
            data: filterDataDynamic,
        };
        
        return await AxiosHelper.fetch<ResponseData<TipoProveedor[]>>(config);
    }


    async delete(id: number): Promise<ResponseData<boolean>> {
        const config: AxiosConfig = {
            method: 'POST',
            url: 'TipoProveedor/Eliminar',
            params: {
                id: id
            }
        };
        
        return await AxiosHelper.fetch<ResponseData<boolean>>(config);
    }

}
