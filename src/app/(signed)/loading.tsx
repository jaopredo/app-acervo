'use client'
import { Vortex } from "react-loader-spinner"

export default function Loading() {
    return <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperClass="w-full h-full flex items-center justify-center"
      colors={['#279D85', '#091F3C', '#21937A', 'orange', '#05152b', 'purple']}
    />
}