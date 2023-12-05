'use client'
import { useGlobalContext } from '@/contexts'

export default function Page({ params: {id: number} }) {
	return <>
		{params.id}
	</>
}
 