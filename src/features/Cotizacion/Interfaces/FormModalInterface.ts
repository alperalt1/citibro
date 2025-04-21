import { FormInstance } from "antd";


export interface FormModalInterface {
  name?: string;
  openModal?: boolean;
  title?: string;
  estadoForm?: FormInstance;
  handleOk?: () => void;
  handleClose?: () => void;
}