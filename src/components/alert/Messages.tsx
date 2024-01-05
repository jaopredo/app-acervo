'use client'
import { useEffect, useState } from "react"
import { IoIosCloseCircle } from "react-icons/io"
import { motion, AnimatePresence } from 'framer-motion'
import { useEventListener } from "usehooks-ts"


export default function Messages() {
    const [ message, setMessage ] = useState<string>()
    const [ visible, setVisible ] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, 5000)
    }, [message])


    useEventListener('success-message-event', (event: CustomEvent) => {
        setVisible(true)
        setMessage(event.detail.message)
    })

    return <AnimatePresence>{ visible && <motion.div
        className="fixed w-[90%] text-center md:w-fit bottom-24 bg-emerald-300 text-emerald-800 font-bold p-2 rounded-md flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        {message}
    </motion.div>}</AnimatePresence>
}
