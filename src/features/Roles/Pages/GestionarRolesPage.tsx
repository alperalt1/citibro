import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from "@mui/material";
import { RolRepository } from "../Repositories/RoleRepository";
import { showAlertAsync } from "../../../shared/components/SweetAlert";
import { CustomInput } from "../../../shared/components/CustomInput";
import { LoadingButton } from "../../../shared/components/LoadingButton";
import { RoleTable } from "../Components/RoleTable";
import { CreateRoleModel, RolApiModel, UpdateRoleModel } from "../Models/RoleModels";

export default function GestionarRolesPage() {

  //const permissions = useAppSelector(state => state.permissionState.data);
  const navigate = useNavigate();

  const {
    getRolAll,
    getById,
    deleteRoleNautic,
    createRoleNautic,
    updateRoleNautic,
  } = RolRepository();

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const [roleList, setRoleList] = useState<RolApiModel[]>([]);

  const [createRoleData, setCreateRoleData] = useState<CreateRoleModel>({
    rolName: '',
    isPublic: false,
    companyRuc: '',
  });

  const [updateRoleData, setUpdateRoleData] = useState<UpdateRoleModel>({
    id: 0,
    rolName: '',
    isPublic: false,
    companyRuc: '',
  });

  useEffect(() => {
    getRoleAll();
  }, [])

  const getRoleAll = async () => {
    try {
      const roles = await getRolAll();
      setRoleList(roles.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreateClose = () => {
    setOpenModalCreate(false)
  }

  const confirmDelete = (id: number) => {
    showAlertAsync({
      title: 'Advertencia',
      icon: 'warning',
      html: '¿Estás seguro que quieres eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'Cancelar',
      onConfirm: () => deleteRegister(id)
    });
  }

  const deleteRegister = async (id: number) => {
    try {
      const data = { id: id }
      const responseNautic = await deleteRoleNautic(data);
      if (responseNautic) {
        await getRoleAll();
        await showAlertAsync({
          toast: true,
          time: 2500,
          position: 'top-end',
          title: "Éxito",
          icon: "success",
          html: 'Rol eliminado'
        });
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getRoleById = async (id: number) => {
    try {
      const response = await getById(id);
      setUpdateRoleData(response.data);
      setOpenUpdate(true);
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreateDataChange = (field: keyof CreateRoleModel) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = field === 'isPublic'
      ? (event.target as HTMLInputElement).checked
      : event.target.value;

    setCreateRoleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateRole = async () => {
    try {

      if (createRoleData.rolName == '') {
        showAlertAsync({ title: "Error", icon: "error", html: "Ingrese un nombre" });
        return;
      }
      setOpenModalCreate(false);

      const data: CreateRoleModel = {
        rolName: createRoleData.rolName,
        isPublic: createRoleData.isPublic
      }
      const responseNautic = await createRoleNautic(data);
      if (responseNautic.status === 'success') {
        await getRoleAll();
        await showAlertAsync({
          title: "Éxito",
          icon: "success",
          html: "Rol guardado correctamente"
        });
      }

    } catch (error) {
      showAlertAsync({
        title: "Error",
        icon: "error",
        html: error instanceof Error ? error.message : "Ocurió un error inesperado",
      });
    }
  }

  const handleUpdateClose = () => {
    setOpenUpdate(false);
    setUpdateRoleData({ id: 0, rolName: '', isPublic: false, companyRuc: '' });
  };

  const handleUpdateDataChange = (field: keyof UpdateRoleModel) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = field === 'isPublic'
      ? (event.target as HTMLInputElement).checked
      : event.target.value;

    setUpdateRoleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateRole = async () => {
    try {
      const data: UpdateRoleModel = { ...updateRoleData };
      const responseNautic = await updateRoleNautic(data);
        if (responseNautic) {
          await getRoleAll();
          await showAlertAsync({ title: "Éxito", icon: "success", html: responseNautic.message });
          setOpenUpdate(false);
        }
    } catch (error) {
      await showAlertAsync({
        title: "Error",
        icon: "error",
        html: error instanceof Error ? error.message : "Ocurió un error inesperado",
      });
    }
  }

  const redirectToPermission = (id: number) => {
    navigate('/roles/permisos', { state: { id: id } })
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" my={2}>
        {/* {permissions['SE-RO-RO']?.includes('CREAR') && ( */}
        <Button variant="contained" color="primary" onClick={() => setOpenModalCreate(true)}>
          Crear Nuevo
        </Button>
        {/* )} */}
      </Box>
      <Box mb={3}>
        <Card>
          <RoleTable
            onEditPressed={getRoleById}
            onPermissionPressed={redirectToPermission}
            onDeletePressed={confirmDelete}
            data={roleList}
          />
        </Card>
      </Box>

      {/* Modal Create */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openModalCreate}
        onClose={handleCreateClose}
        aria-labelledby="create-dialog-title"
        aria-describedby="create-dialog-description"
      >
        <DialogTitle id="create-dialog-title">{"Crear rol"}</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <CustomInput
              label="Nombre del rol"
              type="text"
              name="rolName"
              value={createRoleData.rolName}
              onChange={handleCreateDataChange("rolName")}
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={createRoleData.isPublic}
                  name="isPublic"
                  onChange={handleCreateDataChange('isPublic')}
                />
              }
              label="Es público"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCreateClose}
            variant="contained"
          // color="outline"
          >
            Cancelar
          </Button>
          <LoadingButton
            onClick={handleCreateRole}
            isLoading={false}
            text="Guardar"
          />
        </DialogActions>
      </Dialog>

      {/* Modal Update */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openUpdate}
        onClose={handleUpdateClose}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
      >
        <DialogTitle id="edit-dialog-title">{"Editar rol"}</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <CustomInput
              label="Nombre del rol"
              type="text"
              name="rolName"
              value={updateRoleData.rolName}
              onChange={handleUpdateDataChange("rolName")}
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={updateRoleData.isPublic}
                  name="isPublic"
                  onChange={handleUpdateDataChange('isPublic')}
                />
              }
              label="Es público"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Box>
            <Button
              onClick={handleUpdateClose}
              variant="contained"
              // color="outline"
            >
              Cancelar
            </Button>
          </Box>
          <Box>
            <LoadingButton
              onClick={handleUpdateRole}
              isLoading={false}
              text="Guardar Cambios"
            />
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

