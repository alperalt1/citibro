import { Modal } from "antd";
import { CotizacionForm } from "./CotizacionForm";
import { FormModalInterface } from "../Interfaces/FormModalInterface";


interface FormModalProps extends FormModalInterface {}

export const FormModal = ({openModal, title , estadoForm, handleOk, handleClose}:FormModalProps) => {
  return (
    <Modal
      title={title}
      open={openModal}
      width='85%'
      onOk={handleOk}
      onCancel={handleClose}
      onClose={handleClose}
      cancelText='Cancelar'
      okText='Registrar'
    >
      <CotizacionForm estadoForm={estadoForm}></CotizacionForm>
    </Modal>
  )
}

