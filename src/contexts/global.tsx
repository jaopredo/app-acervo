'use client'
import { createContext, useContext, ReactNode, useState } from "react"

// import { GlobalContextType } from '@/types'

/* API */
import GenericService from "@/api/services/GenericService"
import UserService from "@/api/services/UserService"

const defaultContextObject = {
    genericService: new GenericService,  // Serviço genérico
    userService: new UserService,  // Serviço de usuário
}


// Contexto global que vai ter as variáveis que mais vou usar no projeto
const GlobalContext = createContext<typeof defaultContextObject>(defaultContextObject)


// O Componente que fornece as variáveis
export function GlobalContextProvider({ children }: { children: ReactNode | ReactNode[] }) {
    // Estado que vai servir pro CONTEXT
    const [ contextObject, setContextObject ] = useState<typeof defaultContextObject>(defaultContextObject)
    // Digo se as variáveis ainda estão carregando

    return <GlobalContext.Provider value={contextObject}>
        {children}
    </GlobalContext.Provider>
}

export function useGlobalContext(): typeof defaultContextObject {
    return useContext(GlobalContext) as typeof defaultContextObject
}
