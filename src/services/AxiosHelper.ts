import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosClient } from './AxiosClient';
import { AxiosException } from '../app/Errors/Exceptions';
import { jwtDecode } from "jwt-decode";
import { RespuestaGenericaConsultaDto } from '../shared/models/RespuestaGenericaModel';
import { JwtDto } from '../features/Authentication/Models/AuthModels';

export interface ResponseData<T> {
  data: T
  status: 'success' | 'Error',
  message: string
}

export interface AxiosConfig2<T> {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: T,
  params?: Record<string, any>,
  contentType?: string,
}

export interface AxiosConfig3<T> { //para pruebas de login
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: T,
  params?: Record<string, any>,
  contentType?: string,
}

export interface AxiosConfig {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
  params?: Record<string, any>,
  contentType?: string,
}

export default class AxiosHelper {
  private static token: string | null = null;

  private static initialize() {
    if (!AxiosHelper.token) {
      AxiosHelper.token = localStorage.getItem("CitibrokersAccessToken");
    }
  }

  public static execute = async <RequestT, ResponseT>(request: AxiosConfig2<RequestT>): Promise<ResponseData<ResponseT>> => {
    try {
      AxiosHelper.initialize();

      const config: AxiosRequestConfig = {
        method: request.method,
        url: request.url,
        headers: {
          'Content-Type': request.contentType ?? 'application/json',
        },
        params: request.params // Añadir parámetros de consulta si los hay
      };

      if (request.data) {
        config.data = request.data;
      }

      if (AxiosHelper.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${AxiosHelper.token}`;
      }

      const response: AxiosResponse<ResponseT> = await axiosClient(config);

      const result: ResponseData<ResponseT> = {
        data: response.data,
        message: response.statusText,
        status: response.status >= 200 ? 'success' : 'Error'
      };

      return result;

    } catch (error) {
      throw new Error(AxiosException(error));
    }
  }

  public static executeWithToken = async <RequestT, ResponseT>(
    request: AxiosConfig2<RequestT>,
    token: string
  ): Promise<ResponseData<ResponseT>> => {
    try {
      const config: AxiosRequestConfig = {
        method: request.method,
        url: request.url,
        headers: {
          'Content-Type': request.contentType ?? 'application/json',
          Authorization: `Bearer ${token}`, // Usar el token proporcionado
        },
        params: request.params,
      };

      if (request.data) {
        config.data = request.data;
      }

      const response: AxiosResponse<ResponseT> = await axiosClient(config);

      const result: ResponseData<ResponseT> = {
        data: response.data,
        message: response.statusText,
        status: response.status >= 200 ? 'success' : 'Error',
      };

      return result;

    } catch (error) {
      throw new Error(AxiosException(error));
    }
  }

  public static async fetch<ResponseT = any>(request: AxiosConfig2<any>): Promise<ResponseT> {
    try {
      const config: AxiosRequestConfig = {
        url: request.url,
        method: request.method,
        headers: await this.buildHeaders(request.contentType),
        params: request.params,
        data: request.data,
      };

      const response = await axiosClient<ResponseT>(config);

      return response.data; // Retornar directamente los datos de la API
    } catch (error: any) {
      throw this.handleError(error); // Manejo de errores limpio
    }
  }

  private static async buildHeaders(contentType?: string): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': contentType ?? 'application/json',
    };

    let token = localStorage.getItem('CitibrokersAccessToken');
    if (token) {
      token = await ValidarJwtTokenExpiracion(token);
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private static handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'An error occurred';
      return new Error(message);
    }

    return new Error('An unexpected error occurred');
  }

  static close = () => {
    localStorage.setItem("CitibrokersAccessToken", '');
    window.location.href = '/auth/signin';
  }
}

async function ValidarJwtTokenExpiracion(token: string) {
  const decodedToken: any = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000;
  if (expirationTime < Date.now()) {
    const refreshToken = localStorage.getItem('CitibrokersRefreshToken');
    const data = {
      refreshToken: refreshToken
    };
    var response = await axiosClient.post<RespuestaGenericaConsultaDto<JwtDto>>("Login/refresh-token", data);
    if (response.status == 200 && response.data.respuesta.esExitosa) {
      localStorage.setItem("CitibrokersAccessToken", response.data.resultado?.accessToken ?? "");
      localStorage.setItem("CitibrokersRefreshToken", response.data.resultado?.refreshToken ?? "");

      token = response.data.resultado?.accessToken ?? "";
    } else {
      // Limpiamos el token actual
      localStorage.setItem("CitibrokersAccessToken", '');
      localStorage.setItem("CitibrokersRefreshToken", '');

      throw new Error(AxiosException('Error al refrescar el token'));
    }
  }

  return token;
}
