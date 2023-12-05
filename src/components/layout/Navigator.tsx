import { Children, ComponentType } from 'react'
import Link from 'next/link'

interface NavigatorCardProps {
    name?: string,
    Icon: ComponentType<{
        className?: string;
    }>,
    route: string,

    pathname?: string
}

interface NavigatorProps {
    options: NavigatorCardProps[],
    pathname: string
}

export default function Navigator({options, pathname}: NavigatorProps) {
    return <ul className='p-3 w-screen bg-gray-100 flex items-center justify-evenly gap-2'>
        {Children.toArray( options.map(opt => <NavigatorCard {...opt} pathname={pathname} />) )}
    </ul>
}

function NavigatorCard({ Icon, name, route, pathname }: NavigatorCardProps) {

    return <li><Link className='w-full h-full flex flex-col items-center justify-center' href={route}>
        <Icon className={`w-9 h-9 ${pathname == route && 'text-leaf'}`}/>
        {name && <p className='text-center'>{name}</p>}
    </Link></li>
}
