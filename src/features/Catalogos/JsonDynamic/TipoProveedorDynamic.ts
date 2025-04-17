import { FormDynamicSchema } from "../Model/DynamicDataForm";
import { TipoProveedor, TipoProveedorActualizacion } from "../Model/TipoProveedor";

export const TipoProveedorDynamic: FormDynamicSchema<TipoProveedor, TipoProveedorActualizacion> = {
        columns: 1,
        nameModalEdit: "Tipo Proveedor",
        sizeModalEdit: "sm",
        namePrimaryKey: "idTipoProveedor",
        fields: [
            {
                name: "idTipoProveedor",
                label: "IdTipoProveedor",
                order: 1,
                namefilterData: "idTipoProveedorOptional",
                isTypeNullData: false,
                isFilterData: true,
                isFilterDataNulleable: true,
                isVisibleInput: false,
                headerTable: "Id Tipo Proveedor",
                renderTable: true,
                widthTable: "50px",
                orderTable: 1,
                type: "number",
                valueDataDefault: "",
                inputType: "readonly",
                fieldValueSelect: "",
                validations: {
                    required: true,
                    minLength: 0,
                    maxLength: 5
                }
            },
            {
                name: "nombre",
                label: "Nombre",
                order: 2,
                namefilterData: "nombreOptional",
                isTypeNullData: true,
                isFilterData: true,
                isFilterDataNulleable: true,
                isVisibleInput: true,
                headerTable: "Nombre",
                renderTable: true,
                widthTable: "100px",
                orderTable: 2,
                type: "text",
                valueDataDefault: "",
                inputType: "input",
                fieldValueSelect: "",
                validations: {
                    required: true,
                    min: 0,
                    max: 100
                }
            },
            {
                name: "descripcion",
                label: "Descripcion",
                order: 3,
                namefilterData: "descripcion",
                isTypeNullData: false,
                isFilterData: false,
                isFilterDataNulleable: true,
                isVisibleInput: true,
                headerTable: "Descripcion",
                renderTable: true,
                widthTable: "100px",
                orderTable: 3,
                type: "text",
                valueDataDefault: "",
                inputType: "input",
                fieldValueSelect: "",
                validations: {
                    required: false,
                    min: 0,
                    max: 255
                }
            },
            {
                name: "activo",
                label: "Estado",
                order: 4,
                namefilterData: "activoOpcional",
                isTypeNullData: false,
                isFilterData: true,
                isFilterDataNulleable: true,
                isVisibleInput: true,
                headerTable: "Estado",
                renderTable: true,
                widthTable: "100px",
                orderTable: 4,
                type: "boolean",
                valueDataDefault: true,
                inputType: "input",
                fieldValueSelect: "",
                validations: {
                    required: false,
                    min: 0,
                    max: 255
                }
            }
        ]
    };
    