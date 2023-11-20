import { FaBookOpen } from "react-icons/fa6"
import { IoPersonCircle } from "react-icons/io5"
import { MdOutlineEmail } from "react-icons/md"

const NAVIGATOR_CONFIG = [
    {
        Icon: FaBookOpen,
        route: '/books'
    },
    {
        Icon: IoPersonCircle,
        route: '/profile'
    },
    {
        Icon: MdOutlineEmail,
        route: '/notifications'
    }
]

export default NAVIGATOR_CONFIG