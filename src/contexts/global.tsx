'use client'
import { createContext, useContext, ReactNode, useState } from "react"
import { useEffectOnce } from "usehooks-ts"

// import { GlobalContextType } from '@/types'

/* API */
import GenericService from "@/api/services/GenericService"
import UserService from "@/api/services/UserService"

/* STORAGE */
import LocalStorage from "@/storage"

/* TYPES */
import { UserRegister } from "@/types/components/user"
interface GlobalContextType {
    genericService: GenericService,
    userService: UserService,

    auth: {
        token: string,
        user: UserRegister
    }
}


// Contexto global que vai ter as variáveis que mais vou usar no projeto
const GlobalContext = createContext<GlobalContextType | null>(null)


// O Componente que fornece as variáveis
export function GlobalContextProvider({ children }: { children: ReactNode | ReactNode[] }) {
    // Estado que vai servir pro CONTEXT
    const [ contextObject, setContextObject ] = useState<GlobalContextType | null>(null)
    // Digo se as variáveis ainda estão carregando
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    useEffectOnce(() => {
        async function getData() {
            // Checo se eu possui token ou usuário
            const [ token, user ] = await Promise.all([
                LocalStorage.get('token'),
                LocalStorage.get('user')
            ])
            
            // Coloco o contexto global
            setContextObject({
                genericService: new GenericService,  // Serviço genérico
                userService: new UserService,  // Serviço de usuário
                auth: {
                    token,  // Token
                    user  // Usuário
                }
            })

            setIsLoading(false)  // Digo que não está mais carregando
        }
        getData()
    })

    return <GlobalContext.Provider value={contextObject}>
        {!isLoading && children}
    </GlobalContext.Provider>
}

export function useGlobalContext(): GlobalContextType {
    return useContext(GlobalContext) as GlobalContextType
}
