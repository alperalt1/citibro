import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import { Alert, Box } from "@mui/material";
import { ItemListModel } from "../../../shared/models/ItemListModel";
import { EditExternalUserModel } from "../Models/UsuarioExternoModel";
import { CustomInput } from "../../../shared/components/CustomInput";
import { CustomSelect } from "../../../shared/components/CustomSelect";
import { createDictionary } from "../../../shared/utils";

type Props = {
  formik: FormikProps<EditExternalUserModel>;
  catalogCliente: ItemListModel[];
  catalogRole: ItemListModel[];
}

const autorizarEmpresaCatalog = [
  { label: 'Sí', value: '1' },
  { label: 'No', value: '0' },
]

const autorizarUsuarioCatalog = [
  { label: 'Sí', value: '1' },
  { label: 'No', value: '0' },
]

export const FormEditExternalUser = (props: Props) => {
  const { formik, catalogRole } = props;

  const [roleDictionary, setRoleDictionary] = useState<{ [key: string]: { value: string, label: string } }>({
    id: { value: '', label: '' }
  });

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    try {
      // const clienteDic = createDictionary(catalogCliente);
      // setClienteDictionary(clienteDic);
      const roleDic = createDictionary(catalogRole);
      setRoleDictionary(roleDic);
    } catch (error) {
      console.error(error)
    }
  }

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = event.target.value;
    if (/^\d*$/.test(input)) {
      formik.setFieldValue(event.target.name, input);
    } 
  };

  return (
    <form onSubmit={() => { }}>
      {/* Autorizar empresa */}
      <Box mb={1} mt={1}>
        <CustomSelect
          onChange={(option) => formik.setFieldValue('autorizarEmpresa', option?.value === '1')}
          onBlur={formik.handleBlur('autorizarEmpresa')}
          options={autorizarEmpresaCatalog}
          value={autorizarEmpresaCatalog.find(
            item => (item.value === '1') === formik.values.autorizarEmpresa
          )}
          label="Autorizar Empresa"
          id="autorizarEmpresa"
          name="autorizarEmpresa"
          disablePortal={true}
          touched={formik.touched.autorizarEmpresa}
          errorMessage={formik.errors.autorizarEmpresa}
        />
      </Box>
      {/* Autorizar usuario */}
      <Box mb={1} mt={2}>
        <CustomSelect
          onChange={(option) => formik.setFieldValue('autorizarCuenta', option?.value === '1')}
          onBlur={formik.handleBlur('autorizarCuenta')}
          options={autorizarUsuarioCatalog}
          value={autorizarUsuarioCatalog.find(
            item => item.value === (formik.values.autorizarCuenta ? '1' : '0')
          )}
          label="Autorizar Cuenta"
          id="autorizar"
          name="autorizar"
          disablePortal={true}
          touched={formik.touched.autorizarCuenta}
          errorMessage={formik.errors.autorizarCuenta}
        />
      </Box>
      {/* Numero de identificación */}
      <Box mb={1} mt={2}>
        <CustomInput
          onChange={handleNumberChange}
          onBlur={formik.handleBlur('ruc')}
          value={formik.values.ruc}
          type="text"
          id="ruc"
          name="ruc"
          label="N° RUC"
          touched={formik.touched.ruc}
          errorMessage={formik.errors.ruc}
        />
      </Box>
      {/* Razón social */}
      <Box mb={1} mt={2}>
        <CustomInput
          onChange={formik.handleChange('razonSocial')}
          value={formik.values.razonSocial}
          type="text"
          id="razonSocial"
          name="razonSocial"
          label="Razón social"
          touched={formik.touched.razonSocial}
          errorMessage={formik.errors.razonSocial}
        />
      </Box>
      {/* Email Empresarial*/}
      <Box mb={1} mt={2}>
        <CustomInput
          onChange={formik.handleChange('correoEmpresarial')}
          onBlur={formik.handleBlur('correoEmpresarial')}
          value={formik.values.correoEmpresarial}
          type="text"
          id="correoEmpresarial"
          name="correoEmpresarial"
          label="Correo Empresarial"
          touched={formik.touched.correoEmpresarial}
          errorMessage={formik.errors.correoEmpresarial}
        />
      </Box>
      {/* Rol */}
      <Box mb={1} mt={2}>
        <CustomSelect
          onChange={(option) => formik.setFieldValue('roleId', option?.value)}
          onBlur={formik.handleBlur('roleId')}
          options={catalogRole}
          value={roleDictionary[formik.values.roleId]}
          label="Selecciona un rol"
          id="roleId"
          name="roleId"
          disablePortal={true}
          touched={formik.touched.roleId}
          errorMessage={formik.errors.roleId}
        />
      </Box>
      {/* Nombre */}
      <Box mb={1} mt={2}>
        <CustomInput
          onChange={formik.handleChange('nombre')}
          onBlur={formik.handleBlur('nombre')}
          value={formik.values.nombre}
          type="text"
          id="nombre"
          name="nombre"
          label="Nombre"
          touched={formik.touched.nombre}
          errorMessage={formik.errors.nombre}
        />
      </Box>
      {/* Apellido */}
      <Box mb={1} mt={2}>
        <CustomInput
          onChange={formik.handleChange('apellido')}
          onBlur={formik.handleBlur('apellido')}
          value={formik.values.apellido}
          type="text"
          id="apellido"
          name="apellido"
          label="Apellido"
          touched={formik.touched.apellido}
          errorMessage={formik.errors.apellido}
        />
      </Box>
      {/* Numero de IDENTIFICACION */}
      <Box mb={1} mt={2}>
        <CustomInput
          onChange={handleNumberChange}
          onBlur={formik.handleBlur('numeroIdentificacion')}
          value={formik.values.numeroIdentificacion}
          type="text"
          id="numeroIdentificacion"
          name="numeroIdentificacion"
          label="N° Cedula"
          touched={formik.touched.numeroIdentificacion}
          errorMessage={formik.errors.numeroIdentificacion}
        />
      </Box>
      {/* Email Personal*/}
      <Box mb={1} mt={2}>
        <CustomInput
          onChange={formik.handleChange('correoPersonal')}
          onBlur={formik.handleBlur('correoPersonal')}
          value={formik.values.correoPersonal}
          type="text"
          id="correoPersonal"
          name="correoPersonal"
          label="Correo Personal"
          touched={formik.touched.correoPersonal}
          errorMessage={formik.errors.correoPersonal}
        />
      </Box>
      {/* Número de teléfono */}
      <Box mb={1} mt={2}>
        <CustomInput
          onChange={handleNumberChange}
          onBlur={formik.handleBlur('telefono')}
          value={formik.values.telefono}
          type="text"
          id="telefono"
          name="telefono"
          label="Teléfono"
          touched={formik.touched.telefono}
          errorMessage={formik.errors.telefono}
        />
      </Box>
      {/* Password */}
      <Box mt={3} mb={1}>
        <Alert severity="info" sx={{ fontSize: '12px' }}>
          <b>Aviso:</b> Puede decidir ingresar una <b>contraseña</b> o dejar que el sistema genere una de forma <b>aleatoria</b>.
        </Alert>
        <Box mt={1}>
          <CustomInput
            onChange={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            type="password"
            id="password"
            name="password"
            label="Contraseña"
            showIcon={true}
            touched={formik.touched.password}
            errorMessage={formik.errors.password}
          />
        </Box>
      </Box>
    </form>
  );
}