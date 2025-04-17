import { useMemo } from 'react';
import { Box, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import DataTable from '../../../shared/components/DataTable';
import { RolApiModel } from '../Models/RoleModels';

interface Props {
  onEditPressed?: (id: number) => void;
  onPermissionPressed?: (id: number) => void;
  onDeletePressed?: (id: number) => void;
  data: RolApiModel[];
}

export const RoleTable = (props: Props) => {

  //const permissions = useAppSelector(state => state.permissionState.data);

  const { onEditPressed, onPermissionPressed, onDeletePressed, data } = props;

  const columns = [
    { header: "Nombre", accessor: "name" },
    { header: "Público", accessor: "public" },
    { header: "Acciones", accessor: "action" }
  ];

  const handleEdit = async (id: number) => {
    if (onEditPressed) {
      onEditPressed(id)
    }
  }

  const handlePermission = async (id: number) => {
    if (onPermissionPressed) {
      onPermissionPressed(id);
    }
  }

  const handleDelete = async (id: number) => {
    if (onDeletePressed) {
      onDeletePressed(id);
    }
  }

  const rows = useMemo(() => {
    const rows = data.length > 0
      ? data.map((item) => {
        return {
          name: item.rolName,
          public: <Box>
            {item.isPublic
              ? (
                <Chip label='Sí' color='secondary' sx={{ width: '50px', color: 'white !important' }} />
              ) : (
                <Chip label='No' color='success' sx={{ width: '50px', color: 'white !important' }} />
              )}
          </Box>,
          action: (
            <Box>
              {/* {permissions['SE-RO-RO']?.includes('EDITAR') && ( */}
              <IconButton
                onClick={() => handleEdit(item.idRol)}
                color="primary"
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>

              {/* )} */}
              {/* {permissions['SE-RO-RO']?.includes('EDITAR') && ( */}
              <IconButton
                onClick={() => handlePermission(item.idRol)}
                color="info"
                size="small"
              >
                <AddModeratorIcon fontSize="small" />
              </IconButton>
              {/* )} */}
              {/* {permissions['SE-RO-RO']?.includes('ELIMINAR') && ( */}
              <IconButton
                onClick={() => handleDelete(item.idRol)}
                color="error"
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              {/* )} */}
            </Box>
          ),
        }
      })
      : []
    return rows;
  }, [data]);

  return (
    <DataTable
      columns={columns}
      rows={rows}
    />
  );

}