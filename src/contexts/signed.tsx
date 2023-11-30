'use client'
import { createContext, useContext, ReactNode, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'
import LocalStorage from '@/storage'


interface SignedContextType {
	auth: {
		token: '',
		user: ''
	}
}


const SignedContext = createContext<SignedContextType|null>(null)

export function SignedContextProvider({ children }: { children: ReactNode }) {
	const [ contextObject, setContextObject ] = useState<SignedContextType|null>(null)

	useEffectOnce(() => {
        async function getData() {
        	const [ token, user ] = await Promise.all([
        		LocalStorage.get('token'),
        		LocalStorage.get('user')
        	])
        	
            // Coloco o contexto global
            setContextObject({
                auth: {
                	token,
                	user
                }
            })
        }
        getData()
    })

	return <SignedContext.Provider value={contextObject}>
		{ children }
	</SignedContext.Provider>
}

export function useSignedContext(): SignedContextType {
	return useContext(SignedContext) as SignedContextType
}