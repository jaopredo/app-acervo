import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/scss/global.scss'
import { GlobalContextProvider } from '../contexts/global'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aplicativo Acervo',
  description: 'Um aplicativo do multimeios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <GlobalContextProvider>
                    <div className="interface">
                        {children}
                    </div>
                </GlobalContextProvider>
            </body>
        </html>
    )
}
