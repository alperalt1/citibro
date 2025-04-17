import { useState, useEffect } from 'react';
import { Box, Toolbar, useTheme } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { MenuModel } from '../../../router/models/MenuModel';
import { jwtDecode } from "jwt-decode";
import Navbar from './Navbar';
import Logo from '../../../assets/images/logos/logo-marca.png';
import MyIcon from '../../../assets/images/logos/logo_citikold_icon.png';

const drawerWidth = 240;

interface JwtPayload {
  sub: string;
  exp: number;
  userName: string;
}

interface Props {
  sidebarItemList?: MenuModel[],
  routeTitleMap?: Record<string, string>,
}

const Root: React.FC<Props> = ({ sidebarItemList = [], routeTitleMap = {}}) => {
  const location = useLocation();
  const theme = useTheme();
  
  const [open, setOpen] = useState(window.innerWidth >= 900);
  const [userName, setUserName] = useState<string>("");

  const [titlePage, setTitlePage] = useState<string>("");

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const initWidthMobile = 900;

  const contentMarginLeft = open && screenWidth >= initWidthMobile 
    ? drawerWidth 
    : !open && screenWidth >= initWidthMobile 
      ? 65 
      : 0;

  useEffect(() => {
    const token = localStorage.getItem("CitibrokersAccessToken") as string;
    const decoded = jwtDecode<JwtPayload>(token);
    setUserName(decoded.userName)
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const newTitle = routeTitleMap[location.pathname] || "Página desconocida";
    setTitlePage(newTitle);
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setOpen(prev => !prev); // Para evitar problemas de sincronización
  };

  const handleCloseDrawerMobile = () => {
    if (screenWidth < initWidthMobile) {
      setOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', padding: 0 }}>

      {/* Navbar */}
      <Navbar 
        open={open} 
        drawerWidth={drawerWidth} 
        titlePage={titlePage} 
        handleDrawerToggle={handleDrawerToggle}
        userName={userName}
      />
      {/* End Navbar */}

      {/* Sidebar */}
      <Sidebar
        onClose={handleDrawerToggle}
        onPressedItem={handleCloseDrawerMobile}
        items={sidebarItemList}
        open={open}
        width={drawerWidth}
        initWidthMobile={initWidthMobile}
        brandText=''
        brandImagePath={Logo}
        brandIconPath={MyIcon}
      />
      {/* End Sidebar */}

      {/* MainContent */}
      <Box
        component="main"
        sx={{
          backgroundColor: `${theme.palette.background.default}`,
          flexGrow: 1,
          minHeight: '100vh',
          marginLeft: `${contentMarginLeft}px`,
          padding: '0 20px',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      {/* End MainContent */}

    </Box>
  );
}

export default Root;
