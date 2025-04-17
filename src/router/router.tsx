import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from 'react-router-dom';
import { MenuModel } from "./models/MenuModel";
import AuthRoutes from "./routes/AuthRoutes";
import PrivateRoute from "./components/PrivateRoute";
import RutasFueraDelMenu from "./routes/RutasFueraDelMenu";
import { CustomRouteObject } from "./models/CustomRouteObjectModel";
import { PrivateRoutes, RoutesForTitlePage } from "./config";
import AccountRoutes from "./routes/AccountRoutes";

const createAllowedPages = (items: MenuModel[], parentPath: string = '', acumPages: string[] = []): string[] => {
  items.forEach(item => {
    const fullPath = `${parentPath}/${item.ruta}`.replace(/\/+/g, '/');
    if (item.subMenu.length > 0) {
      createAllowedPages(item.subMenu, fullPath, acumPages);
    } else {
      acumPages.push(fullPath);
    }
  });
  return acumPages;
};

// Filtra las rutas permitidas basándose en allowedPages
const filterRoutes = (
  routes: RouteObject[],
  allowedPages: string[],
  parentPath: string = ''
): { filteredRoutes: RouteObject[]; fullPaths: string[] } => {
  const acum: RouteObject[] = [];
  const fullPaths: string[] = [];

  for (const route of routes) {
    const fullPath = `${parentPath}/${route.path ?? ''}`.replace(/\/+/g, '/').toLowerCase();

    // Filtrar hijos recursivamente
    const { filteredRoutes: filteredChildren, fullPaths: childFullPaths } = route.children?.length
      ? filterRoutes(route.children, allowedPages, fullPath)
      : { filteredRoutes: [], fullPaths: [] };

    // Verificar si la ruta actual o alguno de sus hijos es permitido
    const isAllowed = allowedPages.includes(fullPath) || filteredChildren.length > 0;

    if (isAllowed) {
      acum.push({
        path: route.path,
        element: route.element,
        errorElement: route.errorElement,
        children: filteredChildren,
      });

      // Si es permitido, agregar el fullPath a la lista
      fullPaths.push(fullPath);
    }

    // Agregar los fullPaths de los hijos
    fullPaths.push(...childFullPaths);
  }

  return { filteredRoutes: acum, fullPaths };
};

//Filtra el menú basándose en las rutas permitidas
const filterMenu = (menu: MenuModel[], validPaths: string[], parentPath = ''): MenuModel[] => {
  return menu.map((item) => {
      const fullPath = `${parentPath}/${item.ruta ?? ''}`.replace(/\/+/g, '/').toLowerCase();

      if (item.tipo === 'SU') {
        //Verificar si el fullPath está en los validPaths
        if (validPaths.includes(fullPath)) {
          return { ...item, subMenu: [] }; // Mantener solo elementos válidos
        }
        return null; // Eliminar si no es válido
      } else if (item.subMenu?.length) {
        //Filtrar submenús recursivamente
        const filteredSubMenu = filterMenu(item.subMenu, validPaths, fullPath);
        return filteredSubMenu.length > 0 ? { ...item, subMenu: filteredSubMenu } : null;
      }

      return null; // Eliminar elementos no válidos
    })
    .filter((item): item is MenuModel => item !== null); // Filtrar nulos
};

const buildRouteTitleMap = (routes: CustomRouteObject[], parentPath = ""): Record<string, string> => {
  const routeTitleMap: Record<string, string> = {};

  routes.forEach((route) => {
    const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, "/");
    if (route.title) {
      routeTitleMap[fullPath] = route.title;
    }

    if (route.children) {
      Object.assign(routeTitleMap, buildRouteTitleMap(route.children, fullPath));
    }
  });

  return routeTitleMap;
};

const createDynamicRouter = (menu: MenuModel[])  => {
  // Creamos una lista de string que contendrá las rutas a partir del menú que llega del API
  const allowedPages = menu.length > 0 ? createAllowedPages(menu): [];

  // Con allowedPages filtramos las rutas privadas, el objetivo es que de todas las rutas 
  // privadas, tomar solo las rutas que coincidan con las enviadas desde el API
  // Filtrar las rutas privadas y obtener el menú filtrado
  let { filteredRoutes, fullPaths } = filterRoutes(PrivateRoutes, allowedPages);

  // Filtrar el menú usando los fullPaths generados
  const filteredMenu = filterMenu(menu, fullPaths);
  const routeTitleMap = buildRouteTitleMap(RoutesForTitlePage);

  filteredRoutes = [...filteredRoutes, ...AccountRoutes];

  // A las rutas privadas es necesario enviarle el menú para crear el sidebar y además 
  // hay que enviarle las rutas con sus títulos (routeTitleMap), esto permitirá que al cambiar una ruta
  // el título de la página se cambie también
  const routes: CustomRouteObject[] = [
    ...AuthRoutes,
    ...filteredRoutes.map((item) => ({
      ...item,
      element: <PrivateRoute menu={filteredMenu} routeTitleMap={routeTitleMap} />,
    })),
    ...RutasFueraDelMenu.map((item) => ({
      ...item,
      element: <PrivateRoute menu={filteredMenu} routeTitleMap={routeTitleMap} />,
    })),
  ];

  return createBrowserRouter(routes);
}

export default createDynamicRouter;