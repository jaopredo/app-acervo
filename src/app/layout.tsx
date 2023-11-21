import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/scss/global.scss'

import { GlobalContextProvider } from '../contexts/global'
import Errors from '@/components/alert/Errors'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aplicativo Acervo',
  description: 'Um aplicativo do multimeios',
}

declare global {
    interface WindowEventMap {
        'error-change-event': CustomEvent<{ initialArg: string }>
    }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <div className="interface">
                    <GlobalContextProvider>
                        {children}
                        <Errors/>
                    </GlobalContextProvider>
                </div>
            </body>
        </html>
    )
}
