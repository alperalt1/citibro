export interface MenuModel{
    id: number,
    key: string,
    component: string,
    nombre: string,
    tipo: 'ME' | 'MO' | 'SU',
    description: string,
    icon: string,
    ruta: string,
    funcionalMethods: funcionalMethodModel[],
    subMenu: MenuModel[],
}

export interface ModuleModel {
    idModule: number,
    menu: MenuModel[],
    nombreModulo: string
}

export interface funcionalMethodModel {
    idPermiso: number;
    hasPermission: boolean;
    nombrePermiso: string;
}