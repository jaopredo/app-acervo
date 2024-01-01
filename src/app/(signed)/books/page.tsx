'use client'
import { useState, Children, useEffect, useMemo, useRef, ChangeEvent, RefObject } from 'react'
// import { useUpdateEffect } from 'usehooks-ts'
import Loading from './loading'
import Book from '@/components/Book'
import { useGlobalContext } from "@/contexts"
import { GetAllResponseType } from '@/types/api/response'
import { BookType } from '@/types/components/book'
import { TailSpin } from 'react-loader-spinner'


function useIsInViewport(ref: RefObject<any>) {
    const [ isIntersecting, setIsIntersecting ] = useState<boolean>(false)

    const observer = useMemo(()=>new IntersectionObserver(entries => {
        entries.forEach(entry => {
            setIsIntersecting(entry.isIntersecting)
        })
    }), [])

    useEffect(() => {
        observer.observe(ref.current)

        return () => {
            observer.disconnect()
        }
    }, [observer, isIntersecting])
    

    return isIntersecting
}

function LastLoadingElement({ handleIsInViewPort }: { handleIsInViewPort: Function }) {
    const loadingRef = useRef<HTMLLIElement>(null)

    const isInViewPort = useIsInViewport(loadingRef)

    useEffect(() => {
        handleIsInViewPort()
    }, [isInViewPort])

    return <li ref={loadingRef} className="mt-4 mb-4 p-4"><TailSpin
        height="40"
        width="40"
        color="#279D85"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass="w-full flex items-center justify-center"
        visible={true}
    /></li>
}


export default function Page() {
    const { genericService } = useGlobalContext()

    const [ filter, setFilter ] = useState<string>('')
    
    const [ searching, setSearching ] = useState<boolean>(false)

    const [ page, setPage ] = useState<number>(1)  // Página que indica quantos objetos já foram pesquisados
    const [ previousBooks, setPreviousBooks ] = useState<BookType[]>([])
    const [ booksObj, setBooksObj ] = useState<GetAllResponseType<BookType>|null>()  // Informações de paginação dos livros atuais


    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFilter(value)
        setSearching(true)
    }

    function handleIsInViewPort() {
        setPage(page+1)
    }

    useEffect(() => {
        genericService.alias('books').getAll<BookType>({ page, filters: {
            name: { like: filter }
        } }).then(resp => {
            setBooksObj(resp)
            setPreviousBooks([...previousBooks, ...resp.data])
            setSearching(false)
        })
    }, [ filter, page ])

    return <>
        <div className="
            sticky top-0 relative mb-10 z-50
        ">
            <div className="w-full h-7 block bg-leaf"/>
            <input
                className="
                    input rounded-md mb-3 border-2 border-leaf absolute top-3 left-1/2 -translate-x-1/2
                "
                placeholder="Pesquise pelo nome do livro"
                onChange={handleSearchChange}
            />
        </div>
        {(!searching && booksObj) && <>
            {booksObj.data.length>0 && <ul className="flex flex-col items-center justify-start overflow-auto gap-3 w-full">
                {Children.toArray(previousBooks.map(book => <Book {...book}/>))}
                <LastLoadingElement handleIsInViewPort={handleIsInViewPort}/>
            </ul>}
            {booksObj.data.length <= 0 && <p className='
                text-leaf font-bold text-center
            '>NENHUM LIVRO FOI ENCONTRADO</p>}
        </>}
        {searching && <Loading/>}
    </>
}