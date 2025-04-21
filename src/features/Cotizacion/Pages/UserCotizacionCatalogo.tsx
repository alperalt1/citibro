import { CheckOutlined, CloseOutlined, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Button, Dropdown, Input, Layout, MenuProps, message, Modal, Popconfirm, Space, Table, TableProps, Tooltip } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { BlockOutlined, DownloadOutlined, ExclamationCircleOutlined, LogoutOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { utils, writeFile } from 'xlsx';
import { HeaderTable } from "../../Cotizacion/components/HeaderTable";
import { FormEditModal } from "../../Cotizacion/components/FormEditModal";
import { FormSeeModal } from "../../Cotizacion/components/FormSeeModal";
import { CotizacionHook } from "../../Cotizacion/hooks/CotizacionHook";
import { DataType } from "../../Dashboard/Pages/Data";

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

export const UserCotizacionCatalogo = () =>{
  const { form, handleAceptCotizacion, handleCancelEdit, handleCancelSee, handleOkEdit, handleRechazarCotizacion, openModalEdit, openModalSee, rowsSelect, selectedRecord, setRowsSelect, setShowSelect, showModalEdit, showModalSee, showSelect, tableData } = CotizacionHook();

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
      <Header style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <label style={{ fontWeight: 'bold' }}>Registro de Cotizaciones</label>
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
          <FormEditModal name={selectedRecord.name} openModal={openModalEdit} handleOk={handleOkEdit} handleClose={handleCancelEdit} estadoForm={form} />
          <FormSeeModal info={selectedRecord} openModal={openModalSee} handleClose={handleCancelSee} />
        </>
      )}
      <Content style={{ width: '100%' }}>
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
          scroll={{ y: 86 * 5 }}
        />
      </Content>
    </Layout>
  );
}
