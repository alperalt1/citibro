import { useEffect, useState } from "react";
import { IBaseRepository } from "../Interfaces/IBaseRepository";
import { DynamicDataForm, FormDynamicSchema } from "../Model/DynamicDataForm";
import { OptionType } from "../../../shared/components/CustomSelect";
import { showAlertAsync } from "../../../shared/components/SweetAlert";
import { Box, Button, Card, CircularProgress, } from "@mui/material";
import DynamicJsonTable from "./DynamicJsonTable";
import Estructura from "./Estructura";

interface Props<T, U> {
  repositoryInterface: IBaseRepository<T, U>;
  viewName: string;
  dynamicDataJsonDefault: any;
}

export const DynamicComponent = <T, U>({
  repositoryInterface,
  dynamicDataJsonDefault,
}: Props<T, U>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formDynamicDataCatalog, setFormDynamicDataCatalog] = useState<FormDynamicSchema<T, U>>();
  const [dataGetRepository, setDataGetRepository] = useState<any>();
  const [selectedList, setSelectedList] = useState<Record<string, OptionType[]>>({});
  const [formData, setFormData] = useState<DynamicDataForm>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);

  useEffect(() => {
    init();
    dynamicDataJsonDefault.fields
      .filter((field: any) => field.type === "select" && field.repositorySelect)
      .forEach((field: any) => {
        getRepositorySelectFilterInfo(field.repositorySelect, field.name, field.fieldValueSelect);
      });
  }, []);

  const init = async () => {
    try {
      const dataJson = dynamicDataJsonDefault;
      setFormDynamicDataCatalog(dataJson as FormDynamicSchema<T, U>);
      getRepositoryMethod();
    } catch (error: any) {
      await showAlertAsync({ title: "Error", icon: "error", html: error.message });
    }
  };

  const getRepositoryMethod = () => {
    repositoryInterface
      .getAll()
      .then((response) => {
        setDataGetRepository(response.data);
      })
      .catch(async (error) => {
        await showAlertAsync({ title: "Error", icon: "error", html: error.message });
      });
  };
  const handleCloseModal = () => {
    getRepositoryMethod();
    setIsModalOpen(false);
  };
  const setOpenModalCreate = async () => {
    if (formDynamicDataCatalog == null) {
      await showAlertAsync({ title: "Error", icon: "error", html: "Error al recuperar el formulario" });
      return;
    }

    const initialFormData = formDynamicDataCatalog.fields.reduce(
      (acc: DynamicDataForm, field: any) => {
        let valueInit: string | number | boolean = "";
        switch (field.type) {
          case "string":
            valueInit = "";
            break;
          case "number":
          case "int":
          case "float":
            valueInit = "";
            break;
          case "boolean":
            valueInit = field.valueDataDefault !== "" ? field.valueDataDefault : false;
            break;
          default:
            break;
        }

        acc[field.name] = valueInit;
        return acc;
      },
      {}
    );

    setFormData(initialFormData ?? {});
    setIsEditForm(false);
    setIsModalOpen(true);
  };

  const handleEdit = async (id: number) => {
    if (formDynamicDataCatalog == null) {
      await showAlertAsync({ title: "Error", icon: "error", html: "Error al recuperar el formulario" });
      return;
    }

    repositoryInterface
      .getById(id)
      .then((response: any) => {
        const initialFormData = formDynamicDataCatalog.fields.reduce(
          (acc: DynamicDataForm, field: any) => {
            acc[field.name] = response.data[field.name] || "";
            return acc;
          },
          {}
        );

        setFormData(initialFormData ?? {});
        setIsEditForm(true);
        setIsModalOpen(true);
      })
      .catch(async (error) => {
        await showAlertAsync({ title: "Error", icon: "error", html: error.message });
      });
  };

  const handleDelete = (id: number) => {
    showAlertAsync({
      title: "Advertencia",
      icon: "warning",
      html: "¿Estás seguro que quieres eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Sí, seguro",
      cancelButtonText: "Cancelar",
      onConfirm: () => {
        repositoryInterface.delete(id)
          .then(async (resp) => {
            if (resp) {
              await showAlertAsync({
                title: "Mensaje",
                icon: "success",
                html: "Se ha eliminado el registro.",
              });
              getRepositoryMethod();
            } else {
              await showAlertAsync({
                title: "Error",
                icon: "error",
                html: "No se pudo eliminar el registro.",
              });
            }
          })
          .catch(async () => {
            await showAlertAsync({
              title: "Error",
              icon: "error",
              html: "El api no devolvió una respuesta correcta",
            });
          });
      },
    });
  };

  const getRepositorySelectFilterInfo = (
    repositoryInterface: IBaseRepository<any, any>,
    fieldName: string,
    namesColumnsData: string
  ) => {
    repositoryInterface
      .getAll()
      .then(async (result) => {
        let valueNamesArry = namesColumnsData.split("|");
        setSelectedList({
          ...selectedList,
          [fieldName]: result.data.map((item: any) => ({
            value: item[valueNamesArry[0]],
            label: item[valueNamesArry[1]],
          })),
        });
      })
      .catch(async (error) => {
        await showAlertAsync({ title: "Error", icon: "error", html: error.message });
      })
      .finally(() => { });
  };

  return (
    <Box mt={4}>
      <Box mt={3}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "calc(100vh - 154px)" }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box display="flex" justifyContent="flex-end" my={2}>
              <Button variant="contained" color="primary"
                onClick={setOpenModalCreate}
              >
                Crear Nuevo
              </Button>
            </Box>
            <Box mb={3}>
              <Card>
                <DynamicJsonTable
                  onEditPressed={handleEdit}
                  onDeletePressed={handleDelete}
                  jsonSchema={formDynamicDataCatalog}
                  data={dataGetRepository ?? []}
                />
              </Card>
            </Box>
          </>
        )}
      </Box>
      {
        isModalOpen && (
          <Estructura
            repositoryInterface={repositoryInterface}
            isOpen={isModalOpen}
            isEditForm={isEditForm}
            onClose={handleCloseModal}
            formConfig={formDynamicDataCatalog!}
            initialValues={formData}
          />
        )}
    </Box>
  );
}