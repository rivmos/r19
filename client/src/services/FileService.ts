import ApiService from "./ApiService";


export const apiDownloadFile = async <T, U extends Record<string, unknown>>(params: U) => {
    return ApiService.fetchData<T>({
        url:`/files/download/${params.id}`,
        method:'get',
        responseType:'blob'
    })
} 

export const apiUpdateFile = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        method: 'post',
        url: '/files',
        data
    })
}

export const apiDeleteFile = async <T, U extends Record<string, unknown>>(params: U) => {
    return ApiService.fetchData<T>({
        method: 'delete',
        url: '/files',
        params
    })
}