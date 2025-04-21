import { Button, Modal, Space } from "antd"
import { FormModalInterface } from "../Interfaces/FormModalInterface"
import { DataType } from "../../Dashboard/Pages/Data"


interface FormSeeModalProps extends FormModalInterface {
  info: DataType
}

export const FormSeeModal = ({openModal, handleClose, info}:FormSeeModalProps) => {
  return (
    <Modal
      title={`Ver Cotización - ${info.name}`}
      open={openModal}
      onCancel={handleClose}
      cancelText="Cancelar"
      width="50%"
      
      footer={[
        <Button key="close" type="primary" onClick={handleClose}>
          Cerrar
        </Button>,
      ]}
      confirmLoading={false}
    >
      <Space style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: "100%" }}>
        <Space>
          <label>Aseguradora:</label>
          <label>{info.aseguradora}</label>
        </Space>
        <Space>
          <label>Ramo:</label>
          <label>{info.ramo}</label>
        </Space>
        <Space>
          <label>TipoCliente:</label>
          <label>{info.tipocliente}</label>
        </Space>
        <Space>
          <label>Cobertura Adicional:</label>
          <label>{info.coberturaAdicional}</label>
        </Space>
        <Space>
          <label>Cobertura General:</label>
          <label>{info.coberturaGeneral}</label>
        </Space>
      </Space>
    </Modal>
  )
}
