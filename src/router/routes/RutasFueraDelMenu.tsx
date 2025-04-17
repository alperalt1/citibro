import PrivateRoute from "../components/PrivateRoute";
import ErrorPage from '../../shared/components/Error/ErrorPage';
import PermisosPage from '../../features/Permisos/Pages/PermisosPage';
import { CustomRouteObject } from '../models/CustomRouteObjectModel';

const RutasFueraDelMenu: CustomRouteObject[] = [
  {
    path: "/roles",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "permisos",
        title: "Permisos",
        element: <PermisosPage />
      },
    ],
  },
]

export default RutasFueraDelMenu;