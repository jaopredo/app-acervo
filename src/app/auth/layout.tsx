import { ReactNode } from 'react'
import AnimationWrapper from '@/components/layout/AnimationWrapper'

export default function Layout({ children }: { children: ReactNode | ReactNode[] }) {
    return <AnimationWrapper>
        {children}
    </AnimationWrapper>
}
