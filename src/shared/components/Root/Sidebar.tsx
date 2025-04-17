import { Box, Drawer, List } from '@mui/material';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { MenuModel } from '../../../router/models/MenuModel';
import ListItemLink from './ListItemLink';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  ...theme.mixins.toolbar
}));

const openedMixin = (theme: Theme, width: number): CSSObject => ({
  width: width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,  // Modo iconos
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,  // Modo iconos (más ancho en pantallas más grandes)
  },
});

interface Props {
  onClose: () => void,
  onPressedItem: () => void,
  items: MenuModel[],
  open: boolean,
  width: number,
  initWidthMobile: number,
  brandText: string,
  brandImagePath: string,
  brandIconPath: string,
}

const MenuList = ({ items, open, isHovering, onPressedItem }: {
  items: MenuModel[];
  open: boolean;
  isHovering: boolean;
  onPressedItem: (value: string) => void;
}) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItemLink
          key={`${item.key}-${index}`}
          item={item}
          open={open || isHovering}
          onPressedItem={onPressedItem}
        />
      ))}
    </List>
  );
};

export default function Sidebar(props: Props) {
  const {
    onClose,
    onPressedItem,
    items,
    open,
    width,
    initWidthMobile,
    brandImagePath,
    brandIconPath
  } = props;

  const theme = useTheme();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDrawerHover = () => {
    if (!open && screenWidth >= initWidthMobile) {
      setIsHovering(true);
    }
  };

  const handleDrawerLeave = () => {
    setIsHovering(false);
  };

  return (
    <Drawer
      open={open}
      variant={screenWidth < initWidthMobile ? 'temporary' : 'permanent'}
      onClose={onClose}
      onMouseEnter={handleDrawerHover}
      onMouseLeave={handleDrawerLeave}
      ModalProps={{
        keepMounted: screenWidth < initWidthMobile ? true : false
      }}
      sx={{
        position: 'absolute', // Sidebar está por encima del contenido
        zIndex: theme.zIndex.drawer + 1,
        width: width,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: 'width 0.3s ease', // Usamos una transición más explícita
        ...open || isHovering
          ? {
            ...openedMixin(theme, width),
            '& .MuiDrawer-paper': openedMixin(theme, width),
          }
          : {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          },
      }}
    >
      <DrawerHeader>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%',
            transition: 'width 0.3s ease'
          }}
        >
          {open || isHovering ? (
            <Box
              component='img'
              alt="Logo"
              width='120px'
              src={brandImagePath}
            />
          ) : (
            <Box
              component='img'
              alt="Logo"
              width='40px'
              src={brandIconPath}
            />
          )}
        </Box>
      </DrawerHeader>

      <MenuList
        items={items}
        open={open}
        isHovering={isHovering}
        onPressedItem={onPressedItem}
      />
    </Drawer>
  );
}