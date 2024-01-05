'use client'
import axios, { AxiosInstance } from "axios"
import API_CONFIG from "@/config/api"
import {
    DeleteRequestProps,
    GetRequestProps,
    PatchRequestProps,
    PostRequestProps,
    PutRequestProps
} from "@/types/api/sources"
import LocalStorage from "@/storage"


interface APIINterfaceAdapterMethods {
    axiosInstance: AxiosInstance | null
    token: string | null

    setToken: (token: string) => void

    getAll: (url: string, page: number, filters: { [x: string]: { [y: string]: string } }) => Promise<any>
    get: (url: string, props: GetRequestProps) => Promise<any>
    post: <T>(url: string, props: PostRequestProps<T>) => Promise<any>
    delete: (url: string, props: DeleteRequestProps) => Promise<any>
    put: <T>(url: string, props: PutRequestProps<T>) => Promise<any>
    patch: <T>(url: string, props: PatchRequestProps<T>) => Promise<any>
}


/**
 * Classe de adaptador pois os métodos PATCH, DELETE, PUT E POST não funcionariam
 * no Laravel, então precisam ser adaptados aqui
 */
class APIInterfaceAdapter implements APIINterfaceAdapterMethods {
    public axiosInstance: AxiosInstance | null = null
    public token: string | null = null

    setToken(token: string) {
        if (this.axiosInstance) this.axiosInstance.defaults.headers.Authorization = `Bearer ${token}`
    }

    constructor () {
        const setInstance = async () => {
            const token = await LocalStorage.get('token')

            this.axiosInstance = axios.create({
                baseURL: API_CONFIG.url,
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
        }
        setInstance()
    }

    async getAll(url: string, page: number, filters: any) {
        return this.axiosInstance?.get(`/${url}/`, {
            params: {
                filters,
                page
            }
        })
    }

    async get(url: string, { customHeader, id }: GetRequestProps) {
        return this.axiosInstance?.get(`/${url}/${id?id:''}`, customHeader)
    }

    async post<T>(url: string, { data, customHeader }: PostRequestProps<T>) {
        return this.axiosInstance?.post(`/${url}`, data, customHeader)
    }

    async delete(url: string, { id, customHeader }: DeleteRequestProps) {
        return this.axiosInstance?.delete(`/${url}/${id}`, customHeader)
    }

    async put<T>(url: string, { id, data, customHeader }: PutRequestProps<T>) {
        return this.axiosInstance?.post(`/${url}/${id}`, {...data, _method: 'PUT'}, customHeader)
    }

    async patch<T>(url: string, { id, data, customHeader }: PatchRequestProps<T>) {
        return this.axiosInstance?.post(`/${url}/${id}`, {...data, _method: 'PATCH'}, customHeader)
    }
}

const APIInterface = new APIInterfaceAdapter

export default APIInterface