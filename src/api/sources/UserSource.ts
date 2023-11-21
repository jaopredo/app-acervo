import APIInterface from ".."
import ErrorStorage from "@/storage/error"

/* TYPES */
import { UserLogin, UserRegister } from "@/types/components/user"
import { UserSourceInterface } from "@/types/global/sources"

export default class UserSource implements UserSourceInterface {
    async register(credentials: UserRegister): Promise<any> {
        return await APIInterface.post<UserRegister>('register', { data: credentials }).catch(err => {
            ErrorStorage.add(err)
            return err
        })
    }

    async login(credentials: UserLogin): Promise<any> {
        return await APIInterface.post<UserLogin>('login', { data: credentials }).catch(err => {
            ErrorStorage.add(err)
            return err
        })
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
