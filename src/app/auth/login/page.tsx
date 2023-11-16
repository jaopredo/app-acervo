'use client'
import { useForm, SubmitHandler } from "react-hook-form"

/* CONTEXTS */
import { useGlobalContext } from "@/contexts"

/* TYPES */
import { UserLogin } from "@/types/components/user"

export default function Page() {
    const { register, handleSubmit } = useForm<UserLogin>()
    const { userService } = useGlobalContext()

    const onSubmit: SubmitHandler<UserLogin> = credentials => {
        async function login() {
            const resp = await userService.login(credentials)
        }
        login()
    }

    return <div>
        <h1>FAZER LOGIN</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" {...register('email', { required: true })} />
            </div>
            <div>
                <label htmlFor="password">Senha: </label>
                <input type="password" id="password" {...register('password', { required: true })} />
            </div>
            <button>LOGIN</button>
        </form>
    </div>
}