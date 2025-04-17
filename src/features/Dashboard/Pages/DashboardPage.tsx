import { CheckOutlined, CloseOutlined, Edit, RemoveRedEye } from "@mui/icons-material";

import { Avatar, Button, Dropdown, Form, Input, InputNumber, Layout, MenuProps, message, Modal, notification, Popconfirm, Select, Space, Table, TableProps, Tooltip } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { createStyles } from 'antd-style';
import { useState } from "react";
import { BlockOutlined, DownloadOutlined, ExclamationCircleOutlined, LogoutOutlined, PlusOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { utils, writeFile } from 'xlsx';
// import { Content } from "antd/es/layout/layout";
// import Sider from "antd/es/layout/Sider";
interface DataType {
  key: string;
  name: string;
  aseguradora?: string;
  tipocliente?: 'Natural' | 'Jurídico';
  ramo?: string;
  coberturaGeneral?: string;
  coberturaAdicional?: string;
  observaciones?: string;
  deducibles?: number;
  formaPago?: 'Financiamento Directo' | "Debito a la Cuenta" | "Tarjeta de Crédito"
}


const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});



const data: DataType[] = [
  {
    key: '1',
    name: 'Sofía Martínez',
    aseguradora: 'PICHINCHA',
    tipocliente: 'Natural',
    ramo: 'Robo',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Tarjeta de Crédito",
  },
  {
    key: '2',
    name: 'Liam Carter',
    aseguradora: 'EQUINOCCIAL',
    tipocliente: 'Natural',
    ramo: 'Equipo Electrónico',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Financiamento Directo",
  },
  {
    key: '3',
    name: 'Alejandro Ruiz',
    aseguradora: 'ECUATORIANO SUIZA',
    tipocliente: 'Natural',
    ramo: 'Robo',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Debito a la Cuenta",
  },
  {
    key: '4',
    name: 'Apptelink S.A.',
    aseguradora: 'LATINA SEGUROS C.A',
    tipocliente: 'Jurídico',
    ramo: 'Transporte',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Tarjeta de Crédito",
  },
  {
    key: '5',
    name: 'Citikold Group',
    aseguradora: 'COLON',
    tipocliente: 'Jurídico',
    ramo: 'Garantias Aduaneras',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Debito a la Cuenta",
  },
  {
    key: '6',
    name: 'Amazon',
    aseguradora: 'PICHINCHA',
    tipocliente: 'Jurídico',
    ramo: 'Rotura de Maquinaria',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Debito a la Cuenta",
  },
  {
    key: '7',
    name: 'Carlos Gómez',
    aseguradora: 'LA UNIÓN',
    tipocliente: 'Natural',
    ramo: 'Robo',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Tarjeta de Crédito",
  },
  {
    key: '8',
    name: 'Isabella Clark',
    aseguradora: 'COLON',
    tipocliente: 'Natural',
    ramo: 'Vehiculos',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Financiamento Directo",
  },
  {
    key: '9',
    name: 'Diego Morales',
    aseguradora: 'GENERALI',
    tipocliente: 'Natural',
    ramo: 'Vida Colectiva',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Debito a la Cuenta",
  },
  {
    key: '10',
    name: 'Amelia Foster',
    aseguradora: 'COFACE S.A.',
    tipocliente: 'Natural',
    ramo: 'Fidelidad',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Financiamento Directo",
  },
  {
    key: '11',
    name: 'Gabriel Silva',
    aseguradora: 'LA UNIÓN',
    tipocliente: 'Natural',
    ramo: 'Cumplimiento de Contrato',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Debito a la Cuenta",
  },
  {
    key: '12',
    name: 'Chloe Hayes',
    aseguradora: 'SEGUROS CONFIANZA S.A.',
    tipocliente: 'Natural',
    ramo: 'Cumplimiento de Contrato',
    coberturaGeneral: "Prueba",
    coberturaAdicional: "Prueba",
    observaciones: "Prueba",
    deducibles: 10,
    formaPago: "Financiamento Directo",
  },
];



interface HeaderProps {
  download?: boolean,
  showSelect: boolean,
  setShowSelectFunc: React.Dispatch<React.SetStateAction<boolean>>;
  modalAdd?: boolean
  setModelAddFunc: React.Dispatch<React.SetStateAction<boolean>>;
}



