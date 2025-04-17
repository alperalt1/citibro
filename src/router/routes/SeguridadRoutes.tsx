import PrivateRoute from "../components/PrivateRoute";
import UsuarioExternoPage from '../../features/UsuarioExterno/Pages/UsuarioExternoPage';
import UsuarioInternoPage from '../../features/UsuarioInterno/Pages/UsuarioInternoPage';
import ErrorPage from '../../shared/components/Error/ErrorPage';
import { CustomRouteObject } from '../models/CustomRouteObjectModel';
import GestionarRolesPage from "../../features/Roles/Pages/GestionarRolesPage";

const SeguridadRoutes: CustomRouteObject[] = [
  {
    path: "/usuarios",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "externos",
        title: "Usuarios Externos",
        element: <UsuarioExternoPage />
      },
      {
        path: "internos",
        title: "Usuarios Internos",
        element: <UsuarioInternoPage />
      },
    ],
  },
  {
    path: "/roles",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "gestionar-roles",
        title: "Gestionar Roles",
        element: <GestionarRolesPage />
      },
    ],
  }
]

export default SeguridadRoutes;