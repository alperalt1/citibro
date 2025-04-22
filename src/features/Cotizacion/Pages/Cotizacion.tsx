import { RemoveRedEye } from "@mui/icons-material";
import { Avatar, Button, DatePicker, Dropdown, Form, Input, InputNumber, Layout, Menu, MenuProps, message, Modal, Select, Space, Switch, Table, TableProps, Tooltip } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { HeaderTable } from "../../Cotizacion/components/HeaderTable";
import { FormSeeModal } from "../../Cotizacion/components/FormSeeModal";
import { CotizacionHook } from "../../Cotizacion/hooks/CotizacionHook";
import logo from '../../../assets/images/logos/Citibrokers_sinfondo.png';
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import '../../../App.css';
import { DataType, item } from "../../Dashboard/Pages/Data";
import { useNavigate } from "react-router-dom";


export const Cotizacion = () => {
  const { handleCancelSee, openModalSee, selectedRecord, setRowsSelect, showModalSee, showSelect, tableData } = CotizacionHook();
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
  
    if(e.key === '2'){
      navigate('/')
    }
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
      render: (_) => {
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
                size={'small'}
                shape="square"
                icon={<RemoveRedEye style={{ height: '80%' }} />}
                onClick={() => showModalSee(record)}
              />
            </Tooltip>
          </Space >


        )
      },
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ height: '100%', backgroundColor: 'white' }}>
      <Sider style={{ backgroundColor: '#2852da' }} trigger={null} collapsible collapsed={collapsed}>
        <Space style={{ width: '100%', display: 'flex', justifyContent: 'center ', alignItems: 'center', flexDirection: 'column' }}>
          {
            collapsed ? <Space style={{ padding: 20 }}><Avatar>C</Avatar></Space> : <img style={{ width: "100%", padding: 20 }} src={logo}></img>
          }
        </Space>
        <Menu
          style={{ backgroundColor: '#2852da' }}
          mode="inline"
          onClick={({ key }) => {
            if (key === 'Signout') {

            } else {
              navigate(key)
            }
          }}
          items={item}

        />
      </Sider>
      <Layout style={{ height: '100%', backgroundColor: 'white' }}>
        <Header style={{ padding: 0, backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <label style={{ fontWeight: 'bold' }}>Cotizaciones</label>
          </Space>
          <Space>
            <Dropdown menu={menuProps} placement="bottomRight" >
              <Button type="text" >
                <Space>
                  sofiamartinez@apptelink.com
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
                    <InputNumber addonAfter={"$"} style={{ width: '100%' }} controls={false} />
                  </Form.Item>
                </Form>
              </Modal>
            </>
          )
        }
        <Content style={{ width: '100%', height: '100%', paddingLeft: 20 }} className="content-container">
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
            size="small"
            pagination={{ pageSize: 10 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