const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const items: MenuProps['items'] = [
  {
    label: 'Perfil',
    key: '1',
    icon: <UserOutlined />,

  },
  {
    label: 'Salir',
    key: '2',
    icon: <LogoutOutlined />,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

export default function DashboardPage() {
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalSee, setOpenModalSee] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
  const [tableData, setTableData] = useState<DataType[]>(data);
  const [rowsSelect, setRowsSelect] = useState<DataType[]>();
  const [form] = Form.useForm();
  const { styles } = useStyle();
  const [messageApi, contextHolder] = message.useMessage();
  const [api, contextHolderNo] = notification.useNotification();

  const openNotification = (pauseOnHover: boolean) => () => {
    api.open({
      message: 'Cotización',
      description:
        'Se ha creado la cotización Correctamente.',
      showProgress: true,
      pauseOnHover,
    });
  };
  const openMessage = () => {
    messageApi.open({
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({

        type: 'success',
        content: 'Loaded!',
        duration: 1,
      });
    }, 2000);
  };

  const handleOkAdd = () => {
    form
      .validateFields()
      .then((values) => {
        setTableData((prevData) => [...prevData, values])
        setOpenModalAdd(false);
        setSelectedRecord(null);
        form.resetFields();
        openNotification(true)
      })
      .catch((info) => {
        console.log('Validación fallida:', info);
      });
    
  };

  const HeaderTable: React.FC<HeaderProps> = ({ showSelect, setShowSelectFunc, download, modalAdd, setModelAddFunc }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 6 }}>
        {contextHolder}
        {contextHolderNo}
        <Button
          icon={<PlusOutlined></PlusOutlined>}
          onClick={() => setModelAddFunc(!modalAdd)}
        >
          Agregar Cotización
        </Button>
        <Button
          icon={<BlockOutlined></BlockOutlined>}
          onClick={() => setShowSelectFunc(!showSelect)}
        >
          Comparar
        </Button>
        <Button
          icon={<DownloadOutlined></DownloadOutlined>}
          onClick={() => {
            if (rowsSelect != null) {
              openMessage()
              type OmitKey = Omit<DataType, 'key'>;
              const newSelec: OmitKey[] = rowsSelect.map(({ key, ...rest }) => rest);
              const ws = utils.json_to_sheet(newSelec);
              ws["!cols"] = Object.keys(newSelec[0] || {}).map(() => ({ wch: 20 }));
              const wb = utils.book_new();
              utils.book_append_sheet(wb, ws, "Data");
              writeFile(wb, "SheetJSReact.xlsx");
            } else {
              messageApi.open({
                type: 'error',
                content: 'Seleccionar Datos',
                duration: 2,
              });
            }

          }}
          disabled={download}
        >
          Descargar
        </Button>
        <Input
          prefix={<SearchOutlined />}
          style={{ width: '20%' }}
        >
        </Input>
        <Modal
          title="Cotización"
          open={modalAdd}
          onOk={handleOkAdd}
          okText="Guardar"
          cancelText="Cancelar"
          confirmLoading={false}
          width={'50%'}
          onCancel={() => setModelAddFunc(!modalAdd)}>
          <Form
            form={form}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 15 }}
            layout="horizontal"
            style={{ width: '100%' }}
          >
            <Form.Item label="Cliente" name="name">
              <Select>
                <Select.Option value="Alex Peralta">Alex Peralta</Select.Option>
                <Select.Option value="Kevin Pilko">Kevin Pilko</Select.Option>
                <Select.Option value="Apptelink S.A.">Apptelink S.A.</Select.Option>
                <Select.Option value="Amazon">Amazon</Select.Option>
                <Select.Option value="Marcos Vidal">Marcos Vidal</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Tipo de Cliente" name="tipocliente">
              <Select>
                <Select.Option value="Natural">Natural</Select.Option>
                <Select.Option value="Juridíco">Juridíco</Select.Option>
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
                <Select.Option value="EQUIPO Y MAQUINARIA DE CONTRATISTA">EQUIPO Y MAQUINARIA DE CONTRATISTA</Select.Option>
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
            <Form.Item label="Observacíones" name="observaciones">
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item label="Deducibles" name="deducibles">
              <InputNumber addonAfter={"%"} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Forma de Pago" name="formaPago">
              <Select>
                <Select.Option value="f">Financiamiento Directo</Select.Option>
                <Select.Option value="d">Debito a la Cuenta</Select.Option>
                <Select.Option value="t">Tarjeta de Crédito</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>);
  };

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
    openMessage()
    openNotification(false);
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

  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setRowsSelect(selectedRows);
    },
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
      } catch (error) {
        reject(error); // Rechaza la promesa si hay un error
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
      } catch (error) {
        reject(error); // Rechaza la promesa si hay un error
      }
    });
  };
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Cliente',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tipo de Cliente',
      dataIndex: 'tipocliente',
      key: 'tipocliente',
    },
    {
      title: 'Ramo',
      dataIndex: 'ramo',
      key: 'ramo',
    },
    {
      title: 'Aseguradora',
      dataIndex: 'aseguradora',
      key: 'aseguradora',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => {
        return (

          <Space size="small">
            <Tooltip placement="bottom" title={"Editar"}>
              <Avatar

                shape="square"
                icon={<Edit />}
                onClick={() => showModalEdit(record)}
                style={{ backgroundColor: "#faad14" }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title={"Ver"}>
              <Avatar
                shape="square"
                icon={<RemoveRedEye />}
                onClick={() => showModalSee(record)}
              />
            </Tooltip>
            <Popconfirm
              title={'Aceptar Cotización'}
              icon={<ExclamationCircleOutlined style={{ color: '#16277f' }} />}
              onConfirm={() => handleAceptCotizacion(record.key)}
            >
              <Tooltip placement="bottom" title={"Aceptar"}>
                <Avatar
                  shape="square"
                  icon={<CheckOutlined />}

                  style={{ backgroundColor: "#16277f" }}
                />
              </Tooltip>
            </Popconfirm>
            <Popconfirm
              title={'Cancelar Cotizacíon'}
              icon={<ExclamationCircleOutlined style={{ color: '#ff2d00' }} />}
              onConfirm={() => handleRechazarCotizacion(record.key)}
            >
              <Tooltip placement="bottom" title={"Cancelar"}>
                <Avatar
                  shape="square"
                  icon={<CloseOutlined />}
                  onClick={() => console.log("Prueba")}
                  style={{ backgroundColor: "#ff2d00" }}
                />
              </Tooltip>
            </Popconfirm>
          </Space >


        )
      },
    },
  ];

  return (
    <Layout style={{ height: '100%' }}>
      {contextHolderNo}
      <Header style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Button onClick={openNotification(false)}>mostrara notific</Button>
          <label style={{ fontWeight: 'bold' }}>Registro de Cotizaciones</label>
        </Space>
        <Space>
          <Dropdown menu={menuProps} placement="bottomRight" >
            <Button type="text" >
              <Space>
                test@apptelink.com
                <SettingOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
      </Header>
      {selectedRecord && (
        <>
          <Modal
            title={`Editar Cotización - ${selectedRecord.name}`}
            open={openModalEdit}
            onOk={handleOkEdit}
            onCancel={handleCancelEdit}
            okText="Editar"
            cancelText="Cancelar"
            width="50%"
            confirmLoading={false}
          >
            <Form
              form={form}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 15 }}
              layout="horizontal"
              style={{ width: '100%' }}
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
          <Modal
            title={`Ver Cotización - ${selectedRecord.name}`}
            open={openModalSee}
            onCancel={handleCancelSee}
            okText="Guardar"
            cancelText="Cancelar"
            width="50%"
            confirmLoading={false}
          >
            <Space style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: "100%" }}>
              <Space>
                <label>Aseguradora:</label>
                <label>{selectedRecord.aseguradora}</label>
              </Space>
              <Space>
                <label>Ramo:</label>
                <label>{selectedRecord.ramo}</label>
              </Space>
              <Space>
                <label>TipoCliente:</label>
                <label>{selectedRecord.tipocliente}</label>
              </Space>
              <Space>
                <label>Cobertura Adicional:</label>
                <label>{selectedRecord.coberturaAdicional}</label>
              </Space>
              <Space>
                <label>Cobertura General:</label>
                <label>{selectedRecord.coberturaGeneral}</label>
              </Space>
            </Space>
          </Modal>
        </>

      )}
      <Content style={{ width: '100%' }}>
        <Table
          title={() => (<HeaderTable showSelect={showSelect} setShowSelectFunc={setShowSelect} download={!showSelect} modalAdd={openModalAdd} setModelAddFunc={setOpenModalAdd}></HeaderTable>)}
          className={styles.customTable}
          bordered
          rowSelection={showSelect ? { type: 'checkbox', ...rowSelection } : undefined}
          dataSource={tableData}
          columns={columns}
          size="small"
          pagination={{ pageSize: 10 }}
          scroll={{ y: 86 * 5 }}
        />
      </Content>
    </Layout>
  );
}
