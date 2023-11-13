import APIInterface from ".."

/* TYPES */
import { UserLogin, UserRegister } from "@/types/components/user"
import { UserSourceInterface } from "@/types/global/sources"

export default class UserSource implements UserSourceInterface {
    async register(credentials: UserRegister): Promise<any> {
        try {
            return await APIInterface.post('register', credentials)
        } catch(err) {
            return {
                message: "Error"
            }
        }
    }

    async login(credentials: UserLogin): Promise<any> {
        try {
            return await APIInterface.post('login', credentials)
        } catch(err) {
            return {
                message: "Error"
            }
        }
    }

    async logout(): Promise<any> {
        try {
            return await APIInterface.post('logout', {})
        } catch(err) {
            return {
                message: "Error"
            }
        }
    }
}
