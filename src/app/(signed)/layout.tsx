'use client'
import { usePathname } from "next/navigation"
import { SignedContextProvider } from '@/contexts'
import AnimationWrapper from '@/components/layout/AnimationWrapper'

/* CONFIGS */
import NAVIGATOR_CONFIG from "@/config/navigator"

/* COMPONENTS */
import Navigator from "@/components/layout/Navigator"

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <SignedContextProvider>
            <section className="flex flex-col items-center justify-center h-screen">
                <AnimationWrapper className="flex-grow flex flex-col items-stretch w-full overflow-y-auto relative">
                    {children}
                </AnimationWrapper>
                <Navigator
                    options={NAVIGATOR_CONFIG}
                    pathname={pathname}
                />
            </section>
        </SignedContextProvider>
    )
}
