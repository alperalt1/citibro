import { DeleteFilled, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Card, Col, DatePicker, Dropdown, Form, Input, InputNumber, Layout, Menu, MenuProps, message, Modal, Row, Select, Space } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Content, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import logo from '../../../assets/images/logos/logonew.png';
import { useNavigate } from "react-router-dom";
import { item } from "../../Dashboard/Pages/Data";


export const Poliza = () => {
  const [form] = Form.useForm();
  const formaPago = Form.useWatch('formaPago', form);
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
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');

    if (e.key === '2') {
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

  return (
    <Layout style={{ height: '100%', backgroundColor: 'white' }}>
      <Sider style={{ backgroundColor: '#16277f' }} trigger={null} collapsible collapsed={collapsed}>
        <Space style={{ width: '100%', display: 'flex', justifyContent: 'center ', alignItems: 'center', flexDirection: 'column' }}>
          {
            collapsed ? <Space style={{ padding: 20 }}><Avatar>C</Avatar></Space> : <img style={{ width: "100%", padding: 20 }} src={logo}></img>
          }
        </Space>
        <Menu
          style={{ backgroundColor: '#16277f' }}
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
            <label style={{ fontWeight: 'bold' }}>Generar Poliza</label>
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
        <Content style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingTop: '3%', marginTop: 2, backgroundColor: 'white' }}>
          <Form
            form={form}
            labelCol={{ span: 7 }}
            layout="horizontal"
            style={{ width: '100%' }}
          >
            <Row>
              <Col span={11}>
                <Form.Item label="Poliza" name="coberturaGeneral">
                  <label>XYT-00001</label>
                </Form.Item>
              </Col>
            </Row>
            <Row>

              <Col span={11} >

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
                <Form.Item label="Fecha Registro" name="fecharegistro">
                  <DatePicker style={{ width: '100%' }}></DatePicker>
                </Form.Item>
              </Col>

              <Col span={11}>

                <Form.Item label="Detalle de la Poliza" name="detallepoliza" >
                  <TextArea rows={3} style={{ resize: 'none' }} />
                </Form.Item>
                <Form.Item label="Suma Asegurada" name="sumaasegurada" style={{ marginTop: '5.5%' }}>
                  <InputNumber addonAfter={"$"} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', justifyItems: 'center', gap: 12, padding:40 }}>
                <Card title="Anexo" style={{ width: '100%' }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="anexocantidad" >
                        <Input style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="anexovalor" >
                        <InputNumber addonAfter="$" style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div style={{width:'100%', display: 'flex', justifyContent: 'center', }}>
                    
                      <Button style={{width:'20%'}} icon={<PlusOutlined></PlusOutlined>}></Button>
                    
                  </div>
                </Card>

                <Card style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: 8 }}>
                    <Input placeholder="Objeto Asegurar" disabled={true}></Input>
                    <Input placeholder="Prima Inicial" disabled={true}></Input>
                    <Button>
                      <DeleteFilled />
                    </Button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: 8 }}>
                    <Input placeholder="Objeto Asegurar" disabled={true}></Input>
                    <Input placeholder="Prima Inicial" disabled={true}></Input>
                    <Button>
                      <DeleteFilled />
                    </Button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: 8 }}>
                    <Input placeholder="Objeto Asegurar" disabled={true}></Input>
                    <Input placeholder="Prima Inicial" disabled={true}></Input>
                    <Button>
                      <DeleteFilled />
                    </Button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: 8 }}>
                    <Input placeholder="Objeto Asegurar" disabled={true}></Input>
                    <Input placeholder="Prima Inicial" disabled={true}></Input>
                    <Button>
                      <DeleteFilled />
                    </Button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: 8 }}>
                    <Input placeholder="Objeto Asegurar" disabled={true}></Input>
                    <Input placeholder="Prima Inicial" disabled={true}></Input>
                    <Button>
                      <DeleteFilled />
                    </Button>
                  </div>
                </Card>
              </div>
            </Row>
            <div style={{ padding: 25 }}></div>
            {/* <Row>
              <Col span={11}>
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
              </Col>
            </Row> */}
          </Form>
          <Space style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center', width: '100%', paddingRight: '8%', paddingBottom: '4%' }}>
            <Button onClick={() => form.resetFields()}>Limpiar</Button>
            <Button onClick={() => {
              Modal.success({
                title: 'Registro Exitoso',
                content: 'Cotizacion Generada Exitosamente!',
              });
            }}>Generar  Poliza</Button>
          </Space>
        </Content>
      </Layout>
    </Layout>
  )
}

