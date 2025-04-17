import { useMemo } from 'react';
import { ExternalUserModel } from '../Models/UsuarioExternoModel';
import { Box, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataTable from '../../../shared/components/DataTable';


interface Props {
  onEditPressed?: (ruc: string) => void;
  onDeletePressed?: (id: string) => void;
  data: ExternalUserModel[];
}

export const ExternalUserTable = (props: Props) => {

  const {
    onEditPressed,
    onDeletePressed,
    data,
  } = props;

  //const permissions = useAppSelector(state => state.auth.permissions);

  const columns = [
    { header: "N° RUC", accessor: "ruc" },
    { header: "Razón social", accessor: "razonSocial" },
    { header: "Autorizado", accessor: "autorizado" },
    { header: "Rol", accessor: "rol" },
    { header: "Correo", accessor: "correoPersonal" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Apellido", accessor: "apellido" },
    { header: "Telf.", accessor: "telefono" },
    { header: "Acciones", accessor: "action" },
  ];

  const handleEdit = (value: string) => {
    if (onEditPressed) {
      onEditPressed(value)
    }
  }

  const handleDelete = (value: string) => {
    if (onDeletePressed) {
      onDeletePressed(value)
    }
  }

  const rows = useMemo(() => {
    const rows = data.length > 0
      ? data.flatMap((item) => 
        item.user.filter(users=>users.activo)
          .map((users) => ({
          ruc: item.ruc,
          razonSocial: item.razonSocial,
          autorizado: (
            <Box>
              {users.autorizadoDesc === 'Sí' && (
                <Chip label={users.autorizadoDesc} color="success" sx={{ width: '80px', color: 'white !important' }} />
              )}
              {users.autorizadoDesc === 'No' && (
                <Chip label={users.autorizadoDesc} color="error" sx={{ width: '80px', color: 'white !important' }} />
              )}
            </Box>
          ),
          rol: users.rol,
          correoPersonal: users.correoPersonal, 
          nombre: users.nombre,
          apellido: users.apellido,
          telefono: users.telefono, 
          action: (
            <Box>
              <IconButton
                onClick={() => handleEdit(item.ruc)}
                color='primary'
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(users.id)}
                color='error'
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ),
        }))
      )
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