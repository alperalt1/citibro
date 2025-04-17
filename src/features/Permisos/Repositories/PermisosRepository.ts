import { MenuModel } from "../../../router/models/MenuModel";
import AxiosHelper, { AxiosConfig } from "../../../services/AxiosHelper";
import { ResponseModel } from "../../../shared/models/ResponseModel";

export const PermisosRepository = () => {

    const getMenuSideBar = async (idUsuario: string): Promise<ResponseModel<MenuModel[]>> => {
        const config: AxiosConfig = {
            method: 'GET',
            url: `Module/GetMenuSideBar?idUsuario=${idUsuario}`,
        };
        return await AxiosHelper.fetch<ResponseModel<MenuModel[]>>(config);
    };

    const getModuleRolePermissions = async (roleId: number): Promise<ResponseModel<MenuModel[]>> => {
        const config: AxiosConfig = {
            method: 'GET',
            url: `Module/GetModulePermissionByIdRole`,
            params: {
                idRole: roleId
            }
        };
        return await AxiosHelper.fetch<ResponseModel<MenuModel[]>>(config);
    };
    
    const updateModuleRolePermissions = async (data: MenuModel[], roleId: number): Promise<ResponseModel<MenuModel[]>> => {
        const config: AxiosConfig = {
            method: 'PUT',
            url: `Module/UpdateMenuPermission?roleAuthId=${roleId}`,
            data: data,
        };
        return await AxiosHelper.fetch<ResponseModel<MenuModel[]>>(config);
    };

    return {
        getMenuSideBar,
        getModuleRolePermissions,
        updateModuleRolePermissions,
    };
};

