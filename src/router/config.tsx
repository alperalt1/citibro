import { RouteObject } from "react-router-dom";
import AccountRoutes from "./routes/AccountRoutes";
// import DocumentosRoutes from "./routes/DocumentosRoutest";
// import FinancieroRoutes from "./routes/FinancieroRoutes";
import SeguridadRoutes from "./routes/SeguridadRoutes";
import RutasFueraDelMenu from "./routes/RutasFueraDelMenu";
// import MantenimientoRoutest from "./routes/MantenimientoRoutest.tsx";

export const PrivateRoutes: RouteObject[] = [
    // ...MantenimientoRoutest,
    ...SeguridadRoutes,
    // ...DocumentosRoutes,
    // ...FinancieroRoutes,
];

// Crea un Record<string, string> donde la key es 
// la ruta y el value es el título
// esto sirve para el título de las páginas
export const RoutesForTitlePage = [
    // ...MantenimientoRoutest,
    ...AccountRoutes,
    // ...DocumentosRoutes,
    // ...FinancieroRoutes,
    ...SeguridadRoutes,
    ...RutasFueraDelMenu,  
];