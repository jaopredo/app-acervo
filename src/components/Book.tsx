'use client'
import { BookType } from '@/types/components/book'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useEffectOnce } from 'usehooks-ts'

export default function Book(props: BookType) {
	const router = useRouter()
	const [ state, setState ] = useState<'available'|'unavailable'|'scheduled'>('available')

	function handleBookClick() {
		router.push(`/books/${props.id}`)
	}

	useEffectOnce(() => {
		if (props.reserves.length > 0) setState('scheduled')
		if (props.loans.length > 0) setState('unavailable')
	})

	return <li onClick={handleBookClick} className="flex items-center justify-center shadow-md w-[90%] h-40 p-3 rounded-md active:scale-95 transition-all relative">
		<div
			className={`
				bg-[url(http://4.bp.blogspot.com/-I_jGdp4dC78/U2vDgAzSUQI/AAAAAAAAC6I/_aPl5i811Sw/s1600/imagem.jpg)]
				h-full
				w-24
				bg-norepeat
				bg-cover
			`}
		/>
		<div className="flex-grow flex flex-col h-full p-3">
			<h1 className="font-bold">{props.name}</h1>
			<p className="text-sm">Autor(a): {props.author}</p>
			<p className="text-sm">Publicado em: {props.publication}</p>
			<p className="text-sm">Páginas: {props.pages}</p>
			<BookState state={state}/>
		</div>
	</li>
}


function BookState({ state }: { state: 'available'|'unavailable'|'scheduled' }) {
	return <div className={state}>
		{ state=='available'?'Disponível':state=='unavailable'?'Indisponível':'Agendado' }
	</div>
}