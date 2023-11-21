'use client'
import { ReactNode } from "react"
import { useEffectOnce } from "usehooks-ts"
import { useRouter } from "next/navigation"
import { useGlobalContext } from "@/contexts"
// import APIInterface from "@/api"

export default function MiddlewaresProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const { auth: { token }, userService } = useGlobalContext()

    async function authMiddleware() {
        const resp = await userService.verify()
        if (!resp) {
            router.push('/auth/login')
        }
    }

    
    /* EXECUTANDO */
    useEffectOnce(() => {
        authMiddleware()
    })

    return <>
        {children}
    </>
}
