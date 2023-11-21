import { AxiosRequestConfig } from "axios"

export interface GetRequestProps {
    // id: number
    customHeader?: AxiosRequestConfig<any>
}


export interface PostRequestProps<T> {
    data: T,
    customHeader?: AxiosRequestConfig<any>
}


export interface DeleteRequestProps {
    id: number,
    customHeader?: AxiosRequestConfig<any>
}


export interface PutRequestProps<T> {
    id: number,
    data: T
    customHeader?: AxiosRequestConfig<any>
}


export interface PatchRequestProps<T> {
    id: number,
    data: T
    customHeader?: AxiosRequestConfig<any>
}