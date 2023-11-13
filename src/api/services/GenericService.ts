import { AxiosResponse } from "axios"
import { SourceInterface } from "@/types/global/sources"

import GenericSource from "../sources/GenericSource"


export default class GenericService {
    private source: SourceInterface

    constructor() {
        this.source = new GenericSource
    }

    alias(value: string) {
        this.source.alias(value)
    }

    async get(id: number | undefined = undefined) {
        return await this.source.get(id).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }

    async create(data: any) {
        return await this.source.post(data).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }

    async delete(id: number) {
        return await this.source.delete(id).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }

    async put(id: number, data: any) {
        return await this.source.put(id, data).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }

    async patch(id: number, data: any) {
        return await this.source.patch(id, data).then((response: AxiosResponse) => {
            return response.data
        }).catch((e: Error) => Promise.reject(e))
    }
}