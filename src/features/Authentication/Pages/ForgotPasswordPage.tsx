import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ForgotPasswordFormModel, ResponseForgotPasswordModel } from '../Models/AuthModels';
import { CenteredContainer, FormSection, ImageSection, LoginImage, MyCard } from '../Components/ComponentsStyled';
import Logo from '../../../assets/images/logos/logo.png';
import illustration from '../../../assets/images/illustration/signin-illustration.png';
import AxiosHelper, { AxiosConfig } from '../../../services/AxiosHelper';
import { Divider } from '@mui/material';

const ForgotPasswordPage = () => {
  //const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === '') {
      return;
    }

    const data: ForgotPasswordFormModel = {
      username,
    };

    const config: AxiosConfig<ForgotPasswordFormModel> = {
      url: 'Seguridad/ForgotPassword',
      method: 'POST',
      data: data,
    };

    try {
      const response = await AxiosHelper.execute<ForgotPasswordFormModel, ResponseForgotPasswordModel>(config);

      if (response.status === 'success') {
        // dispatch(signIn({authenticated: true, token: response.data.token}));
        // navigate('/');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box sx={{ background: '#eef2f7' }}>
      <CenteredContainer>
        <MyCard>
          <ImageSection sx={{ backgroundColor: '#FFFFFF' }}>
            <img src={illustration} width="100%" alt="Login Icon" />
          </ImageSection>
          <Divider sx={{ my: 2, borderColor: '#e0e0e0', borderWidth: '1px' }} />
          <FormSection>
            <LoginImage src={Logo} alt="Login Icon" />
            <Typography variant="h6" component="h1" gutterBottom>
              Recuperar Contraseña
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
              Ingresa tu correo electrónico y te enviaremos un enlace de restablecimiento.
            </Typography>
            <TextField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
              label="Correo electrónico"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={username}
              sx={{ marginTop: 3 }}
            />
            <Button
              onClick={handleLogin}
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                backgroundColor: 'white', // Establece el fondo blanco
                border: '1px solid #626467', // Añade borde gris oscuro
                color: '#626467', // Establece el color del texto
                '&:hover': {
                  backgroundColor: ' #626467 ', // Color al pasar el mouse
                  color: 'white', // Cambia el color del texto al pasar el mouse
                  borderColor: ' #626467' // Cambia el color del borde al pasar el mouse
                }
              }}
              fullWidth
            >
              Enviar Enlace
            </Button>
          </FormSection>
        </MyCard>
      </CenteredContainer>
    </Box>
  );
};

export default ForgotPasswordPage;
