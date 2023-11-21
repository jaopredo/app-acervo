'use client'
import { useGlobalContext } from "@/contexts"

export default function Page() {
    const { auth: { token } } = useGlobalContext()

    return <>
        <p>TESTE PAGINA LIVROS</p>

        <button onClick={()=>{
            console.log(token)
        }} className="leaf-button">
            TESTE
        </button>
    </>
}