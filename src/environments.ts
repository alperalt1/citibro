export const environment = {
    isDev: import.meta.env.DEV as boolean,  
    apiUrl: import.meta.env.VITE_API_URL as string,
    appCode: import.meta.env.VITE_APP_CODE as string,
    appName: import.meta.env.VITE_APP_NAME as string,
    ownerNum: import.meta.env.VITE_OWNER_NUM as string,
}
