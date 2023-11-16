import APIInterface from ".."
import { SourceInterface } from "../../types/global/sources"
import {
    DeleteRequestProps,
    GetRequestProps,
    PatchRequestProps,
    PostRequestProps,
    PutRequestProps
} from "@/types/api/sources"

export default class GenericSource implements SourceInterface {
    route: string = ""  // Propriedade que diz a rota

    // Setter para evitar que coloquem rotas erradas
    alias(value: string) {
        // if (possibleAlias.indexOf(value) != -1) {
            this.route = value
        // } else {
        //     throw Error
        // }
    }
    
    // Método GET ALL
    async getAll(page: number, filters: any): Promise<any> {
        try {
            return await APIInterface.getAll(this.route, page, filters)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }

    // Método GET
    async get(props: GetRequestProps) {
        try {
            return await APIInterface.get(this.route, props)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }


    async post<T>(props: PostRequestProps<T>) {
        try {
            return await APIInterface.post(this.route, props)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }


    async delete(props: DeleteRequestProps) {
        try {
            return await APIInterface.delete(this.route, props)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }


    async put<T>(props: PutRequestProps<T>) {
        try {
            return await APIInterface.put(this.route, props)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }


    async patch<T>(props: PatchRequestProps<T>) {
        try {
            return await APIInterface.patch(this.route, props)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }
}
