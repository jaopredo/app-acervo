import { AxiosResponse } from "axios"
import { SourceInterface } from "@/types/global/sources"

import GenericSource from "../sources/GenericSource"

import { DeleteRequestProps, GetRequestProps, PostRequestProps, PutRequestProps } from "@/types/api/sources"

/* TYPES */
import { GetAllServiceRequestProps } from "@/types/api/services"


export default class GenericService {
    private source: SourceInterface

    constructor() {
        this.source = new GenericSource
    }

    alias(value: string) {
        this.source.alias(value)
    }

    async getAll({page, filters}: GetAllServiceRequestProps = { page: 1, filters: {} }): Promise<AxiosResponse> {
        return await this.source.getAll(page || 1, filters).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }

    async get({ id, customHeader }: GetRequestProps): Promise<AxiosResponse> {
        return await this.source.get({id, customHeader}).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }

    async create<T>(props: PostRequestProps<T>) {
        return await this.source.post<T>(props).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }

    async delete(props: DeleteRequestProps) {
        return await this.source.delete(props).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }

    async put<T>(props: PutRequestProps<T>) {
        return await this.source.put(props).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }

    async patch<T>(props: PutRequestProps<T>) {
        return await this.source.patch(props).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }
}