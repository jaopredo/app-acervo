'use client'
import { usePathname } from "next/navigation"

/* CONFIGS */
import NAVIGATOR_CONFIG from "@/config/navigator"

/* COMPONENTS */
import Navigator from "@/components/layout/Navigator"

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return <section className="flex flex-col items-center justify-center h-screen">
        <div className="flex-grow flex flex-col items-stretch justify-center">{children}</div>
        <Navigator
            options={NAVIGATOR_CONFIG}
            pathname={pathname}
        />
    </section>
}
