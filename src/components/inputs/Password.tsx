import { useFormContext, RegisterOptions, FieldValues } from "react-hook-form"
import { InputHTMLAttributes, useState, ComponentType } from 'react'

import { FaEye, FaEyeSlash } from "react-icons/fa"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string,
    Icon?: ComponentType<{
        className?: string;
    }>,
    validation?: RegisterOptions<FieldValues, string>
}

export default function Password({ name, label, validation, Icon, ...rest }: InputProps) {
    const { register, formState: { errors } } = useFormContext()

    const [ show, setShow ] = useState<boolean>(false)
    const [ focused, setFocused ] = useState<boolean>(false)

    function changeShow() {
        setShow(!show)
    }

    return <div className="input-container">
        <label htmlFor={name}>{label}</label>
        <div
            className={`transition-all flex items-center border-b ${focused?'border-leaf':'border-black'} ${errors[name]&&'input-error'}`}
        >
            <div className="w-5 h-5">
                {Icon && <Icon
                    className={`transition-all w-full h-full ${focused?'text-leaf':'text-black'} ${errors[name] && '!text-rose-500'}`}
                />}
            </div>
            <input
                className="input"
                {...rest}
                {...register(name, validation)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                type={show?'text':'password'}
            />
            { show && <FaEye className={`w-6 h-6 hover:cursor-pointer ${focused?'text-leaf':'text-black'}`} onClick={changeShow} /> }
            { !show && <FaEyeSlash className={`w-6 h-6 hover:cursor-pointer ${focused?'text-leaf':'text-black'} ${errors[name] && '!text-rose-500'}`} onClick={changeShow} /> }
        </div>
        { errors[name] && <p className="form-error">{(errors[name]?.message) as String}</p> }
    </div>
}
