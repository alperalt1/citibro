import React, { useState } from 'react';
import { Toolbar, IconButton, Typography, Menu, MenuItem, ListItemIcon, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from '../../../redux/Hooks';
import { signOut } from '../../../features/Authentication/redux/slices/AuthSlice';


interface MyAppBarProps {
  handleDrawerToggle: () => void;
  open: boolean;
  drawerWidth: number;
  titlePage: string;
  userName?: string;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
}

const MyAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth'
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  backgroundColor: 'white',
  [theme.breakpoints.up("sm")]: {
    marginLeft: `-${drawerWidth}px`,
    width: `100%`
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: `-${drawerWidth}px`,
    width: `calc(100% - ${theme.spacing(7)} + 1px)`,
  },
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    [theme.breakpoints.up("sm")]: {
      width: `100%`
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
  })
}));

const Navbar: React.FC<MyAppBarProps> = ({ handleDrawerToggle, open, drawerWidth, titlePage, userName = "" }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    dispatch(signOut());
  }

  return (
    <MyAppBar position="fixed" elevation={0} open={open} drawerWidth={drawerWidth}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="subtitle2" sx={{ color: 'black', flexGrow: 1 }}>
          {titlePage}
        </Typography>
        <Button 
          onClick={handleMenu}
          color='secondary'
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          startIcon={<AccountCircle />}
          style={{ textTransform: 'lowercase' }}
        >
          {userName}
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            Perfil
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </MyAppBar>
  );
};

export default Navbar;