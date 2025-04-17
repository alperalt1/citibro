import React, { useState, useMemo } from 'react';
// @mui Components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box, Typography, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/system';
// @mui Icons
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { SelectPerPage } from './SelectPerPage';
import { InputSearch } from './InputSearch';

interface Column {
  header: string;
  accessor: string;
  width?: number | string;
  order?: boolean;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, any>[];
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

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  bodyHeight,
  sx = defaultStyles.sx,
  controllerSx = defaultStyles.controllerSx,
  headerCellSx = defaultStyles.headerCellSx,
  bodyCellSx = defaultStyles.bodyCellSx,
  paginationSx = defaultStyles.paginationSx,
}) => {
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset to the first page on search
  };

  const handlePerPageChange = (selectedOption: any) => {
    setPerPage(selectedOption.value);
    setPage(1); // Reset to the first page on per page change
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.target;
    setPage(value);
  };

  const handleSort = (accessor: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === accessor && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: accessor, direction });
  };

  const filteredRows = useMemo(() => {
    if (!search) return rows;
    return rows.filter(row =>
      columns.some(column =>
        String(row[column.accessor]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, rows, columns]);

  const sortedRows = useMemo(() => {
    if (!sortConfig) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortConfig]);

  const paginatedRows = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return sortedRows.slice(startIndex, endIndex);
  }, [sortedRows, page, perPage]);

  const perPageOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
  ];

  const totalRows = filteredRows.length;
  const fromRow = totalRows === 0 ? 0 : (page - 1) * perPage + 1;
  const toRow = Math.min(page * perPage, totalRows);

  const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
      backgroundColor: '#F5F6F8',
    },
  });

  const tableContainerStyles: SxProps<Theme> = bodyHeight
    ? { height: bodyHeight, overflowY: 'auto', borderRadius: 0, boxShadow: 'none' }
    : { borderRadius: 0, boxShadow: 'none' };

  return (
    <Box sx={sx}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={controllerSx}>
        <Box display="flex" alignItems="center">
          <Typography sx={{ marginRight: '4px', fontSize: '14px' }}>Mostrar</Typography>
          <SelectPerPage
            defaultValue={perPageOptions[1]}
            options={perPageOptions}
            onChange={handlePerPageChange}
          />
          <Typography sx={{ marginLeft: '4px', fontSize: '14px' }}>Registros</Typography>
        </Box>
        <InputSearch
          onChange={handleSearchChange}
          value={search}
          placeholder="Buscar"
        />
      </Box>
      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table stickyHeader>
          <TableHead style={{ display: 'table-header-group' }}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{ ...headerCellSx, minWidth: column.width || 'auto', cursor: column.order !== false ? 'pointer' : 'default' }}
                  onClick={column.order !== false ? () => handleSort(column.accessor) : undefined}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      {column.header}
                    </Box>
                    <Box>
                      {column.order !== false && (
                        sortConfig?.key === column.accessor ? (
                          sortConfig.direction === 'asc' ? (
                            <ArrowUpward fontSize="small" />
                          ) : (
                            <ArrowDownward fontSize="small" />
                          )
                        ) : (
                          <ArrowUpward fontSize="small" style={{ opacity: 0 }} />
                        )
                      )}
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, rowIndex) => (
              <StyledTableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    sx={{ ...bodyCellSx, minWidth: column.width || 'auto' }}
                  >
                    {row[column.accessor]}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={paginationSx}>
        <Typography variant="body2" sx={{fontSize:'14px'}}>
          {fromRow} - {toRow} de {totalRows} registros
        </Typography>
        <Pagination
          count={Math.ceil(totalRows / perPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
