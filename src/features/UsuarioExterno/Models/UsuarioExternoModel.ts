import * as Yup from 'yup';

export interface ExternalUserModel {
    razonSocial: string,
    ruc: string,
    correoEmpresarial: string,
    direccion: string,
    telefono: string,
    user: CompanyUser []
}

interface CompanyUser {
    id: string,
    numeroIdentificacion: string,
    autorizado: boolean,
    autorizadoDesc: string,
    rol: string,
    correoPersonal: string,
    nombre: string,
    apellido: string,
    telefono: string,
    activo:boolean
}

export interface RegisterExternalUserModel {
    autorizarEmpresa: boolean,
    autorizarCuenta: boolean,
    numeroIdentificacion: string,
    ruc: string,
    razonSocial: string,
    roleId: string,
    correoEmpresarial: string,
    correoPersonal: string,
    nombre: string,
    apellido: string,
    telefono: string,
    password: string,
}

export interface EditExternalUserModel {
    
    autorizarEmpresa: boolean,
    autorizarCuenta: boolean,
    numeroIdentificacion: string,
    ruc: string,
    razonSocial: string,
    roleId: string,
    correoEmpresarial: string,
    correoPersonal: string,
    nombre: string,
    apellido: string,
    telefono: string,
    password: string,
}

export const ExternalUserInAdminSchema = Yup.object().shape({
    autorizarEmpresa: Yup.string().required('La autorización de la empresa es requerida'),
    autorizarCuenta: Yup.string().required('La autorización de la cuenta es requerida'),
    numeroIdentificacion: Yup.string().required('La cedula es requerida'),
    ruc: Yup.string().required('El RUC es requerido'),
    razonSocial: Yup.string().required('La razón social es requerida'),
    roleId: Yup.string().required('El rol es requerido'),
    correoEmpresarial: Yup.string().email('Correo electrónico Empresarial inválido').required('El correo empresarial es requerido'),
    correoPersonal: Yup.string().email('Correo electrónico Personal inválido').required('El correo personal es requerido'),
    nombre: Yup.string().required('El nombre es requerido'),
    apellido: Yup.string().required('El apellido es requerido'),
    telefono: Yup.string().required('El teléfono es requerido'),
    password: Yup.string()
        .nullable()
        .notRequired()
        .when('$isEditing', {
            is: false,
            then: (schema) => schema.required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
            otherwise: (schema) => schema,
        }),
});

export const EditarExternalUserSchema = Yup.object().shape({
    autorizarEmpresa: Yup.string().required('La autorización de la empresa es requerida'),
    autorizarCuenta: Yup.string().required('La autorización de la cuenta es requerida'),
    numeroIdentificacion: Yup.string().required('La Cedula es requerida'),
    ruc: Yup.string().required('El RUC es requerido'),
    razonSocial: Yup.string().required('La razón social es requerida'),
    roleId: Yup.string().required('El rol es requerido'),
    correoEmpresarial: Yup.string().email('Correo electrónico Empresarial inválido').required('El correo empresarial es requerido'),
    correoPersonal: Yup.string().email('Correo electrónico Personal inválido').required('El correo personal es requerido'),
    nombre: Yup.string().required('El nombre es requerido'),
    apellido: Yup.string().required('El apellido es requerido'),
    telefono: Yup.string().required('El teléfono es requerido'),
    password: Yup.string()
        .nullable()
        .notRequired()
        .when('$isEditing', {
            is: false,
            then: (schema) => schema.required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
            otherwise: (schema) => schema,
        }),
});