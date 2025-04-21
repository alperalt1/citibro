import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/Hooks";
import { MenuModel } from "./router/models/MenuModel";
import { useEffect, useState } from "react";

import { CircularProgressAbsolute } from "./shared/components/CircularProgressAbsolute";
import { jwtDecode } from "jwt-decode";
import { PermisosRepository } from "./features/Permisos/Repositories/PermisosRepository";
import { setPermissions, signOut } from "./features/Authentication/redux/slices/AuthSlice";
import SignInPage from "./features/Authentication/Pages/SignInPage";
import DashboardPage from "./features/Dashboard/Pages/DashboardPage";
import { UserCotizacion } from "./features/Cotizacion/Pages/UserCotizacion";
import { UserCotizacionCatalogo } from "./features/Cotizacion/Pages/UserCotizacionCatalogo";
import { Cotizacion } from "./features/Cotizacion/Pages/Cotizacion";

const { getMenuSideBar } = PermisosRepository();

interface JwtPayload {
  sub: string;
  exp: number;
  role: string;
  identificador: string;
}

const fetchAllowedPage = async () => {
  try {
    const token = localStorage.getItem("CitibrokersAccessToken") as string;
    const decoded = jwtDecode<JwtPayload>(token);
    const menu = await getMenuSideBar(decoded.identificador);
    return menu.data;
  } catch (error) {
    return [];
  }
}

const createPermissions = (items: MenuModel[]): Record<string, string[]> => {
  const permisos: Record<string, string[]> = {};

  const traverse = (items: MenuModel[]) => {
    items.forEach(item => {
      if (item.funcionalMethods.length > 0) {
        permisos[item.key] = item.funcionalMethods.map(permiso => permiso.nombrePermiso);
      }
      if (item.subMenu.length > 0) {
        traverse(item.subMenu);
      }
    });
  };

  traverse(items);
  return permisos;
};


function App() {
  const dispatch = useAppDispatch();
  const { authenticated, permissions } = useAppSelector((state) => state.auth);
  const [menu, setMenu] = useState<MenuModel[]>([]);
  const [routesReady, setRoutesReady] = useState(false);

  useEffect(() => {
    console.log(menu)
    const fetch = async () => {
      if (authenticated && permissions === null) {
        const menu = await fetchAllowedPage(); // Consulta las rutas permitidas
        if (menu?.length == 0) {
          alert("No tienes permisos para acceder al sistema.");
          dispatch(signOut());
        } else {
          const permisos = createPermissions(menu);
          dispatch(setPermissions(permisos))
          setMenu(menu);
          setRoutesReady(true);
        }
      } else if (!authenticated) {
        setRoutesReady(false); // Reinicia el estado de las rutas si el usuario no está autenticado
      }
    };
    fetch();
  }, [authenticated, permissions?.length]);

  if (authenticated && !routesReady) {
    return <CircularProgressAbsolute />;
  }

  // const router = createDynamicRouter(menu);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignInPage />
    },
    {
      path: '/dashboard',
      element: <DashboardPage />
    },
    {
      path: '/usercotizacion',
      element: <UserCotizacion />
    },
    {
      path: '/catalog-user-cotizacion',
      element: <UserCotizacionCatalogo />
    },
    {
      path: '/cotizacion',
      element: <Cotizacion />
    },

  ]);
  return <RouterProvider router={router} />;
}

export default App
