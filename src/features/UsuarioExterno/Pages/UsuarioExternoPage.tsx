import { useEffect, useState } from "react";
import { Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { EditarExternalUserSchema, EditExternalUserModel, ExternalUserInAdminSchema, ExternalUserModel, RegisterExternalUserModel} from "../Models/UsuarioExternoModel";
import { useFormik } from 'formik';
import { ItemListModel } from "../../../shared/models/ItemListModel";
import { ExternalUserTable } from "../Components/UsuarioExternoTable";
import { CatalogRepository } from "../../../shared/repositories/CatalogRepository";
import { FormCreateExternalUser } from "../Components/FormCreateExternalUser";
import { LoadingButton } from "../../../shared/components/LoadingButton";
import { showAlertAsync } from "../../../shared/components/SweetAlert";
import { UsuarioExternoRepository } from "../Repositories/UsuarioExternoRepository";
import { FormEditExternalUser } from "../Components/FormEditExternalUser";

const initialCreation: RegisterExternalUserModel = {
  autorizarEmpresa: false,
  autorizarCuenta: false,
  numeroIdentificacion: '',
  ruc:'',
  razonSocial: '',
  roleId: '',
  correoEmpresarial: '',
  correoPersonal:'',
  telefono: '',
  nombre: '',
  apellido: '',
  password: '',
}

export default function UsuarioExternoPage() {
  const { getRoles, getClients } = CatalogRepository();
  const { 
    getAll, 
    getById, 
    registerExternalUser, 
    deleteCompanyUser,
    editExternalUser,

    getExample,
  } = UsuarioExternoRepository();

  const [externalUserList, setExternalUserList] = useState<ExternalUserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const [roleOptions, setRoleOptions] = useState<ItemListModel[]>([])
  const [clienteOptions, setClienteOptions] = useState<ItemListModel[]>([])

  const [editValues, setEditValues] = useState<EditExternalUserModel>(initialCreation)

  const formik = useFormik<RegisterExternalUserModel>({
    initialValues: initialCreation,
    validationSchema: ExternalUserInAdminSchema,
    onSubmit: async (values) => {
      setLoadingCreate(true);
      try {
        const result = await registerExternalUser(values);
        if (result.status == 'success') {
          showAlertAsync({
            title: 'Éxito',
            icon: 'success',
            html: 'Registro creado con éxito',
            confirmButtonText: 'Aceptar',
          });
          const data = await getAll();
          if (data) {
            setExternalUserList(data)
            formik.resetForm();
            setOpenModalCreate(false)
          }
        }
      } catch (error) {
        showAlertAsync({
          title: 'Error',
          icon: 'error',
          html: error instanceof Error ? error.message : "Ocurió un error inesperado",
          confirmButtonText: 'Aceptar',
        });
      }
      setLoadingCreate(false)
    },
  });

  const formikEdit = useFormik<EditExternalUserModel>({
    initialValues: editValues,
    validationSchema: EditarExternalUserSchema,
    onSubmit: async (values) => {
      setLoadingEdit(true);
      try {
        const result = await editExternalUser(values);
        if (result) {
          showAlertAsync({
            title: 'Éxito',
            icon: 'success',
            html: 'Registro editado con éxito',
            confirmButtonText: 'Aceptar',
          });
          setOpenModalEdit(false);
          const data = await getAll();
          if (data) {
            setExternalUserList(data)
            formikEdit.resetForm();
            setOpenModalEdit(false);
          }
        }
      } catch (error) {
        showAlertAsync({
          title: 'Error',
          icon: 'error',
          html: error instanceof Error ? error.message : "Ocurió un error inesperado",
          confirmButtonText: 'Aceptar',
        });
      }
      setLoadingEdit(false)
    },
  });

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    formikEdit.setValues(editValues);
  }, [editValues]);

  const init = async () => {
    setLoading(true);
    try {


      var respon = await getExample();
      console.log('Data --> ', respon);

      let a1 = respon.data.length;

      const roles = await getRoles();
      setRoleOptions(roles);
      await handleGetData();

      const clientes = await getClients();
      setClienteOptions(clientes);
    } catch (error) {
      //showAlertAsync({ title: 'Error', icon: 'error', html: error.message });
    }
    setLoading(false);
  }

  const handleGetData = async () => {
    const result = await getAll();
    if (result) {

      setExternalUserList(result);
    }
  }

  const handleShowModalCreate = () => {
    setOpenModalCreate(true);
  }

  const handleHideModalCreate = () => {
    setOpenModalCreate(false);
  }

  const handleShowModalEdit = async (ruc: string) => {
    try {
      const data = await getById(ruc);
      setEditValues(data);
      setOpenModalEdit(true);
    } catch (error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: error instanceof Error ? error.message : "Ocurió un error inesperado",
        confirmButtonText: 'Aceptar',
      });
    }
  }

  const handleHideModalEdit = () => {
    setOpenModalEdit(false);
  }

  const confirmDelete = (id: string) => {
    showAlertAsync({
      title: 'Advertencia',
      icon: 'warning',
      html: '¿Estás seguro que quieres eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'Cancelar',
      onConfirm: async () => {
        await deleteRegister(id); 
      }
    });
  }

  const deleteRegister = async (id: string) => {
    try {
      const result = await deleteCompanyUser(id);
      if (result.status == 'success') {
        showAlertAsync({
          title: 'Éxito',
          icon: 'success',
          html: 'El registro fue eliminado satisfactoriamente.',
          confirmButtonText: 'Aceptar',
        });
        await handleGetData();
        console.log("Datos después de eliminar:", externalUserList);
      }
    } catch (error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: error instanceof Error ? error.message : "Ha ocurrido un error inesperado",
        confirmButtonText: 'Aceptar',
      });
    }
  }

  return (
    <Box>
      <Box mb={3}>

        <Box display="flex" justifyContent="flex-end" my={2}>
          <Button variant="contained" color="primary" onClick={() => handleShowModalCreate()}>
            Crear Nuevo
          </Button>
        </Box>

        <Box mb={3}>
          {loading
            ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: 'calc(100vh - 154px)' }}
              >
                <CircularProgress />
              </Box>
            )
            : (
              <Card>
                <ExternalUserTable
                  onEditPressed={handleShowModalEdit}
                  onDeletePressed={confirmDelete}
                  data={externalUserList}
                />
              </Card>
            )
          }
        </Box>
      </Box>
      {/* Modal Crear */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openModalCreate}
        onClose={handleHideModalCreate}
        aria-labelledby="create-dialog-title"
        aria-describedby="create-dialog-description"
      >
        <DialogTitle id="create-dialog-title">{"Crear usuario externo"}</DialogTitle>
        <DialogContent>
          <FormCreateExternalUser
            formik={formik}
            catalogCliente={clienteOptions}
            catalogRole={roleOptions}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHideModalCreate} variant="contained" color="secondary">
            Cancelar
          </Button>
          <LoadingButton
            onClick={formik.handleSubmit}
            isLoading={loadingCreate}
            text="Guardar"
            width="120px"
          />
        </DialogActions>
      </Dialog>
      {/* Modal Editar */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openModalEdit}
        onClose={handleHideModalEdit}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
      >
        <DialogTitle id="edit-dialog-title">{"Editar usuario externo"}</DialogTitle>
        <DialogContent>
          <FormEditExternalUser
            formik={formikEdit}
            catalogCliente={clienteOptions}
            catalogRole={roleOptions}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHideModalEdit} variant="contained" color="secondary">
            Cancelar
          </Button>
          <LoadingButton
            onClick={formikEdit.handleSubmit}
            isLoading={loadingEdit}
            text="Guardar"
            width="120px"
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}
