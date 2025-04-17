import { Box, Card, CardContent, Container, styled } from "@mui/material";

export const CenteredContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

export const MyCard = styled(Card)(({ theme }) => ({
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    height: 'calc(100vh - 100px)',
    [theme.breakpoints.down('sm')]: { // Cuando el ancho sea menor a 900px
        width: '100%',
    },
}));

interface ImageSectionProps {
    background?: string; // Prop opcional para el background
}

export const ImageSection = styled(Box)<ImageSectionProps>(({ theme, background = '#295fc2' }) => ({
    flex: '0 1 50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: background,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '0 35px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: { // Cuando el ancho sea menor a 900px
        display: 'none', // Ocultamos la imagen en pantallas pequeñas
    },
}));

export const FormSection = styled(CardContent)(({ theme }) => ({
    flex: '0 1 50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 50px 20px 50px',
    boxSizing: 'border-box',
    height: '100%',
    [theme.breakpoints.down('md')]: { // Cuando el ancho sea menor a 900px
        flex: 1,
        padding: '20px 80px 16px 80px',
    },
    [theme.breakpoints.down('sm')]: { // Cuando el ancho sea menor a 600px
        flex: 1,
        padding: '20px 20px 16px 20px',
    },
}));

export const LoginImage = styled('img')({
    width: '80px',
    height: '80px',
});
