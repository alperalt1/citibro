import { useState } from "react";

import { Form, Modal } from "antd";
import {  data, DataType } from "../../Dashboard/Pages/Data";


export const CotizacionAdminHook = () => {
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
  const [tableData, setTableData] = useState<DataType[]>(data);
  const [rowsSelect, setRowsSelect] = useState<DataType[]>();
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOkAdd = () => {
    form
      .validateFields()
      .then((values) => {
        setTableData((prevData) => [...prevData, values])
        setOpenModalAdd(false);
        setSelectedRecord(null);
        form.resetFields();
        Modal.success({
          title: 'Registro Exitoso',
          content: 'Cotizacion Creada Exitosamente!',
          // icon: <SettingFilled></SettingFilled>,
          // centered: true
        });
      })
      .catch((info) => {
        console.log('Validación fallida:', info);
      });

  };

  const handleCancelAdd = () => {
    setOpenModalAdd(false);
    form.resetFields();
    setSelectedRecord(null);
  };

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalSee, setOpenModalSee] = useState<boolean>(false);

  const showModalSee = (record: DataType) => {
    setSelectedRecord(record);
    setOpenModalSee(true);
  };

  const handleCancelSee = () => {
    setOpenModalSee(false);
    setSelectedRecord(null);
  };

  const showModalEdit = (record: DataType) => {
    setSelectedRecord(record);
    setOpenModalEdit(true);
    form.setFieldsValue({
      tipocliente: record.tipocliente,
      ramo: record.ramo,
      aseguradora: record.aseguradora,
      coberturaGeneral: record.coberturaGeneral,
      coberturaAdicional: record.coberturaAdicional,
      observaciones: record.observaciones,
      deducibles: record.deducibles,
      formaPago: record.formaPago,
    });

  };

  const handleOkEdit = () => {
    form
      .validateFields()
      .then((values) => {
        if (selectedRecord) {
          const updatedRecord = { ...selectedRecord, ...values };
          setTableData((prevData) =>
            prevData.map((item) =>
              item.key === updatedRecord.key ? updatedRecord : item
            )
          );
        }
        setOpenModalEdit(false);
        setSelectedRecord(null);
        form.resetFields();
        Modal.success({
          title: 'Edición Exitosa',
          content: 'Cotizacion Editada Exitosamente!',
          // icon: <SettingFilled></SettingFilled>,
          // centered: true
        });
      })
      .catch((info) => {
        console.log('Validación fallida:', info);
      });
  };

  const handleCancelEdit = () => {
    setOpenModalEdit(false);
    setSelectedRecord(null);
    form.resetFields();
  };



  const handleAceptCotizacion = (infoUser: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          setTableData((prevTableData) => {
            const newData = prevTableData.filter((x) => x.key !== infoUser);
            resolve(); // Resuelve la promesa después de actualizar el estado
            return newData;
          });
        }, 1000);
        Modal.success({
          title: 'Aceptar Cotización',
          content: 'Cotizacion Aceptada Exitosamente!',
          // icon: <SettingFilled></SettingFilled>,
          // centered: true
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleRechazarCotizacion = (infoUser: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          setTableData((prevTableData) => {
            const newData = prevTableData.filter((x) => x.key !== infoUser);
            resolve(); // Resuelve la promesa después de actualizar el estado
            return newData;
          });
        }, 1000);
        Modal.success({
          title: 'Rechazar Cotización',
          content: 'Cotizacion Rechazada!',
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    selectedRecord,
    setSelectedRecord,

    tableData,
    setTableData,

    rowsSelect,
    setRowsSelect,

    showSelect,
    setShowSelect,

    openModalAdd,
    setOpenModalAdd,

    form,

    handleOkAdd,
    handleCancelAdd,

    openModalEdit,
    setOpenModalEdit,

    openModalSee,
    setOpenModalSee,

    showModalSee,
    handleCancelSee,
    showModalEdit,
    handleOkEdit,
    handleCancelEdit,

    handleAceptCotizacion,
    handleRechazarCotizacion

    
  }
}
