'use client'
import { ReactNode } from "react"
import { useEffectOnce } from "usehooks-ts"
import { useRouter, usePathname } from "next/navigation"
import { useGlobalContext, useSignedContext } from "@/contexts"
import LocalStorage from '@/storage'
// import APIInterface from "@/api"

export default function MiddlewaresProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const { userService } = useGlobalContext()


    async function authMiddleware() {
        const resp = await userService.verify()
        console.log(resp)
        // if (!resp) {
        //     router.push('/login')
        // }
    }

    async function guestMiddleware() {
        LocalStorage.get('token').then(resp => {
            if (resp) {
                router.push('/books')
            }
        })
    }
    
    /* EXECUTANDO */
    useEffectOnce(() => {
        authMiddleware()
        guestMiddleware()
    })

    return <>
        {children}
    </>
}
