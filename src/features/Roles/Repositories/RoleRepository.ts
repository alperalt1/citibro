import AxiosHelper, { AxiosConfig, ResponseData } from "../../../services/AxiosHelper";
import { ResponseModel } from "../../../shared/models/ResponseModel";
import { CreateRoleModel, RolApiModel, UpdateRoleModel } from "../Models/RoleModels";

export const RolRepository = () => {

    const getRolAll = async (): Promise<ResponseData<RolApiModel[]>> => {
        const config: AxiosConfig = {
            method: 'GET',
            url: `Rol/GetAll`,
        };
        return await AxiosHelper.fetch<ResponseData<RolApiModel[]>>(config);
    };

    const deleteRoleNautic = async (data: { id: number }): Promise<ResponseData<void>> => {
        const config: AxiosConfig = {
            method: "DELETE",
            url: `Rol/Delete`,
            params: {
                id: data.id
            }
        };
        return AxiosHelper.fetch<ResponseData<void>>(config);
    };

    const getById = async (idRol: number): Promise<ResponseData<UpdateRoleModel>> => {
        const config: AxiosConfig = {
            method: "GET",
            url: `Rol/GetById`,
            params:{
                id: idRol
            }
        };
        return await AxiosHelper.fetch<ResponseData<UpdateRoleModel>>(config);
    };
    
    const createRoleNautic = async (role: CreateRoleModel): Promise<ResponseModel<boolean>> => {
        const config: AxiosConfig = {
            method: 'POST',
            url: 'Rol/Create',
            data: role
        };
        return await AxiosHelper.fetch<ResponseModel<boolean>>(config);
    }

    const updateRoleNautic = async (rol: UpdateRoleModel): Promise<ResponseModel<boolean>> => {
        const config: AxiosConfig = {
            method: 'PUT',
            url: `NauticRole/Update`,
            data: rol
        }
        return await AxiosHelper.fetch<ResponseData<boolean>>(config);
    }

    return {
        getRolAll,
        getById,
        deleteRoleNautic,
        createRoleNautic,
        updateRoleNautic,
    };
};