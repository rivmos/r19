import ApiService from "./ApiService";


export const apiDownloadFile = async <T, U extends Record<string, unknown>>(params: U) => {
    return ApiService.fetchData<T>({
        url:`/files/download/${params.id}`,
        method:'get',
        responseType:'blob'
    })
} 