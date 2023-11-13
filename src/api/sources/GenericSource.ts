import APIInterface from ".."
import { SourceInterface } from "../../types/global/sources"

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

    // Método GET
    async get(id: number | undefined = undefined) {
        try {
            // Exemplo -> APIInterface.get('books', 2)
            return await APIInterface.get(this.route, id)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }


    async post(data: any) {
        try {
            return await APIInterface.post(this.route, data)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }


    async delete(id: number) {
        try {
            return await APIInterface.delete(this.route, id)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }


    async put(id: number, data: any) {
        try {
            return await APIInterface.put(this.route, id, data)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }


    async patch(id: number, data: any) {
        try {
            return await APIInterface.patch(this.route, id, data)
        } catch (err) {
            return {
                message: "error"
            }
        }
    }
}
