import { RemoveRedEye } from "@mui/icons-material";
import { Avatar, Button, DatePicker, Dropdown, Form, Input, InputNumber, Layout, MenuProps, message, Modal, Select, Space, Switch, Table, TableProps, Tooltip } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { LogoutOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { HeaderTable } from "../../Cotizacion/components/HeaderTable";
import { FormSeeModal } from "../../Cotizacion/components/FormSeeModal";
import { CotizacionHook } from "../../Cotizacion/hooks/CotizacionHook";
import { DataType } from "../../Dashboard/Pages/Data";
import { useState } from "react";

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

export const Cotizacion = () => {
  const { handleCancelSee, openModalSee, selectedRecord, setRowsSelect, showModalSee, showSelect, tableData } = CotizacionHook();

  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setRowsSelect(selectedRows);
    },
  };

  const [formulario] = Form.useForm();
  const formaPago = Form.useWatch('formaPago', formulario);
  const renderFormaPago = (formPago: string) => {
    switch (formPago) {
      case 'Financiamiento Directo':
        return (
          <>
            <Form.Item name="cuotaentrada" label="Cuato de Entrada">
              <Input addonAfter={"$"} />
            </Form.Item>
            <Form.Item name="cuotamensual" label="Cuato Mensuales">
              <Input addonAfter={"$"} />
            </Form.Item>
          </>
        );
      case 'Debito a la Cuenta':
        return (
          <>
            <Form.Item name="entidadbancaria" label="Nombre Entidad Bancaria">
              <Input />
            </Form.Item>
            <Form.Item name="numerocuenta" label="Número Cuenta">
              <InputNumber style={{ width: '100%' }} type="number" controls={false} />
            </Form.Item>
            <Form.Item name="tipocuenta" label="Tipo de Cuenta">
              <Select>
                <Select.Option value="Cuenta de Ahorro">Cuenta de Ahorro</Select.Option>
                <Select.Option value="Cuenta Corriente">Cuenta Corriente</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="correocuenta" label="Correo">
              <Input />
            </Form.Item>
          </>
        )
      case 'Tarjeta de Crédito':
        return (
          <>
            <Form.Item name="bancoemisor" label="Banco Emisor">
              <Select>
                <Select.Option value="Banco Guayaquil">Banco Guayaquil</Select.Option>
                <Select.Option value="Banco Pichincha">Banco Pichincha</Select.Option>
                <Select.Option value="Banco Pacífico">Banco Pacífico</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="nombretarjeta" label="Tarjeta de Crédito">
              <Select>
                <Select.Option value="Visa">Visa</Select.Option>
                <Select.Option value="MasterCard">MasterCard</Select.Option>
                <Select.Option value="American Express">American Express</Select.Option>
                <Select.Option value="Diners">Diners</Select.Option>
              </Select>
            </Form.Item>
          </>
        )
      default:
        break;
    }
  }
  const [pago, setPago] = useState<boolean>(false);
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
      title: 'Registrar Pago',
      key: 'action',
      render: (_, record) => {
        return (

          <Space size={"large"}>
            <Switch
              checkedChildren="SI"
              unCheckedChildren="NO"
              size='default'
              onChange={(checked) => {
                setPago(checked)
              }}
            />
          </Space >
        )
      },
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size={"small"}>
            <Tooltip placement="bottom" title={"Ver"}>
              <Avatar
                shape="square"
                icon={<RemoveRedEye />}
                onClick={() => showModalSee(record)}
              />
            </Tooltip>
          </Space >


        )
      },
    },
  ];

  return (
    <Layout style={{ height: '100%' }}>
      <Header style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <label style={{ fontWeight: 'bold' }}>Cotizaciones</label>
        </Space>
        <Space>
          <Dropdown menu={menuProps} placement="bottomRight" >
            <Button type="text" >
              <Space>
                SofiaMartinez@apptelink.com
                <SettingOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
      </Header>
      {selectedRecord && (
        <>
          <FormSeeModal info={selectedRecord} openModal={openModalSee} handleClose={handleCancelSee} />
        </>
      )}
      {
        pago && (
          <>
            <Modal
              open={pago}
              onCancel={() => {
                setPago(false)
                formulario.resetFields()
              }}
              okText={'Aceptar'}
              cancelText={'Cancelar'}
              onClose={() => {
                setPago(false)
                formulario.resetFields()
              }}
              title={"Registar Pago"}
              width={'50%'}
            >
              <Form
                form={formulario}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 15 }}
                layout="horizontal"
                style={{ width: '100%', paddingTop: 10 }}
              >
                <Form.Item label="Fecha de Pago" name="fechapago">
                  <DatePicker style={{ width: '100%' }}></DatePicker>
                </Form.Item>
                <Form.Item label="Forma de Pago" name="formaPago">
                  <Select>
                    <Select.Option value="Financiamiento Directo">Financiamiento Directo</Select.Option>
                    <Select.Option value="Debito a la Cuenta">Debito a la Cuenta</Select.Option>
                    <Select.Option value="Tarjeta de Crédito">Tarjeta de Crédito</Select.Option>
                  </Select>
                </Form.Item>
                {
                  renderFormaPago(formaPago)
                }
                <Form.Item label="Porcentaje" name="porcentaje">
                  <InputNumber addonAfter={"%"} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="valor" name="valor">
                  <InputNumber addonAfter={"$"} style={{ width: '100%' }} controls={false}/>
                </Form.Item>
              </Form>
            </Modal>
          </>
        )
      }
      <Content style={{ width: '100%' }}>
        <Table
          title={() =>
          (
            <HeaderTable direction="flex-end">
              <Input
                prefix={<SearchOutlined />}
                style={{ width: '100%' }}
              >
              </Input>
            </HeaderTable>
          )}
          bordered
          rowSelection={showSelect ? { type: 'checkbox', ...rowSelection } : undefined}
          dataSource={tableData}
          columns={columns}

          pagination={{ pageSize: 10 }}
          scroll={{ y: 86 * 5 }}
        />
      </Content>
    </Layout>
  );
}
