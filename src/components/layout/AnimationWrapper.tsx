'use client'
import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnimationWrapper({ children }: { children: ReactNode | ReactNode[] }) {
    return <AnimatePresence mode='wait'>
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        key={"pageFade"}
    >
        {children}
    </motion.div>
    </AnimatePresence>
}
