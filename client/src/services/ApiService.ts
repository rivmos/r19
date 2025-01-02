import { AxiosRequestConfig, AxiosResponse } from "axios"
import BaseService from "./BaseServices"

const ApiService = {
    fetchData<Response, Request = Record<string, unknown>>(params: AxiosRequestConfig<Request>) {
        // return new Promise<AxiosResponse>((resolve, reject) => {
        //     BaseService(params).then((response: AxiosResponse) => {
        //         resolve(response);
        //     }).catch((errors) => {
        //         reject(errors)
        //     }) 
        // })
        return BaseService(params) as Promise<AxiosResponse<Response>>;
    }
}

export default ApiService;