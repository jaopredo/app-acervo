'use client'
import Link from "next/link"
import { IoBook } from 'react-icons/io5'
import AnimationWrapper from "@/components/layout/AnimationWrapper"

export default function Home() {
    return <AnimationWrapper>
        <section className="flex items-center justify-center flex-col">
            <IoBook className="text-leaf w-32 h-auto"/>
            <h1 className="text-leaf text-2xl font-bold">Bem-vindo ao Multimeios!</h1>
            <h2 className="text-leaf text-lg font-bold mb-4">O que deseja fazer?</h2>
            <ul className="flex items-center justify-evenly w-full gap-2">
                <li><Link className="night-button" href="register">CRIAR CONTA</Link></li>
                <li><Link className="night-button" href="login">LOGIN</Link></li>
            </ul>
        </section>
    </AnimationWrapper>
}
