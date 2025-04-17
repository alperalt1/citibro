import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../redux/api/ApiConfig";
import { LoginInputModel, LoginResponseModel } from "../Models/LoginModels";
import { AuthenticationApiUrls } from "./AuthenticationUrl";
import { environment } from "../../../environments";

export const AuthenticationRepository = createApi({
    reducerPath: "authentication",
    baseQuery,
    tagTypes: ['Authentication'],
    endpoints: (builder) => ({
        iniciarSesion: builder.mutation<LoginResponseModel, LoginInputModel>({
            query: (data) => ({
                url: AuthenticationApiUrls.iniciarSesion,
                method: 'POST',
                body: data,
                headers: {
                    'APP-CODE': environment.appCode,
                }
            }),
        })
    })
})

export const { useIniciarSesionMutation } = AuthenticationRepository;