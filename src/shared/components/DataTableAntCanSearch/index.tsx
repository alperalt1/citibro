// @ts-nocheck

import React, { useState } from "react";
import { Table, TablePaginationConfig, Input, Select, Pagination } from "antd";
import { TableProps } from "antd/es/table";
import { Box } from "@mui/material";

interface DataTableProps<T> extends TableProps<T> {
  columns: ColumnsType<T>; // Utiliza ColumnsType para tipar mejor las columnas
  dataSource: T[];
  pagination?: false | TablePaginationConfig;
  rowKey?: string;
  canSearch?: boolean;
  bodyHeight?: number | string;
  sx?: SxProps<Theme>;
  controllerSx?: SxProps<Theme>;
  headerCellSx?: SxProps<Theme>;
  bodyCellSx?: SxProps<Theme>;
  paginationSx?: SxProps<Theme>;
}

const defaultStyles: {
  sx: SxProps<Theme>;
  controllerSx: SxProps<Theme>;
  headerCellSx: SxProps<Theme>;
  bodyCellSx: SxProps<Theme>;
  paginationSx: SxProps<Theme>;
} = {
  sx: {
    backgroundColor: '#ffffff',
  },
  controllerSx: {
    margin: '20px 16px 10px 16px',
  },
  headerCellSx: {
    backgroundColor: '#ffffff',
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '8px 16px',
    textTransform: 'uppercase'
  },
  bodyCellSx: {
    color: '#333',
    fontSize: '12px',
    padding: '8px 16px',
  },
  paginationSx: {
    margin: '10px 16px',
  },
};


function DataTable<T>({
  columns,
  dataSource,
  pagination = {
    pageSize: 5, // Tamaño de página por defecto
    showSizeChanger: true, // Permite cambiar el tamaño de página
    pageSizeOptions: ["5", "10", "20", "50"], // Opciones de tamaños de página
    showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} registros`,
  },
  rowKey = "id",
  canSearch = false,  
  sx = defaultStyles.sx,
  controllerSx = defaultStyles.controllerSx,
  headerCellSx = defaultStyles.headerCellSx,
  bodyCellSx = defaultStyles.bodyCellSx,
  paginationSx = defaultStyles.paginationSx,
}: DataTableProps<T>) {
  const [sortedInfo, setSortedInfo] = useState<{
    columnKey?: string;
    order?: "ascend" | "descend";
  }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPagination, setCurrentPagination] = useState<TablePaginationConfig>({
    pageSize: pagination.pageSize || 5,
    current: 1,
  });

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, React.Key[]>,
    sorter: any
  ) => {
    setSortedInfo(sorter);
    setCurrentPagination((prev) => ({ ...prev, current: pagination.current }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setCurrentPagination((prev) => ({ ...prev, pageSize, current: 1 }));
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPagination({ current: page, pageSize: pageSize || currentPagination.pageSize });
  };

  // Filtro de datos basado en el término de búsqueda
  const filteredData = dataSource.filter((item) =>
    Object.values(item)
      .some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Configuración automática del sorter para columnas con sorter: true
  const updatedColumns = columns.map((col) => {
    if (col.sorter === true && col.dataIndex) {
      return {
        ...col,
        sorter: (a: any, b: any) => {
          const valueA = a[col.dataIndex] || "";
          const valueB = b[col.dataIndex] || "";
          if (typeof valueA === 'number' && typeof valueB === 'number') {
            return valueA - valueB;
          }
          return String(valueA).localeCompare(String(valueB));
        },
        sortOrder: sortedInfo.columnKey === col.dataIndex ? sortedInfo.order : null,
      };
    }
    return col;
  });

  const paginatedData = filteredData.slice(
    ((currentPagination.current || 1) - 1) * (currentPagination.pageSize || 10),
    (currentPagination.current || 1) * (currentPagination.pageSize || 10)
  );

  // Calcular el ancho total de todas las columnas
  const totalColumnsWidth = updatedColumns.reduce((acc, col) => acc + (col.width || 100), 0);

  return (
    <Box sx={sx}>
      {/* Controles Superiores: Paginación y Búsqueda */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={controllerSx}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {pagination.showSizeChanger && (
            <Select
              value={currentPagination.pageSize?.toString() || "10"}
              onChange={(value) => handlePageSizeChange(Number(value))}
              options={pagination.pageSizeOptions?.map((size) => ({ value: size, label: `${size}` }))}
              style={{ width: "120px" }}
            />
          )}
          {typeof pagination === "object" && pagination.showTotal && (
            <div style={{ fontSize: "14px" }}>
              {pagination.showTotal(
                filteredData.length,
                [
                  ((currentPagination.current || 1) - 1) * (currentPagination.pageSize || 10) + 1,
                  Math.min(
                    (currentPagination.current || 1) * (currentPagination.pageSize || 10),
                    filteredData.length
                  ),
                ]
              )}
            </div>
          )}
        </Box>
        {canSearch && (
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "200px" }}
          />
        )}
      </Box>

      {/* Tabla con Desplazamiento Horizontal y Columnas Fijas */}
      <Table
        columns={updatedColumns}
        dataSource={paginatedData}
        pagination={false}
        rowKey={rowKey}
        onChange={handleChange}
        sortDirections={["ascend", "descend"]}
        scroll={{ x: totalColumnsWidth }} // Habilita el desplazamiento horizontal
      />

      {/* Controles Inferiores: Paginación */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Pagination
          current={currentPagination.current || 1}
          pageSize={currentPagination.pageSize || 10}
          total={filteredData.length}
          onChange={handlePaginationChange}
          showSizeChanger={false} // Ya tienes un selector de tamaño en los controles superiores
        />
      </Box>
    </Box>
  );
}

export default DataTable;
