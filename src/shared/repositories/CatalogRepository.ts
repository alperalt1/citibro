import AxiosHelper, { AxiosConfig3, ResponseData } from "../../services/AxiosHelper";
import { ItemListModel } from "../models/ItemListModel";

export interface CatalogInterface {
    getTypeIdentification: () => Promise<ItemListModel[]>;
    getRoles: () => Promise<ResponseData<ItemListModel[]>>;   //  Agregado
    getClients: () => Promise<ItemListModel[]>; // Agregado
}

export const CatalogRepository = (): CatalogInterface => {
    const getTypeIdentification = async (): Promise<ItemListModel[]> => { 
        const config: AxiosConfig3<void> = {
            url: 'Seguridad/enum/ListarTipoIdentificacion',
            method: 'GET',
        };
        const response = await AxiosHelper.execute<void, ItemListModel[]>(config);
        if (response.status === 'success') {
            return response.data;
        }
        throw new Error(response.message);
    };

    const getRoles = async (): Promise<ResponseData<ItemListModel[]>> => {  // DECLARADO ANTES DEL RETURN
        const config: AxiosConfig3<void> = {
            url: 'Rol/GetList', // Ajusta la URL según tu API
            method: 'GET',
        };
        const response = await AxiosHelper.execute<void, ResponseData<ItemListModel[]>>(config);
        if (response.status === 'success') {
            return response.data;
        }
        throw new Error(response.message);
    };

    const getClients = async (): Promise<ItemListModel[]> => { // DECLARADO ANTES DEL RETURN
        const config: AxiosConfig3<void> = {
            url: 'Clientes/obtenerTodos', // Ajusta la URL según tu API
            method: 'GET',
        };
        const response = await AxiosHelper.execute<void, ItemListModel[]>(config);
        if (response.status === 'success') {
            return response.data;
        }
        throw new Error(response.message);
    };

    return {
        getTypeIdentification,
        getRoles,   // ✅ AHORA EXISTE
        getClients, // ✅ AHORA EXISTE
    };
};