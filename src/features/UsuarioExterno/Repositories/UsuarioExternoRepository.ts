import AxiosHelper, { AxiosConfig, ResponseData } from "../../../services/AxiosHelper";
import { ItemListModel } from "../../../shared/models/ItemListModel";
import { EditExternalUserModel, ExternalUserModel, RegisterExternalUserModel } from "../Models/UsuarioExternoModel";


export const UsuarioExternoRepository = () => {

    const getAll = async (): Promise<ExternalUserModel[]> => {
        const config: AxiosConfig = {
            method: 'GET',
            url: 'ExternalUser/ObtenerTodos',
        };
        return await AxiosHelper.fetch<ExternalUserModel[]>(config);
    }

    const getById = async (ruc: string): Promise<RegisterExternalUserModel> => {
        const config: AxiosConfig = {
            method: 'GET',
            url: 'ExternalUser/ObtenerUsuarioExterno',
            params: {
                ruc
            }
        };
        return await AxiosHelper.fetch<RegisterExternalUserModel>(config);
    }

    const registerExternalUser = async (data: RegisterExternalUserModel): Promise<ResponseData<void>> => {
        const config: AxiosConfig = {
            method: 'POST',
            url: 'ExternalUser/CrearUsuarioExterno',
            data: data,
        };
        return await AxiosHelper.fetch<ResponseData<void>>(config);
    }

    const editExternalUser = async (data: EditExternalUserModel): Promise<ResponseData<void>> => {
        const config: AxiosConfig = {
            method: 'PUT',
            url: 'ExternalUser/EditarUsuarioExterno',
            data: data,
        };
        return await AxiosHelper.fetch<ResponseData<void>>(config);
    }

    const deleteCompanyUser = async (iduser: string): Promise<ResponseData<void>> => {
        const config: AxiosConfig = {
            method: 'DELETE',
            url: `ExternalUser/Eliminar`,
            params: { 
                iduser
            }
        };
        return await AxiosHelper.fetch<ResponseData<void>>(config);
    }

    
    const getExample = async (): Promise<ResponseData<ItemListModel[]>> => {
        const config: AxiosConfig = {
            method: 'GET',
            url: `SelectList/GetExamplpe`,
        };
        return await AxiosHelper.fetch<ResponseData<ItemListModel[]>>(config);
    }

    return {
        getAll,
        getById,
        registerExternalUser,
        editExternalUser,
        deleteCompanyUser,

        getExample,
    };
};