'use client'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '@/contexts'

/* TYPES */
import { BookType } from '@/types/components/book'
import { ReservePostType } from '@/types/components/reserve'
import Loading from '../loading'

export default function Page({ params }: { params: { id: number }}) {
	const { genericService } = useGlobalContext()
	const [ disableReserve, setDisableReserve ] = useState<boolean>(false)
	const [ book, setBook ] = useState<BookType>()


	function handleReserveClick() {
		genericService.alias('reserves').create<ReservePostType>({
			data: {
				book_id: (book?.id as number)
			}
		}).then(resp => {
			if (resp) {
				window.dispatchEvent(new CustomEvent('success-message-event', {
					detail: {
						message: 'O livro foi reservado com sucesso! Você deve buscá-lo AMANHÃ, ou poderá sofrer uma penalidade',
						type: 'success'
					}
				}))
				setDisableReserve(true)
			}
		})
	}


	useEffect(()=>{
		genericService.alias('books').get<BookType>({ id: params.id }).then(
			resp => {
				setBook(resp.data)
				setDisableReserve(resp.data.reserves.length>0)
			}
		)
	}, [])

	return book?<>
		<header className='mt-3 flex flex-col items-center justify-center'>
			<p
			className={
				'p-4 md:w-[60%] w-[90%] text-center rounded-md border font-bold ' +
				(book.reserves.length>0?'bg-yellow-300 border-yellow-500 text-yellow-600':'bg-emerald-400 border-emerald-600 text-emerald-900')
			}
			>
				{book.reserves.length>0?'O livro já foi agendado, volte depois para ver se a pessoa foi buscar ou não!':'O livro está disponível'}
			</p>
		</header>
		<section className='bg-white md:w-[90%] md:m-auto md:mt-3 mt-4 md:p-3 flex md:flex-row flex-col items-center justify-center gap-3'>
			<div
				className={`
					bg-[url(http://4.bp.blogspot.com/-I_jGdp4dC78/U2vDgAzSUQI/AAAAAAAAC6I/_aPl5i811Sw/s1600/imagem.jpg)] 
					bg-no-repeat bg-cover bg-center h-96 md:w-1/4 w-[80%] md:h-[70vh]
				`}>
			</div>
			<section className="flex flex-col items-center justify-center">
				<h1 className='text-2xl font-extrabold text-emerald-950'>{book.name}</h1>
				<p className='p-3'>{book.description}</p>
				<article className='w-full mb-3 gap-3 flex flex-col items-center justify-center'>
					<table className='w-[95%]'>
						<tbody>
							<tr>
								<td className='title'>Autor</td><td>{book.author}</td>
							</tr>
							<tr>
								<td className='title'>Editora</td><td>{book.editor}</td>
							</tr>
							<tr>
								<td className='title'>Páginas</td><td>{book.pages}</td>
							</tr>
							<tr>
								<td className='title'>Exemplar</td><td>{book.example}</td>
							</tr>
							<tr>
								<td className='title'>Ano de Publicação</td><td>{book.publication}</td>
							</tr>
						</tbody>
					</table>
					<button onClick={handleReserveClick} className='leaf-button' disabled={disableReserve}>RESERVAR LIVRO</button>
				</article>
			</section>
		</section>
	</>:<Loading/>
}
 