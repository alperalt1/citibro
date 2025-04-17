import ErrorPage from '../../shared/components/Error/ErrorPage';
import SignInPage from "../../features/Authentication/Pages/SignInPage";
import PublicRoute from "../components/PublicRoute";
import SelectCountryPage from "../../features/Authentication/Pages/SelectCountry";
import ForgotPasswordPage from '../../features/Authentication/Pages/ForgotPasswordPage';
import CreateNewPasswordPage from '../../features/Authentication/Pages/CreateNewPasswordPage';
import ValidarTwoFactorAuthenticator from '../../features/Authentication/Pages/Verificar2FASignInPage';
import { CustomRouteObject } from '../models/CustomRouteObjectModel';

const AuthRoutes: CustomRouteObject[] = [
  {
    path: "/",
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "select-country",
        title: "Seleccionar País",
        element: <SelectCountryPage />,
      },
      {
        path: "/",
        title: "Inicio de Sesión",
        element: <SignInPage />,
      },
      {
        path: "forgot-password",
        title: "Contraseña Olvidada",
        element: <ForgotPasswordPage />,
      },
      {
        path: "create-new-password",
        title: "Crear una Nueva Contraseña",
        element: <CreateNewPasswordPage />,
      },
      {
        path: "validate-two-factor-authenticator",
        title: "Validar Inicio de Sesión",
        element: <ValidarTwoFactorAuthenticator />,
      },
    ],
  },
]

export default AuthRoutes;