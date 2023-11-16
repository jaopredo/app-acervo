import APIInterface from ".."

/* TYPES */
import { UserLogin, UserRegister } from "@/types/components/user"
import { UserSourceInterface } from "@/types/global/sources"

export default class UserSource implements UserSourceInterface {
    async register(credentials: UserRegister): Promise<any> {
        try {
            return await APIInterface.post<UserRegister>('register', { data: credentials })
        } catch(err) {
            return {
                message: "Error"
            }
        }
    }

    async login(credentials: UserLogin): Promise<any> {
        try {
            return await APIInterface.post<UserLogin>('login', { data: credentials })
        } catch(err) {
            return {
                message: "Error"
            }
        }
    }

    async logout(): Promise<any> {
        try {
            return await APIInterface.post('logout', { data: {} })
        } catch(err) {
            return {
                message: "Error"
            }
        }
    }
}
