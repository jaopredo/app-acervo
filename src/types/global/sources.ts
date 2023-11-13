import { UserLogin, UserRegister } from "../components/user"

export interface SourceInterface {
    alias: (value: string) => void
    get: (id: number | undefined) => Promise<any>
    post: (data: any) => Promise<any>
    delete: (id: number) => Promise<any>
    patch: (id: number, data: any) => Promise<any>
    put: (id: number, data: any) => Promise<any>
}


export interface UserSourceInterface {
    register: (credentials: UserRegister) => Promise<any>
    login: (credentials: UserLogin) => Promise<any>
    logout: () => Promise<any>
}
