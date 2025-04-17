// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Box, Button, TextField, Typography } from '@mui/material';
// import { CenteredContainer, FormSection, ImageSection, LoginImage, MyCard } from '../Components/ComponentsStyled';
// import Logo from '../../../assets/images/logos/logo.png';
// import illustration from '../../../assets/images/illustration/signin-illustration.png';
// import { Divider } from '@mui/material';
// import { showAlertAsync } from '../../../shared/components/SweetAlert';
// import { LoginFactorAutenticacion } from '../Models/AuthModels';
// import { AuthenticationRepository } from '../Repositories/AuthenticationRepository';
// import { useAppDispatch } from '../../../redux/Hooks';
// import { signIn } from '../../../redux/slices/AuthSlice';

const ValidarTwoFactorAuthenticator = () => {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { state } = location;
  // const usuario = state?.usuario;

  // const [codigoVerificacion, setCodigoVerificacion] = useState<string>('');
  // const {
  //   validarFactorAutenticacion,
  // } = AuthenticationRepository();

  // useEffect(() => {
  //   if (usuario === null || usuario == undefined) {
  //     navigate('/');
  //     return;
  //   }
  // }, [])

  // const handleLogin = async () => {
  //   try {
  //     if (codigoVerificacion.length == 0 || codigoVerificacion == undefined) {
  //       await showAlertAsync({
  //         toast: true,
  //         time: 2500,
  //         position: 'top-end',
  //         title: "Error",
  //         icon: "error",
  //         html: "Codigo de verificación es obligatorio"
  //       });
  //       return;
  //     }

  //     const data: LoginFactorAutenticacion = {
  //       usuario: usuario,
  //       codigoFactorAutenticacion: codigoVerificacion,
  //     };

  //     const response = await validarFactorAutenticacion(data);
  //     if (response.status === 'success' && response.data.respuesta.esExitosa) {
  //       let resultado = response.data.resultado;
  //       dispatch(signIn({ 
  //         authenticated: true, 
  //         accessToken: resultado?.jwt?.accessToken ?? "",
  //         resfreshToken: resultado?.jwt?.refreshToken ?? "", 
  //       }));
        
  //       navigate('/');
  //     } else {
  //       await showAlertAsync({
  //         toast: true,
  //         time: 2500,
  //         position: 'top-end',
  //         title: "Error",
  //         icon: "error",
  //         html: response.data.respuesta.mensaje
  //       });
  //     }
  //   } catch (error) {
  //     await showAlertAsync({
  //       toast: true,
  //       time: 2500,
  //       position: 'top-end',
  //       title: "Error",
  //       icon: "error",
  //       html: "El api no devolvió el resultado adecuado"
  //     });
  //   }
  // };

  // return (
  //   <Box sx={{ background: '#eef2f7' }}>
  //     <CenteredContainer>
  //       <MyCard>
  //         <ImageSection sx={{ backgroundColor: '#FFFFFF' }}>
  //           <img src={illustration} width="100%" alt="Login Icon" />
  //         </ImageSection>
  //         <Divider sx={{ my: 2, borderColor: '#e0e0e0', borderWidth: '1px' }} />
  //         <FormSection>
  //           <LoginImage src={Logo} alt="Login Icon" />
  //           <Typography variant="h6" component="h1" gutterBottom>
  //             Sensia.
  //           </Typography>
  //           <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
  //             Valida tu Inicio de Sesión
  //           </Typography>
  //           <TextField
  //             label="Usuario"
  //             variant="outlined"
  //             margin="normal"
  //             fullWidth
  //             required
  //             disabled
  //             value={usuario}
  //             sx={{
  //               marginTop: 3,
  //               '& .MuiOutlinedInput-root': {
  //                 '& fieldset': {
  //                   borderColor: '#626467', // Establece el color del borde
  //                 },
  //                 '&:hover fieldset': {
  //                   borderColor: '#626467', // Cambia el color del borde al pasar el mouse
  //                 },
  //                 '&.Mui-focused fieldset': {
  //                   borderColor: '#626467', // Cambia el color del borde cuando está enfocado
  //                 }
  //               }
  //             }}
  //           />
  //           <TextField
  //             onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCodigoVerificacion(event.target.value)}
  //             label="Codigo Verificación"
  //             variant="outlined"
  //             margin="normal"
  //             fullWidth
  //             required
  //             value={codigoVerificacion}
  //             sx={{
  //               marginTop: 3,
  //               '& .MuiOutlinedInput-root': {
  //                 '& fieldset': {
  //                   borderColor: '#626467', // Establece el color del borde
  //                 },
  //                 '&:hover fieldset': {
  //                   borderColor: '#626467', // Cambia el color del borde al pasar el mouse
  //                 },
  //                 '&.Mui-focused fieldset': {
  //                   borderColor: '#626467', // Cambia el color del borde cuando está enfocado
  //                 }
  //               }
  //             }}
  //           />

  //           <Button
  //             onClick={handleLogin}
  //             type="submit"
  //             variant="outlined" // Cambié a 'outlined' para tener bordes
  //             color="secondary" // Cambié a 'secondary' para tener color rojo
  //             sx={{
  //               mt: 2,
  //               backgroundColor: 'white', // Establece el fondo blanco
  //               border: '1px solid #626467', // Añade borde gris oscuro
  //               '&:hover': {
  //                 backgroundColor: ' #626467 ', // Color al pasar el mouse
  //                 color: 'white', // Cambia el color del texto al pasar el mouse
  //                 borderColor: ' #626467' // Cambia el color del borde al pasar el mouse
  //               }
  //             }}
  //             fullWidth
  //           >
  //             Confirmar Inicio Sesión
  //           </Button>

  //         </FormSection>
  //       </MyCard>
  //     </CenteredContainer>
  //   </Box>
  // );
};

export default ValidarTwoFactorAuthenticator;
