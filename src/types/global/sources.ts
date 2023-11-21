import { UserLogin, UserRegister } from "../components/user"
import {
    DeleteRequestProps,
    GetRequestProps,
    PatchRequestProps,
    PostRequestProps,
    PutRequestProps
} from "@/types/api/sources"

export interface SourceInterface {
    alias: (value: string) => void
    getAll: (page: number, filters: any) => Promise<any>
    get: (props: GetRequestProps) => Promise<any>
    post: <T>(props: PostRequestProps<T>) => Promise<any>
    delete: (props: DeleteRequestProps) => Promise<any>
    patch: <T>(props: PatchRequestProps<T>) => Promise<any>
    put: <T>(props: PutRequestProps<T>) => Promise<any>
}


export interface UserSourceInterface {
    register: (credentials: UserRegister) => Promise<any>
    login: (credentials: UserLogin) => Promise<any>
    logout: () => Promise<any>
    verify: () => Promise<any>
}
