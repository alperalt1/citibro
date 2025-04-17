import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { IBaseRepository } from "../Interfaces/IBaseRepository";
import { DynamicDataForm, FormDynamicSchema } from "../Model/DynamicDataForm";
import { DynamicForm } from "../modals/DynamicForm";
import { LoadingButton } from "../../../shared/components/LoadingButton";
import { ChangeEvent, useEffect, useState } from "react";
import { showAlertAsync } from "../../../shared/components/SweetAlert";
import { OptionType } from "../../../shared/components/CustomSelect";

interface EstructuraProps<T, U> {
  isOpen: boolean;
  isEditForm: boolean;
  onClose: () => void;
  formConfig: FormDynamicSchema<T, U>;
  initialValues: DynamicDataForm;
  repositoryInterface: IBaseRepository<T, U>;
}

const Estructura = <T, U>({ isOpen, isEditForm, onClose, formConfig, initialValues, repositoryInterface }
  : EstructuraProps<T, U>) => {
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<DynamicDataForm>({});
  const [errors, setErrors] = useState<DynamicDataForm>({});
  const [selectedList, setSelectedList] = useState<Record<string, OptionType[]>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeBool = (name: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSelectDynamic = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getRepositorySelectInfo = async (repositoryInterface: IBaseRepository<T, U> | null, fieldName: string, namesColumnsData: string) => {
    try {
      if (repositoryInterface == null) {
        await showAlertAsync({ title: 'Error', icon: 'error', html: "No se ha recibido el repositorio" });
        return;
      }

      const result = await repositoryInterface!.getAll();
      const valueNamesArry = namesColumnsData.split('|');
      const options = result.data.map((item: any) => ({
        value: item[valueNamesArry[0]],
        label: item[valueNamesArry[1]],
      }));

      setSelectedList((prev) => ({
        ...prev,
        [fieldName]: options,
      }));
    } catch (error: any) {
      await showAlertAsync({ title: 'Error', icon: 'error', html: error.message });
    }
  };

  useEffect(() => {
    setFormData(initialValues);
    formConfig.fields
      .filter((field) => field.type === "select" && field.repositorySelect)
      .forEach((field) => {
        getRepositorySelectInfo(field.repositorySelect!, field.name, field.fieldValueSelect);
      });
  }, [formConfig.fields, initialValues]);


  const handleSaveOrUpdate = (dataRenderValue: any, formData: DynamicDataForm) => async () => {
    setLoadingEdit(true);
    try {
      if (!validateForm()) {

        console.log("Errores en el formulario:", errors);
        return;
      }

      if (isEditForm) {
        repositoryInterface.update(formData as U)
          .then(async () => {
            await showAlertAsync({ title: 'Mensaje', icon: 'success', html: "Actualizado exitosamente." });
            onClose();
          }).catch(async (error) => {
            await showAlertAsync({ title: 'Error', icon: 'error', html: error.message });
          }).finally(() => {
          });
      } else {
        formData[dataRenderValue.namePrimaryKey] = formData[dataRenderValue.namePrimaryKey] == '' ? 0 : formData[dataRenderValue.namePrimaryKey];
        repositoryInterface.save(formData as U)
          .then(async () => {
            await showAlertAsync({ title: 'Mensaje', icon: 'success', html: "Guardado exitosamente." });
            onClose();
          }).catch(async (error) => {
            await showAlertAsync({ title: 'Error', icon: 'error', html: error.message });
          }).finally(() => {
          });
      }

    } catch (error: any) {
      await showAlertAsync({ title: 'Error', icon: 'error', html: error instanceof Error ? error.message : error.message, });
    }
    setLoadingEdit(false);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};

    formConfig.fields.forEach((field) => {
      if (!field.isVisibleInput) return;
      const value = formData[field.name] || "";
      if (field.validations?.required && String(value).trim() === "") {
        newErrors[field.name] = `${field.label} es requerido`;
        valid = false;
      }
      if (
        field.validations?.maxLength &&
        String(value).length > field.validations.maxLength
      ) {
        newErrors[field.name] = `${field.label} debe tener máximo ${field.validations.maxLength} caracteres`;
        valid = false;
      }
      if (field.isTypeNullData && String(value).trim() === "") {
        formData[field.name] = null;
      } else {

        if (field.type === "number" && String(value).trim() === "") {
          formData[field.name] = 0;
        }
        if (field.type === "number" && isNaN(Number(value))) {
          newErrors[field.name] = `${field.label} debe ser un número`;
          valid = false;
        }
        if (field.validations.isAllowDecimal) {
          if (field.validations.isAllowDecimal != null && !field.validations.isAllowDecimal && isNaN(Number(value)) || !Number.isInteger(value)) {
            newErrors[field.name] = `${field.label} debe ser un número entero sin decimales`;
            valid = false;
          }
        }
      }
    });

    setErrors(newErrors);
    return valid;
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      <DialogTitle id="edit-dialog-title">{formConfig.nameModalEdit}</DialogTitle>
      <DialogContent>
        <DynamicForm
          repositoryInterface={repositoryInterface}
          dataRenderValue={formConfig}
          formData={formData}
          handleChange={handleChange}
          handleChangeBool={handleChangeBool}
          handleChangeSelectDynamic={handleChangeSelectDynamic}
          errors={errors}
          selectedList={selectedList}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="outline">
          Cancelar
        </Button>
        <LoadingButton
          onClick={handleSaveOrUpdate(formConfig, formData)}
          isLoading={loadingEdit}
          text="Guardar"
          width="120px"
        />
      </DialogActions>
    </Dialog>
  );
};

export default Estructura;
