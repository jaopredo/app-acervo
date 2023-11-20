import { ReactNode } from "react"
import { useRouter } from "next/navigation"

import { IoCaretBack } from "react-icons/io5"

interface GoBackButtonProps {
    children?: ReactNode,
    className?: string,
}

export default function GoBack({ children, className }: GoBackButtonProps) {
    const router = useRouter()

    function handleIconClick() {
        router.back()
    }

    return <div onClick={handleIconClick} className="flex items-center justify-center gap-2">
        <IoCaretBack className={className}/>
        {children}
    </div>
}
