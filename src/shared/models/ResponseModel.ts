export interface ResponseModel<T> {
    status: 'success' | 'error' | 'incomplete' | 'Success' | 'Error' | 'Incomplete',
    data: T,
    message: string,
}