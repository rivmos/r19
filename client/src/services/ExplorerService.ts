import ApiService from "./ApiService";

export const apiGetExplorer = async <T, U extends Record<string, unknown>>(params: U) => {
    return ApiService.fetchData<T>({
        method: 'get',
        url: '/',
        params
    })
}


export const apiDeleteMultiple = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        method: 'delete',
        url: '/',
        data
    })
}

export const apiDownloadMultiple = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        method: 'post',
        url: '/download',
        data,
        responseType: 'blob'
    })
}