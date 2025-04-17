import axios, { AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const APP_CODE = import.meta.env.VITE_APP_CODE;
const APP_NAME = import.meta.env.VITE_APP_NAME;
const OWNER_NUM = import.meta.env.VITE_OWNER_NUM;

export const axiosClient: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}api/`,
  headers: { 
    "APP-CODE": APP_CODE || 'DefaultAppName',
    "APP-NAME": APP_NAME || 'DefaultAppName',
    "OWNER-NUM": OWNER_NUM || 'DefaultOwner',
  }
});