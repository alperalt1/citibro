import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Checkbox, CircularProgress, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import { CatalogRepository } from "../../../shared/repositories/CatalogRepository";
import { ItemListModel } from "../../../shared/models/ItemListModel";
import { showAlertAsync } from "../../../shared/components/SweetAlert";
import { CustomSelect, OptionType } from "../../../shared/components/CustomSelect";
import { PermisosRepository } from "../Repositories/PermisosRepository";
import { MenuModel } from "../../../router/models/MenuModel";

interface Props {
  onCheckPressed: (
    index: number,
    subIndex: number,
    checkboxIndex: number,
    checked: boolean,
    subMenuId: number
  ) => void;
  menu: MenuModel,
  index: number,
}

const renderMenu =  (props: Props): React.ReactNode => {
  const { onCheckPressed, menu, index } = props;

  return (
    <div>
      {/* Si el menú es de tipo 'ME', mostramos su nombre */}
      {menu.tipo === "ME" && (
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{menu.nombre}</Typography>
      )}

      {/* Si tiene submenú, se renderiza recursivamente */}
      {menu.subMenu && menu.subMenu.length > 0 ? (
        <div>
          {menu.subMenu.map((subMenu, subIndex) => (
            <div key={`ME${subIndex}`}>
              {/* Si el tipo de submenú es 'SU', usamos un acordeón */}
              {subMenu.tipo === 'SU' ? (
                <Accordion sx={{ margin: '12px 0' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{subMenu.nombre}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {subMenu.funcionalMethods && subMenu.funcionalMethods.length > 0
                      ? <List sx={{ margin: 0, padding: 0 }}>
                        {subMenu.funcionalMethods.map((item, checkboxIndex) => {
                          const labelId = `checkbox-list-label-${checkboxIndex}`;
                          return (
                            <ListItem key={`${checkboxIndex}-${item.idPermiso}`} disablePadding>
                              <ListItemButton
                                onClick={() => onCheckPressed(index, subIndex, checkboxIndex, !item.hasPermission, subMenu.id)}
                                role={undefined}
                                dense
                                sx={{ margin: 0, padding: 0 }}
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    tabIndex={-1}
                                    checked={item.hasPermission}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={item.nombrePermiso} />
                              </ListItemButton>
                            </ListItem>
                          )
                        })}
                      </List>
                      : null
                    }
                  </AccordionDetails>
                </Accordion>
              ) : (
                // Llamada recursiva para submenús de tipo 'MO' o 'ME'
                renderMenu({ menu: subMenu, onCheckPressed, index })
              )}
            </div>
          ))}
        </div>
      ) : <span>No tiene submenu</span>}
    </div>
  );
};

export default function PermisosPage() {
  const location = useLocation();
  const { state } = location;
  const id = state?.id;

  const { getRoles } = CatalogRepository();
  const { getModuleRolePermissions, updateModuleRolePermissions } = PermisosRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [roleId, setRoleId] = useState<number>(0);
  const [roleIdSaved, setRoleIdSaved] = useState<number>(0);
  const [roleOptions, setRoleOptions] = useState<ItemListModel[]>([]);
  const [menuData, setMenuData] = useState<MenuModel[]>([]);

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    try {
      const roleList = await getRoles();
      setRoleOptions(roleList.data);
      if (id) {
        const response = await getModuleRolePermissions(id);
        setMenuData(response.data);
        setRoleId(id);
        setRoleIdSaved(id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getModules = async () => {
    setLoading(true);
    try {
      const response = await getModuleRolePermissions(roleId);
      setMenuData(response.data);
      setRoleIdSaved(roleId);
    } catch (error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      });
    }
    setLoading(false);
  }

  const updateModules = async () => {
    setLoading(true);
    try {
      const response = await updateModuleRolePermissions(menuData, roleIdSaved);
      if (response.status === 'error') {
        showAlertAsync({
          title: 'Error',
          icon: 'error',
          html: "Ocurrió un error inesperado.",
        });
      }
      getModules();
      showAlertAsync({
        title: 'Actualización..',
        icon: 'success',
        html: "Actualizacion Exitosa..",
      });
    } catch (error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      });
    }
    setLoading(false);
  }

  const handleSelectRolChange = (option?: OptionType | null) => {
    if (option != null) {
      setRoleId(Number(option.value ?? "0"));
    }
  }

  const updatePermissionRecursively = (
    menuData: MenuModel[],
    menuIndex: number,
    subMenuIndex: number,
    methodIndex: number,
    checked: boolean,
    subMenuId: number
  ): MenuModel[] => {
    return menuData.map((menu) => {
      if (menu.id === subMenuId) {
        return {
          ...menu,
          funcionalMethods: menu.funcionalMethods.map((method, methodIdx) => {
            if (methodIdx === methodIndex) {
              return {
                ...method,
                hasPermission: checked,
              };
            }
            return method;
          }),
        };
      }

      if (menu.subMenu && menu.subMenu.length > 0) {
        return {
          ...menu,
          subMenu: updatePermissionRecursively(menu.subMenu, menuIndex, subMenuIndex, methodIndex, checked, subMenuId),
        };
      }

      return menu;
    });
  };

  const handleCheckChange = (
    menuIndex: number,
    subMenuIndex: number,
    methodIndex: number,
    checked: boolean,
    subMenuId: number
  ): void => {
    setMenuData((prevMenuData) => {
      return updatePermissionRecursively(prevMenuData, menuIndex, subMenuIndex, methodIndex, checked, subMenuId);
    });
  };

  return (
    <Box>
      <Box mt={2} mb={2}>
        <Card sx={{ padding: '20px 16px' }}>
          <Grid container spacing={2} sx={{ height: "100%" }}>
            <Grid size={{ xs: 10, md: 4 }}>
              <CustomSelect
                onChange={(e: OptionType | null) => handleSelectRolChange(e)}
                value={roleOptions.find(item => item.value === roleId.toString())}
                options={roleOptions}
                label="Búsqueda por rol"
              />
            </Grid>
            <Grid size={{ xs: 2 }}>
              <Button
                onClick={() => getModules()}
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Consultar
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>

      <Box mb={6}>
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
          : menuData && menuData.length > 0 && (
            <Box>
              {menuData.map((menu, index) => {
                if (menu.tipo === 'MO') {
                  return (
                    <Box key={menu.id}>
                      <Typography variant="h6">{menu.nombre}</Typography>
                      <Card sx={{ padding: '10px 20px', marginBottom: '20px' }}>
                        {renderMenu({ menu, onCheckPressed: handleCheckChange, index })}
                      </Card>
                    </Box>
                  )
                }
                return null;
              })}
              <Box sx={{
                position: "fixed",
                bottom: '40px',
                right: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '10px'
              }}>
                <Fab
                  onClick={updateModules}
                  variant="extended"
                  color="info"
                >
                  <SaveIcon fontSize="medium" sx={{ mr: 1 }} />
                  <Typography fontSize={14} color="white" sx={{ marginTop: '2px' }}>
                    Guardar
                  </Typography>
                </Fab>
              </Box>
            </Box>
          )
        }
      </Box>
    </Box>
  );
}