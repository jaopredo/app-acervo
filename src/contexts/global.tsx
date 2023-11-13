'use client'
import { createContext, useContext, ReactNode } from "react"
import { GlobalContextType } from '@/types'

/* API */
import GenericService from "@/api/services/GenericService"
import UserService from "@/api/services/UserService"

const contextObject = {
    genericService: new GenericService,
    userService: new UserService
}

const GlobalContext = createContext<GlobalContextType>(contextObject)

export function GlobalContextProvider({ children }: { children: ReactNode | ReactNode[] }) {
    return <GlobalContext.Provider value={contextObject}>
        {children}
    </GlobalContext.Provider>
}

export function useGlobalContext(): typeof contextObject {
    return useContext(GlobalContext) as typeof contextObject
}
