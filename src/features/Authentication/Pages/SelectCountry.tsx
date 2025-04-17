import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box, useMediaQuery, useTheme, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import BanderEcuador from "../../../assets/images/banderas/bandera_ecuador.png";
import BanderPeru from "../../../assets/images/banderas/bandera_peru.png";

// Estilo para las cartas con un box-shadow más pronunciado, animación de hover y cursor
const StyledCard = styled(Card)({
  border: 'none',
  borderRadius: '16px',
  width: 200,
  transition: 'transform 0.3s, box-shadow 0.3s',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Box-shadow inicial
  cursor: 'pointer', // Cambia el cursor a pointer
  '&:hover': {
    transform: 'scale(1.05)', // Aumenta el tamaño al pasar el mouse
    boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.4)', // Box-shadow más grande al hover
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

// Componente principal
const SelectCountryPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detecta pantallas pequeñas
  const navigate = useNavigate(); // hook para navegar

  // Función para manejar el clic en una carta
  const handleCardClick = (countryName: string) => {
    navigate(`/signin?country=${countryName}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      gap={4} 
      sx={{ background: '#eef2f7' }}
    >
      {/* Título y subtítulo */}
      <Box textAlign="center" sx={{mt: '60px'}}>
        <Typography variant="h4" gutterBottom>
          Citikold Comercial
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Selecciona el país al que perteneces
        </Typography>
      </Box>

      {/* Contenedor de las cartas */}
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'} // Cambia la dirección según el tamaño de pantalla
        gap={4}
        alignItems="center"
      >
        {/* Carta 1 */}
        <StyledCard onClick={() => handleCardClick('Ecuador')}>
          <CardMedia
            component="img"
            alt="Imagen 1"
            height="140"
            image={BanderEcuador}
          />
          <CardContent>
            <Typography variant="h6" align="center">
              Ecuador
            </Typography>
          </CardContent>
        </StyledCard>

        {/* Divider vertical */}
        {!isMobile && (
          <Divider orientation="vertical" sx={{ height: '80px' }} />
        )}

        {/* Carta 2 */}
        <StyledCard onClick={() => handleCardClick('Perú')}>
          <CardMedia
            component="img"
            alt="Imagen 2"
            height="140"
            image={BanderPeru}
          />
          <CardContent>
            <Typography variant="h6" align="center">
              Perú
            </Typography>
          </CardContent>
        </StyledCard>
      </Box>
    </Box>
  );
};

export default SelectCountryPage;
