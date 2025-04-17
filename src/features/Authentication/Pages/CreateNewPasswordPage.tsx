// import { useEffect, useState } from 'react';
// import { useAppDispatch } from '../../../redux/Hooks';

// import { useLocation, useNavigate } from 'react-router-dom';
// import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
// import { ResultadoLogin, CreateNewPasswordModel } from '../Models/AuthModels';
// import { CenteredContainer, FormSection, ImageSection, LoginImage, MyCard } from '../Components/ComponentsStyled';
// import Logo from '../../../assets/images/logos/logo.png';
// import illustration from '../../../assets/images/illustration/signin-illustration.png';
// import AxiosHelper, { AxiosConfig } from '../../../services/AxiosHelper';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { Divider } from '@mui/material';
// import { signIn } from '../redux/slices/AuthSlice';


const CreateNewPasswordPage = () => {
  // const dispatch = useAppDispatch(); 
  // const navigate = useNavigate();
  // const [password1, setPassword1] = useState<string>('');
  // const [password2, setPassword2] = useState<string>('');
  // const [showPassword1, setShowPassword1] = useState<boolean>(false);
  // const [showPassword2, setShowPassword2] = useState<boolean>(false);

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const token = queryParams.get('token');

  // useEffect(() => {
  //   if(token === null || token === ''){
  //     navigate(`/`);
  //   }

  //   // aquí hay que verificar la validez del token
  // }, []);

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if(password1 === '' || password2 === ''){
  //     alert('Complete todos los campos');
  //     return;
  //   }

  //   if(password1 !== password2){
  //     alert('Las contraseñas no son iguales');
  //     return;
  //   }

  //   const data: CreateNewPasswordModel = {
  //     password: password1,
  //     token: token ?? ""
  //   }

  //   const config: AxiosConfig<CreateNewPasswordModel> = {
  //     url: 'Seguridad/CreateNewPassword',
  //     method: 'POST',
  //     data: data
  //   }

  //   try {
  //     const response = await AxiosHelper.execute<CreateNewPasswordModel, ResultadoLogin>(config);

  //     if(response.status == 'success'){
  //       dispatch(signIn({authenticated: true, accessToken: response.data.token}));
  //       navigate('/');
  //     }

  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // const handleClickShowPassword1 = () => {
  //   setShowPassword1((prev) => !prev);
  // };

  // const handleClickShowPassword2 = () => {
  //   setShowPassword2((prev) => !prev);
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
  //             Crear Nueva Contraseña
  //           </Typography>
  //           <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
  //             Por favor ingresa tus credenciales para continuar.
  //           </Typography>
  //           <TextField
  //             onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword1(event.target.value)}
  //             label="Nueva Contraseña"
  //             type={showPassword1 ? 'text' : 'password'}
  //             variant="outlined"
  //             margin="normal"
  //             fullWidth
  //             required
  //             value={password1}
  //             sx={{
  //               '& .MuiInputBase-root': {
  //                 padding: 0,
  //               },
  //             }}
  //             slotProps={{
  //               input: {
  //                 endAdornment: (
  //                   <IconButton
  //                     aria-label="toggle password visibility"
  //                     onClick={handleClickShowPassword1}
  //                     sx={{ position: 'absolute', right: 5 }}
  //                   >
  //                     {showPassword1 ? <VisibilityOff /> : <Visibility />}
  //                   </IconButton>
  //                 ),
  //               },
                
  //             }}
  //           />
  //           <TextField
  //             onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword2(event.target.value)}
  //             label="Repite tu contraseña"
  //             type={showPassword2 ? 'text' : 'password'}
  //             variant="outlined"
  //             margin="normal"
  //             fullWidth
  //             required
  //             value={password2}
  //             sx={{
  //               '& .MuiInputBase-root': {
  //                 padding: 0,
  //               },
  //             }}
  //             slotProps={{
  //               input: {
  //                 endAdornment: (
  //                   <IconButton
  //                     aria-label="toggle password visibility"
  //                     onClick={handleClickShowPassword2}
  //                     sx={{ position: 'absolute', right: 5 }}
  //                   >
  //                     {showPassword2 ? <VisibilityOff /> : <Visibility />}
  //                   </IconButton>
  //                 ),
  //               },
                
  //             }}
  //           />
  //           <Button
  //             onClick={handleLogin}
  //             type="submit"
  //             variant="contained"
  //             color="primary"
  //             sx={{ mt: 2, backgroundColor: '#626467', '&:hover': { backgroundColor: '#626467' } }} // Cambia los colores aquí
  //             fullWidth
  //           >
  //             Guardar contraseña
  //           </Button>
  //         </FormSection>
  //       </MyCard>
  //     </CenteredContainer>
  //   </Box>
  // );
};

export default CreateNewPasswordPage;
