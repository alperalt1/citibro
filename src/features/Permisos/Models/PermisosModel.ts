export interface MenuPermissionModel {
    id: number,
    key: string,
    nombre: string,
    tipo: string,
    menuOptions: MenuOptionsModel[];
}

export interface MenuOptionsModel {
    name: string;
    menuSubOptions: SubmenuMenuModel[];
}

export interface SubmenuMenuModel {
    name: string;
    permissions: string[];
    moduleSubOptionsId: number;
    screenCode: string;
    permissionsRole: PermissionRoleModel[];
    permissionsNames: string[];
}

interface PermissionRoleModel {
    name: string;
    permissionId: number,
    hasPermission: boolean;
}

export interface CreatePermissionModel {
    roleId: string;
    menuSubOptionId: number;
    permissionId: number;
    hasPermission: boolean;
}
