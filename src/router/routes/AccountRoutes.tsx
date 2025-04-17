import ErrorPage from '../../shared/components/Error/ErrorPage';
import PrivateRoute from '../components/PrivateRoute';
import { CustomRouteObject } from '../models/CustomRouteObjectModel';

const AccountRoutes: CustomRouteObject[] = [
  {
    path: "/cuenta",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "perfil",
        title: "Perfil",
        element: <h6>Perfil</h6>,
      },
    ],
  },
];

export default AccountRoutes;
