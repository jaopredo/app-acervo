import APIInterface from ".."
import { SourceInterface } from "../../types/global/sources"
import {
    DeleteRequestProps,
    GetRequestProps,
    PatchRequestProps,
    PostRequestProps,
    PutRequestProps
} from "@/types/api/sources"
import ErrorStorage from "@/storage/error"

export default class GenericSource implements SourceInterface {
    route: string = ""  // Propriedade que diz a rota

    // Setter para evitar que coloquem rotas erradas
    alias(value: string) {
        this.route = value
    }
    
    // Método GET ALL
    async getAll(page: number, filters: any): Promise<any> {
        return await APIInterface.getAll(this.route, page, filters).catch(err => {
            ErrorStorage.add(err)
            return err
        })
    }

    // Método GET
    async get(props: GetRequestProps) {
        return await APIInterface.get(this.route, props).catch(err => {
            ErrorStorage.add(err)
            return err
        })
    }


    async post<T>(props: PostRequestProps<T>) {
        return await APIInterface.post(this.route, props).catch(err => {
            ErrorStorage.add(err)
            return err
        })
    }


    async delete(props: DeleteRequestProps) {
        return await APIInterface.delete(this.route, props).catch(err => {
            ErrorStorage.add(err)
            return err
        })
    }


    async put<T>(props: PutRequestProps<T>) {
        return await APIInterface.put(this.route, props).catch(err => {
            ErrorStorage.add(err)
            return err
        })
    }


    async patch<T>(props: PatchRequestProps<T>) {
        return await APIInterface.patch(this.route, props).catch(err => {
            ErrorStorage.add(err)
            return err
        })
    }
}
