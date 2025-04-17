import PrivateRoute from "../components/PrivateRoute";
import ErrorPage from '../../shared/components/Error/ErrorPage';
import { DynamicComponent } from '../../features/Catalogos/Pages/DynamicComponent';
import TipoProveedorRepository from '../../features/Catalogos/Repository/TipoProveedorRepository';
import { JsonConainerCatalogs } from '../../features/Catalogos/JsonDynamic/JsonConainerCatalogs';
import { CustomRouteObject } from '../models/CustomRouteObjectModel';


const tipoProveedorRepository = new TipoProveedorRepository();

const CatalogoDinamicoRoutes: CustomRouteObject[] = [
  {
    path: "/catalogos",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "tipo-provedor",
        element: <DynamicComponent
          repositoryInterface={tipoProveedorRepository}
          viewName={'Tipo Proveedor'}
          dynamicDataJsonDefault={JsonConainerCatalogs.tipoProveedorDynamic} />
      },
      {
        path: "tipo-cliente",
        element: <DynamicComponent
          repositoryInterface={tipoProveedorRepository}
          viewName={'Tipo Cliente'}
          dynamicDataJsonDefault={JsonConainerCatalogs.tipoProveedorDynamic} />
      },
    ],
  },
]

export default CatalogoDinamicoRoutes;