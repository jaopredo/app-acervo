import axios, { AxiosRequestConfig } from "axios"
import API_CONFIG from "@/config/api"

/**
 * Classe de adaptador pois os métodos PATCH, DELETE, PUT E POST não funcionariam
 * no Laravel, então precisam ser adaptados aqui
 */
class APIInterfaceAdapter {
    private axiosInstance = axios.create({
        baseURL: API_CONFIG.url,
        headers: {
            Accept: 'application/json'
        }
    })

    async get(url: string, id: number | undefined = undefined, customHeader: AxiosRequestConfig<any> | undefined = undefined) {
        return this.axiosInstance.get(`/${url}/${id ?? ""}`, customHeader)
    }

    async post(url: string, data: any, customHeader: AxiosRequestConfig<any> | undefined = undefined) {
        return this.axiosInstance.post(`/${url}`, data, customHeader)
    }

    async delete(url: string, id: number, customHeader: AxiosRequestConfig<any> | undefined = undefined) {
        return this.axiosInstance.delete(`/${url}/${id}`, customHeader)
    }

    async put(url: string, id: number, data: any, customHeader: AxiosRequestConfig<any> | undefined = undefined) {
        return this.axiosInstance.post(`/${url}/${id}`, {...data, _method: 'PUT'}, customHeader)
    }

    async patch(url: string, id: number, data: any, customHeader: AxiosRequestConfig<any> | undefined = undefined) {
        return this.axiosInstance.post(`/${url}/${id}`, {...data, _method: 'PATCH'}, customHeader)
    }
}

const APIInterface = new APIInterfaceAdapter

export default APIInterface