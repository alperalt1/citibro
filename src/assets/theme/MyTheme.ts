// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d6efd', // Color primario
      contrastText: '#ffffff', // Color del texto para botones, etc.
    },
    secondary: {
      main: '#6c757d', // Color secundario
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc3545',
    },
    warning: {
      main: '#ffc107',
    },
    info: {
      main: '#17a2b8',
    },
    success: {
      main: '#28a745',
    },
    background: {
      default: '#f8f9fa', // Fondo principal
      paper: '#ffffff', // Fondo para tarjetas y modales
    },
    text: {
      primary: '#212529', // Color de texto principal
      secondary: '#6c757d', // Color de texto secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Define una fuente personalizada
    h1: { fontSize: '2.5rem', fontWeight: 500 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    body1: { fontSize: '1rem', color: '#212529' },
  },
});

export default theme;
