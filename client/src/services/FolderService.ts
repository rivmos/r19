import ApiService from "./ApiService";

export const apiGetAllFolders = async <T>() => {
    return ApiService.fetchData<T>({
        method: 'get',
        url: '/folders'
    })
}

export const apiCreateOrUpdateFolder = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        method: 'post',
        url: '/folders',
        data
    })
}


export const apiDeleteFolder = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        method: 'delete',
        url: '/folders',
        params:data
    })
}