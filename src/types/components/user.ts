
export type UserRegister = {
    name: string,
	email: string,
	password: string,
	password_confirmation: string,
	cpf: string,
	registration: string,
	classroom_id: number
}


export type UserLogin = {
    email: string,
    password: string
}


export type UserAuthResponse = {
    status: string
    message: string,
    user: UserRegister
    authorisation: {
        type: string
        token: string
    }
}
