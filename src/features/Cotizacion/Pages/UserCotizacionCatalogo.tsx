import { CheckOutlined, CloseOutlined, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Button, Dropdown, Input, Layout, Menu, MenuProps, message, Modal, Popconfirm, Space, Table, TableProps, Tooltip } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { BlockOutlined, DownloadOutlined, ExclamationCircleOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { utils, writeFile } from 'xlsx';
import { HeaderTable } from "../../Cotizacion/components/HeaderTable";
import { FormEditModal } from "../../Cotizacion/components/FormEditModal";
import { FormSeeModal } from "../../Cotizacion/components/FormSeeModal";
import { CotizacionHook } from "../../Cotizacion/hooks/CotizacionHook";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { DataType, item } from "../../Dashboard/Pages/Data";
import logo from '../../../assets/images/logos/Citibrokers_sinfondo.png';
import { useNavigate } from "react-router-dom";

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

export const UserCotizacionCatalogo = () => {
  const { form, handleAceptCotizacion, handleCancelEdit, handleCancelSee, handleOkEdit, handleRechazarCotizacion, openModalEdit, openModalSee, rowsSelect, selectedRecord, setRowsSelect, setShowSelect, showModalEdit, showModalSee, showSelect, tableData } = CotizacionHook();
  const navigate = useNavigate();
  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setRowsSelect(selectedRows);
    },
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
                size={'small'}
                shape="square"
                icon={<Edit style={{ height: '80%' }} />}
                onClick={() => showModalEdit(record)}
                style={{ backgroundColor: "#faad14" }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title={"Ver"}>
              <Avatar
                size={'small'}
                shape="square"
                icon={<RemoveRedEye style={{ height: '80%' }} />}
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
                  size={'small'}
                  shape="square"
                  icon={<CheckOutlined style={{ height: '80%' }} />}
                  style={{ backgroundColor: "#16277f" }}
                />
              </Tooltip>
            </Popconfirm>
            <Popconfirm
              title={'Cancelar Cotizacíon'}
              icon={<ExclamationCircleOutlined style={{ color: '#16277f' }} />}
              onConfirm={() => handleRechazarCotizacion(record.key)}
            >
              <Tooltip placement="bottom" title={"Cancelar"}>
                <Avatar
                  size={'small'}
                  shape="square"
                  icon={<CloseOutlined style={{ height: '80%' }} />}
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
          onClick={({ key }) => {
            if (key === 'Signout') {

            } else {
              navigate(key)
            }
          }}
          style={{ backgroundColor: '#2852da' }}
          mode="inline"
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
            <label style={{ fontWeight: 'bold' }}>Registro de Cotizaciones</label>
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
            <FormEditModal name={selectedRecord.name} openModal={openModalEdit} handleOk={handleOkEdit} handleClose={handleCancelEdit} estadoForm={form} />
            <FormSeeModal info={selectedRecord} openModal={openModalSee} handleClose={handleCancelSee} />
          </>
        )}
        <Content style={{ width: '100%', height: '100%', paddingLeft: 20 }}>
          <Table
            title={() =>
            (
              <HeaderTable direction="flex-end">
                <Button
                  icon={<BlockOutlined></BlockOutlined>}
                  onClick={() => {
                    setShowSelect(!showSelect)
                  }}
                >
                  Comparar
                </Button>
                <Button
                  icon={<DownloadOutlined></DownloadOutlined>}
                  onClick={() => {
                    if (rowsSelect != null) {
                      type OmitKey = Omit<DataType, 'key'>;
                      const newSelec: OmitKey[] = rowsSelect.map(({ key, ...rest }) => rest);
                      const ws = utils.json_to_sheet(newSelec);
                      ws["!cols"] = Object.keys(newSelec[0] || {}).map(() => ({ wch: 20 }));
                      const wb = utils.book_new();
                      utils.book_append_sheet(wb, ws, "Data");
                      writeFile(wb, "SheetJSReact.xlsx");
                      Modal.success({
                        title: 'Descarga Exitosa',
                        content: 'Documento Comparativo Generado Exitosamente!',
                      });
                    } else {
                      Modal.error({
                        title: 'Descargar Fallida',
                        content: 'Error al Generar el Documento Comparativo!',
                      });
                    }
                  }}
                  disabled={!showSelect}
                >
                  Descargar
                </Button>
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
