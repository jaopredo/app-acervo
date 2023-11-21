'use client'
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"

/* ICONS */
import { IoMdPerson } from "react-icons/io"
import { FaLock } from "react-icons/fa"

/* COMPONENTS */
import Input from "@/components/inputs/Input"
import Password from "@/components/inputs/Password"
import GoBack from "@/components/layout/GoBack"

/* STORAGE */
import LocalStorage from "@/storage"

/* CONTEXTS */
import { useGlobalContext } from "@/contexts"

/* TYPES */
import { UserLogin } from "@/types/components/user"

export default function Page() {
    const methods = useForm<UserLogin>()
    const router = useRouter()
    const { handleSubmit } = methods
    const { userService } = useGlobalContext()

    const onSubmit: SubmitHandler<UserLogin> = credentials => {
        async function login() {
            const resp = await userService.login(credentials)
            if (resp) {
                Promise.all([
                    LocalStorage.save('token', resp.authorisation.token),
                    LocalStorage.save('user', resp.user)
                ])
                router.push('/signed/books')
            }
        }
        login()
    }

    return <div>
        <div className="flex items-center justify-center">
            <GoBack className='w-6 h-6 text-leaf'/>
            <h1 className="text-leaf font-bold text-xl">Fazer login</h1>
        </div>

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name="email"
                    label="Email: "
                    validation={{ required: true }}
                    type="email"
                    placeholder="Digite seu email"
                    Icon={IoMdPerson}
                />
                <Password
                    name="password"
                    label="Senha: "
                    validation={{ required: true }}
                    placeholder="Digite sua senha"
                    Icon={FaLock}
                />

                <button type="submit" className="leaf-button w-full mb-3">LOGIN</button>
                <Link href='/auth/forgot-password'
                    className="text-leaf underline mt-2 active:text-leaf-darker">
                    Esqueceu a senha?
                </Link>
            </form>
        </FormProvider>
    </div>
}