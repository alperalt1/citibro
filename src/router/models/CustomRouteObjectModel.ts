import { RouteObject } from "react-router-dom";

export type CustomRouteObject = RouteObject & {
    title?: string;
    children?: CustomRouteObject[];
};