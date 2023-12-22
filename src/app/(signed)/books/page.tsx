'use client'
import { Suspense, lazy, useState, Children, useEffect, useMemo, useRef } from 'react'
// import { useUpdateEffect } from 'usehooks-ts'
import Loading from './loading'
import Book from '@/components/Book'
import { useGlobalContext } from "@/contexts"
import { GetAllResponseType } from '@/types/api/response'
import { useWindowSize } from 'usehooks-ts'
import { TailSpin } from 'react-loader-spinner'


function useIsInViewport(ref: any, setDebug: Function) {
    const [ isIntersecting, setIsIntersecting ] = useState<boolean>(false)

    const observer = useMemo(()=>new IntersectionObserver(entry => {
        // setIsIntersecting(entry.isIntersecting)
        console.log(ref.current)
        console.log(entry)
    }), [])

    useEffect(() => {
        observer.observe(ref.current)

        return () => {
            observer.disconnect()
        }
    }, [observer, isIntersecting])
    

    return isIntersecting
}


export default function Page() {
    const { genericService } = useGlobalContext()

    const [ filter, setFilter ] = useState<string>('')
    
    const [ searching, setSearching ] = useState<boolean>(false)

    const [ page, setPage ] = useState<number>(1)  // Página que indica quantos objetos já foram pesquisados
    const [ previousBooks, setPreviousBooks ] = useState<BookType[]>()  // Livros que já foram buscados na API antes
    const [ booksObj, setBooksObj ] = useState<GetAllResponseType<BookType>|null>()  // Informações de paginação dos livros atuais

    const loadingRef = useRef<HTMLSvgElement>(null)
    const [ debug, setDebug ] = useState<any>({})

    function handleOnScroll() {
        if (loadingRef.current) {
            const isLoadingOnScreen = useIsInViewport(loadingRef, setDebug)
        }
    }

    function handleSearchChange(e) {
        const { value } = e.target
        setFilter(value)
        setSearching(true)
    }

    useEffect(() => {
        genericService.alias('books').getAll({ page, filters: {
            name: { like: filter }
        } }).then(resp => {
            setBooksObj(resp)
            setSearching(false)
        })
    }, [ filter ])

    return <>
        {booksObj && <>

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

        {!searching && <ul className="flex flex-col items-center justify-start gap-3 w-full">
            {Children.toArray(booksObj.data.map(book => <Book {...book}/>))}
            <li ref={loadingRef} onScroll={handleOnScroll} className="mt-4 mb-4 p-4"><TailSpin
                height="40"
                width="40"
                color="#279D85"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperClass="w-full flex items-center justify-center"
                visible={true}
            /></li>
            <li>{JSON.stringify(debug)}</li>
        </ul>}
        {searching && <Loading/>}

        </>}
        {!booksObj && <Loading/>}
    </>
}