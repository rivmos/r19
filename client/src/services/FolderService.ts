import ApiService from "./ApiService";

export const apiCreateOrUpdateFolder = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        method: 'post',
        url: '/folders',
        data
    })
}


export const apiDeleteFolder = async <T, U extends Record<string, unknown>>(params: U) => {
    return ApiService.fetchData<T>({
        method: 'delete',
        url: '/folders',
        params
    })
}

export const apiUploadFile = async <T, U extends Record<string, unknown>>(data: U) => {
    return ApiService.fetchData<T>({
        method: 'post',
        url: '/files/upload',
        headers: {
            "Content-Type": 'multipart/form-data'
        },
        data
    })
}