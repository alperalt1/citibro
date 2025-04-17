import { ResponseData } from "../../../services/AxiosHelper";

export interface IBaseRepository<T, U> {
    save(data: U): Promise<ResponseData<T>>;
    update(data: U): Promise<ResponseData<T>>;
    delete(id: number): Promise<ResponseData<boolean>>;
    getAll(): Promise<ResponseData<T[]>>;
    getById(id: number): Promise<ResponseData<T>>;
    GetDataAllByFilter(filterDataDynamic: Record<string, string | number | boolean | null> | any): Promise<ResponseData<T[]>>;
  }
  