'use client'
import { useEffect, useRef, useState } from "react"
import { IoIosCloseCircle } from "react-icons/io"
import { motion, AnimatePresence } from 'framer-motion'
import { useEventListener } from "usehooks-ts"

import ErrorStorage from "@/storage/error"

export default function Errors() {
    const [ errors, setErrors ] = useState<string[]>([])
    const [ visible, setVisible ] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, 5000)
    }, [errors])


    useEventListener('error-change-event', (event: Event) => {
        setVisible(true)
        async function getErrors() { 
            setErrors(await ErrorStorage.get())
        }
        getErrors()
    })


    return <AnimatePresence>{ visible && <motion.div
        className="fixed bottom-24 bg-rose-200 text-white font-bold p-2 rounded-md flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <IoIosCloseCircle className="text-rose-500 w-5 h-5"/>
        <div className="flex flex-col">
            <h2 className="text-rose-800 font-bold">Algo deu errado!</h2>
            <ul className="list-disc flex flex-col justify-center">
                {errors.map((msg, idx) => <li key={idx} className="text-rose-700 text-sm">{msg}</li>)}
            </ul>
        </div>
    </motion.div> }</AnimatePresence>
}
