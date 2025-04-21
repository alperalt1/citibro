import { Form, Input, InputNumber, Modal, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { FormModalInterface } from "../Interfaces/FormModalInterface";

interface FormEditModalProps extends FormModalInterface {}

export const FormEditModal = ({ name, openModal, estadoForm, handleOk, handleClose }: FormEditModalProps) => {
  return (
    <Modal
      title={`Editar Cotización - ${name}`}
      open={openModal}
      onOk={handleOk}
      onCancel={handleClose}
      okText="Editar"
      cancelText="Cancelar"
      width="50%"
      confirmLoading={false}
    >
      <Form
        form={estadoForm}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        style={{ width: '100%', paddingTop: 10 }}
        name="editForm"
      >
        <Form.Item label="Tipo de Cliente" name="tipocliente">
          <Select>
            <Select.Option value="Natural">Natural</Select.Option>
            <Select.Option value="Jurídico">Jurídico</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Aseguradora" name="aseguradora">
          <Select>
            <Select.Option value="CHUBB SEGUROS ECUADOR S.A.">CHUBB SEGUROS ECUADOR S.A.</Select.Option>
            <Select.Option value="PICHINCHA">PICHINCHA</Select.Option>
            <Select.Option value="AIG METROPOLITANA">AIG METROPOLITANA</Select.Option>
            <Select.Option value="EQUINOCCIAL">EQUINOCCIAL</Select.Option>
            <Select.Option value="ECUATORIANO SUIZA">ECUATORIANO SUIZA</Select.Option>
            <Select.Option value="HISPANA DE SEGUROS Y REASEGUROS S.A.">HISPANA DE SEGUROS Y REASEGUROS S.A.</Select.Option>
            <Select.Option value="SWEADEN COMPAÑIA DE SEGUROS S.A.">SWEADEN COMPAÑIA DE SEGUROS S.A.</Select.Option>
            <Select.Option value="PAN AMERICAN LIFE DE ECUADOR COMPAÑIA DE SEGUROS S.A.">PAN AMERICAN LIFE DE ECUADOR COMPAÑIA DE SEGUROS S.A.</Select.Option>
            <Select.Option value="ASEGURADORA DELL SUR">ASEGURADORA DELL SUR</Select.Option>
            <Select.Option value="UNIDOS">UNIDOS</Select.Option>
            <Select.Option value="LATINA SEGUROS C.A.">LATINA SEGUROS C.A.</Select.Option>
            <Select.Option value="SEGUROS CONFIANZA S.A.">SEGUROS CONFIANZA S.A.</Select.Option>
            <Select.Option value="SEGUROS ALIANZA S.A.">SEGUROS ALIANZA S.A.</Select.Option>
            <Select.Option value="CONDOR">CONDOR</Select.Option>
            <Select.Option value="INTEROCEANICA C.A. DE SEGUROS">INTEROCEANICA C.A. DE SEGUROS</Select.Option>
            <Select.Option value="VAZSEGUROS S.A. COMPAÑIA DE SEGUROS">VAZSEGUROS S.A. COMPAÑIA DE SEGUROS</Select.Option>
            <Select.Option value="GENERALI">GENERALI</Select.Option>
            <Select.Option value="CONSTITUCION C.A. COMPAÑIA DE SEGUROS">CONSTITUCION C.A. COMPAÑIA DE SEGUROS</Select.Option>
            <Select.Option value="AMA AMAERICA S.A. EMPRESA DE SEGUROS">AMA AMAERICA S.A. EMPRESA DE SEGUROS</Select.Option>
            <Select.Option value="COLON">COLON</Select.Option>
            <Select.Option value="HDI-SEGUROS S.A">HDI-SEGUROS S.A</Select.Option>
            <Select.Option value="MAPFRE ECUADOR COMPAÑIA DE SEGUROS S.A.">MAPFRE ECUADOR COMPAÑIA DE SEGUROS S.A.</Select.Option>
            <Select.Option value="COFACE S.A">COFACE S.A</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Ramo" name="ramo">
          <Select>
            <Select.Option value="ACCIDENTES PERSONALES">ACCIDENTES PERSONALES</Select.Option>
            <Select.Option value="BUEN USO DE ANTICIPO">BUEN USO DE ANTICIPO</Select.Option>
            <Select.Option value="CUMPLIMIENTO DE CONTRATO">CUMPLIMIENTO DE CONTRATO</Select.Option>
            <Select.Option value="EQUIPO ELECTRÓNICO">EQUIPO ELECTRÓNICO</Select.Option>
            <Select.Option value="EQUIPO Y MAQUINARIA DE CONTRATISTA">
              EQUIPO Y MAQUINARIA DE CONTRATISTA
            </Select.Option>
            <Select.Option value="FIDELIDAD">FIDELIDAD</Select.Option>
            <Select.Option value="GARANTIAS ADUANERAS">GARANTIAS ADUANERAS</Select.Option>
            <Select.Option value="INCENDIO Y LINEAS ALIADAS">INCENDIO Y LINEAS ALIADAS</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Cobertura General" name="coberturaGeneral">
          <Input />
        </Form.Item>
        <Form.Item label="Cobertura Adicional" name="coberturaAdicional">
          <Input />
        </Form.Item>
        <Form.Item label="Observaciones" name="observaciones">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item label="Deducibles" name="deducibles">
          <InputNumber addonAfter="%" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Forma de Pago" name="formaPago">
          <Select>
            <Select.Option value="financiamiento">Financiamiento Directo</Select.Option>
            <Select.Option value="debito">Débito a la Cuenta</Select.Option>
            <Select.Option value="tarjeta">Tarjeta de Crédito</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

