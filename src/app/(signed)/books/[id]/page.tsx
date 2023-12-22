'use client'
import { useGlobalContext } from '@/contexts'

export default function Page({ params }: { params: { id: number }}) {
	return <>
		{params.id}
	</>
}
 