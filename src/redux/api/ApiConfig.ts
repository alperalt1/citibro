import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { environment } from "../../environments";

export const baseQuery = fetchBaseQuery({
    baseUrl: environment.apiUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("CitibrokersAccessToken");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
})