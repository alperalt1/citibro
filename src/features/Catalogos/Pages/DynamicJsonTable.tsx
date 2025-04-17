import { useMemo } from "react";
import { FormDynamicSchema } from "../Model/DynamicDataForm";
import { Box, Icon, IconButton, Tooltip } from "@mui/material";
import DataTable from "../../../shared/components/DataTableAntCanSearch";
import { useAppSelector } from "../../../redux/Hooks";
import { TableProps } from "antd";
import { Delete, Edit } from "@mui/icons-material";

interface Props<T, U> {
    onEditPressed?: (id: number) => void;
    onDeletePressed?: (id: number) => void;
    jsonSchema?: FormDynamicSchema<T, U>;
    data: any[];
}

const DynamicJsonTable = <T, U>({ onEditPressed, onDeletePressed, jsonSchema, data }: Props<T, U>) => {
    // const permissions = useAppSelector((state: any) => state.permissionState.data);

    const columns = useMemo(() => {
        const schemaColumns: TableProps<T>['columns'] = jsonSchema?.fields
            .filter((field) => field.renderTable)
            .sort((a, b) => a.orderTable - b.orderTable)
            .map((field) => ({
                title: field.headerTable,
                dataIndex: field.name,
                key: `column-${field.name}`,
                width: field.widthTable,
            })) || [];

        // Agregar columna de acciones
        schemaColumns.push({
            title: 'Acciones',
            dataIndex: 'action',
            key: 'action',
            width: '30px',
        });

        return schemaColumns;
    }, [jsonSchema]);

    const rows = useMemo<T[]>(() => {
        return data.map((item: any) => {
            const row: Record<string, any> = {};

            jsonSchema!.fields.forEach((field) => {
                if (field.renderTable) {
                    let valueRender;

                    if (field.nameTable && field.nameTable.includes(".")) {
                        const [parentKey, childKey] = field.nameTable.split(".");
                        valueRender = item[parentKey]?.[childKey] || "";
                    } else {
                        valueRender = item[field.nameTable || field.name];
                    }

                    switch (field.type) {
                        case "text":
                            valueRender;
                            break;
                        case "number":
                            valueRender;
                            break;
                        case "boolean":
                            valueRender = valueRender ? "Si" : "No";
                            break;
                        case "date":
                        case "datetime":
                            const options: any = field.type === "date"
                                ? { day: "2-digit", month: "2-digit", year: "numeric" as "2-digit" | "numeric" }
                                : { day: "2-digit", month: "2-digit", year: "numeric" as "2-digit" | "numeric", hour: "2-digit" as "2-digit" | "numeric", minute: "2-digit" as "2-digit" | "numeric", second: "2-digit" as "2-digit" | "numeric", hour12: false };
                            valueRender = valueRender ? new Intl.DateTimeFormat("es-ES", options).format(new Date(valueRender)) : "";
                            break;
                        default:
                            valueRender = valueRender ? valueRender : "";
                            break;
                    }

                    row[field.name] = valueRender;
                }
            });

            row['action'] = (
                <Box display="flex">
                    <Tooltip title="Editar" placement="top" arrow>
                        <IconButton
                            onClick={() => onEditPressed &&
                                onEditPressed(item[jsonSchema!.namePrimaryKey])}
                            color="primary"
                            sx={{ bgcolor: "action.hover" }}
                        >
                            <Edit>tune</Edit>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar" placement="top" arrow>
                        <IconButton
                            onClick={() => onDeletePressed &&
                                onDeletePressed(item[jsonSchema!.namePrimaryKey])}
                            color="error"
                            sx={{ bgcolor: "action.hover" }}
                        >
                            <Delete>tune</Delete>
                        </IconButton>
                    </Tooltip>
                </Box>
            );

            row['key'] = item[jsonSchema!.namePrimaryKey]; // Este debe ser único por fila
            return row as T;
        });
    }, [data, jsonSchema,
        // permissions, 
        onEditPressed, onDeletePressed]);

    return (
        <Box>
            <DataTable<T>
                columns={columns}
                dataSource={rows}
                canSearch={true}
            />
        </Box>
    );
};
export default DynamicJsonTable;