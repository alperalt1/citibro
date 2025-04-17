import { IBaseRepository } from "../Interfaces/IBaseRepository";

export type DynamicDataForm = Record<string, string | number | boolean | null>;
export interface DynamicDataTable { }
export interface DynamicDataExport { }
export interface DynamicDataImport { }
/**
 * Define las reglas de validación para los campos dinámicos.
 */
export interface ValidationRules {
    /** Indica si el campo es obligatorio. */
    required: boolean;
    /** Longitud mínima permitida (opcional). */
    minLength?: number;
    /** Longitud máxima permitida (opcional). */
    maxLength?: number;
    /** Valor mínimo permitido (opcional, aplicable a números). */
    min?: number;
    /** Valor máximo permitido (opcional, aplicable a números). */
    max?: number;
    /** True : permite decimales, Falso: no permite decimales (opcional, aplicable a números). */
    isAllowDecimal?: boolean;
}

/**
 * Representa un campo dinámico que puede ser utilizado en formularios y tablas.
 */
export interface DynamicField<T, U> {
    /** Nombre del campo en la base de datos o modelo. */
    name: string;
    /** Etiqueta que se muestra en la interfaz de usuario. */
    label: string;
    /** Orden de aparición en los formularios. */
    order: number;
    /** Nombre del filtro asociado a este campo. */
    namefilterData: string;
    /** Indica si el campo puede aceptar valores nulos. */
    isTypeNullData: boolean;
    /** Indica si el campo puede ser utilizado como filtro en búsquedas. */
    isFilterData: boolean;
    /** Indica si el filtro puede aceptar valores nulos. */
    isFilterDataNulleable: boolean;
    /** Indica si el campo es visible en el formulario. */
    isVisibleInput: boolean;
    /** Título del campo cuando se muestra en una tabla. */
    headerTable: string;
    /** Nombre de la tabla donde se encuentra el campo (opcional). */
    nameTable?: string;
    /** Indica si el campo debe mostrarse en la tabla de resultados. */
    renderTable: boolean;
    /** Ancho de la columna en la tabla (por ejemplo, "100px"). */
    widthTable: string;
    /** Orden en el que aparece en la tabla. */
    orderTable: number;
    /** Tipo de dato del campo (por ejemplo, "text", "number", "boolean","date","dateTime"). */
    type: "text" | "number" | "date" | "datetime" | "select" | "boolean";
    /** Tipo de input en el formulario (por ejemplo, "input", "select", "readonly"). */
    inputType: string;
    /** Repositorio asociado para obtener datos en caso de que sea un select (opcional). */
    repositorySelect?: IBaseRepository<T, U>;
    /** Valor predeterminado en el caso de un select o valor inicial del campo. */
    fieldValueSelect: string;
    /** Valor por defecto para el campo, que puede ser texto, número o booleano. */
    valueDataDefault: string | number | boolean;
    /** Reglas de validación aplicadas al campo. */
    validations: ValidationRules;
}

/**
 * Define la estructura de un formulario dinámico con múltiples campos.
 * @template T - Tipo de datos principal asociado al formulario. MODELO DE CARGA
 * @template U - Tipo de datos para operaciones adicionales (opcional). MODELO DE ACTUALIZACIÓN
 */
export interface FormDynamicSchema<T, U> {
    /** Número de columnas en el formulario. */
    columns: number;
    /** Nombre del modal de edición. */
    nameModalEdit: string;
    /** Tamaño del modal (por ejemplo, "sm", "md", "lg"). */
    sizeModalEdit: string;
    /** Nombre de la clave primaria del formulario. */
    namePrimaryKey: string;
    /** Lista de campos dinámicos que componen el formulario. */
    fields: DynamicField<T, U>[];
}
