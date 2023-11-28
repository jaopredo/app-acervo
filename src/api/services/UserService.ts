import UserSource from "../sources/UserSource"

import { UserLogin, UserRegister, UserAuthResponse } from "@/types/components/user"
import { UserSourceInterface } from "@/types/global/sources"
import type { AxiosResponse } from "axios"

export default class UserService {
    private source: UserSourceInterface

    constructor() {
        this.source = new UserSource
    }

    setToken(token: string) {
        this.source.setToken(token)
    }

    async register(credentials: UserRegister): Promise<UserAuthResponse> {
        return await this.source.register(credentials)
        .then((response: AxiosResponse) => response.data)
        .catch((err) => Promise.reject(err))
    }

    async login(credentials: UserLogin): Promise<UserAuthResponse> {
        return await this.source.login(credentials)
        .then((response: AxiosResponse) => response.data)
        .catch((err) => Promise.reject(err))
    }

    async logout() {
        return await this.source.logout()
        .then((response: AxiosResponse) => response.data)
        .catch((err) => Promise.reject(err))
    }

    async verify() {
        return await this.source.verify()
        .then((response: AxiosResponse) => response.data)
        .catch((err) => Promise.reject(err))
    }
}
