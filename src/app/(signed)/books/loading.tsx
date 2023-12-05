'use client'
import { TailSpin } from 'react-loader-spinner'

export default function Loading() {
	return <div className="h-full w-full flex items-center justify-center flex-col">
    <TailSpin
      height="50"
      width="50"
      color="#279D85"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperClass="w-full flex items-center justify-center"
      visible={true}
    />
    <p className="text-leaf font-bold text-lg">Carregando livros...</p>
    </div>
}