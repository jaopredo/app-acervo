'use client'
import { AiOutlineLoading } from "react-icons/ai"

export default function Submit({ children, disabled }: {children: React.ReactNode, disabled: boolean}){

    return <button className="leaf-button w-full mb-3 flex items-center justify-center gap-4" disabled={disabled}>
        <span>{children}</span>
        {disabled && <AiOutlineLoading className="text-white animate-spin" />}
    </button>
}