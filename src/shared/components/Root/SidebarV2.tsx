import { Avatar, Button } from 'antd';
import '../../../App.css';
import { useState } from 'react';
import logoIco from '../../../assets/images/logos/seguro_ico.ico';
import { Download, DownloadOutlined } from '@mui/icons-material';

export const SidebarV2 = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});


  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubmenu = (parentId: string, id: string) => {
    const key = `${parentId}-${id}`;
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menu = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <DownloadOutlined></DownloadOutlined>,
      subItems: [
        { id: 'resumen', label: 'Resumen' },
        { id: 'estadisticas', label: 'Estadísticas' },
      ],
    },
    {
      id: 'usuarios',
      title: 'Usuarios',
      icon: <DownloadOutlined></DownloadOutlined>,
      subItems: [
        {
          id: 'lista',
          label: 'Lista de usuarios',
          subSubItems: [
            { id: 'activos', label: 'Activos' },
            { id: 'inactivos', label: 'Inactivos' },
          ],
        },
        { id: 'roles', label: 'Roles' },
      ],
    },
    {
      id: 'configuracion',
      title: 'Configuración',
      icon: <DownloadOutlined ></DownloadOutlined>,
      subItems: [
        { id: 'general', label: 'General' },
        { id: 'seguridad', label: 'Seguridad' },
      ],
    },
    {
      id: 'ayuda',
      title: 'Ayuda',
      icon: <DownloadOutlined ></DownloadOutlined>,
    }
  ];
  return (
    <div className={`${isVisible ? 'ContenedorSidebar_Open' : 'ContenedorSidebar_Close'}`}>
      <div style={{ height: '14%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Avatar shape="square" style={{ height: '6%', width: '5%', position: 'fixed', backgroundColor: 'black', marginLeft: 14, padding: 8 }} src={logoIco} />
        {
          isVisible && (
            <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold', marginLeft: 80 }}>CITIBROKERS</p>
          )
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ul>
          {menu.map((item) => (
            <li key={item.id} className="mb-2">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.title}
                    </div>
                    {openMenus[item.id] ? <Download /> : <Download/>}
                  </button>

                  {openMenus[item.id] && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {item.subItems.map((sub) => (
                        <li key={sub.id}>
                          {sub.subSubItems ? (
                            <>
                              <button
                                onClick={() => toggleSubmenu(item.id, sub.id)}
                                className="flex items-center justify-between w-full px-2 py-1 rounded hover:bg-gray-800 text-sm"
                              >
                                <span>{sub.label}</span>
                                {openSubmenus[`${item.id}-${sub.id}`] ? (
                                  <Download/>
                                ) : (
                                  <Download/>
                                )}
                              </button>
                              {openSubmenus[`${item.id}-${sub.id}`] && (
                                <ul className="ml-5 mt-1 space-y-1">
                                  {sub.subSubItems.map((subsub) => (
                                    <li key={subsub.id}>
                                      <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-700 text-xs">
                                        {subsub.label}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </>
                          ) : (
                            <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-800 text-sm">
                              {sub.label}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-700">
                  {item.icon}
                  {item.title}
                </button>
              )}
            </li>
          ))}

        </ul>
      </div>
      <Button style={{ width: '80%' }} onClick={() => setIsVisible(!isVisible)}>hola</Button>

    </div>
  );
};
