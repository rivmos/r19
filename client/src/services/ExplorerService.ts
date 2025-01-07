import ApiService from "./ApiService";

export const apiGetExplorer = async <T, U extends Record<string, unknown>>(params: U) => {
    return ApiService.fetchData<T>({
        method: 'get',
        url: '/',
        params
    })
}