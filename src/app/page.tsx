'use client'
// import Image from 'next/image'
import Link from "next/link"

export default function Home() {
    return <>
            <h1>Landing Page</h1>
            <ul>
                <li><Link href="auth/register">REGISTRAR</Link></li>
                <li><Link href="auth/login">LOGIN</Link></li>
            </ul>
    </>
}
