export type RolApiModel = {
    idRol: number;
    rolName: string;
    isPublic: boolean;
}

export type RoleWithCompanyModel = {
    id: string,
    companyRuc: string;
}

export type CreateRoleModel = {
    rolName: string;
    rolAuthId?: string;
    isPublic: boolean;
    companyRuc?: string;
}

export type UpdateRoleModel = CreateRoleModel & {
    id: number;
}

export interface IRolCuerpo {
    message: string;
    detail: Detail;
    success: boolean;
    status: number;
}

export interface Detail {
    idRol: string;
}

export interface updateResponse {
    message: string;
    detail: string;
    success: boolean;
    status: number;
}

export type rolType = 'rolName' | 'isPublic'
