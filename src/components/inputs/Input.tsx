import { useFormContext, RegisterOptions, FieldValues, Controller } from "react-hook-form"
import { InputHTMLAttributes, useState, ComponentType } from 'react'
import { IMaskInput } from 'react-imask'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string,
    masked?: boolean,
    mask?:string,
    Icon?: ComponentType<{
        className?: string;
    }>,
    validation?: RegisterOptions<FieldValues, string>
}

export default function Input({
    name,
    label,
    validation,
    Icon,
    masked,
    mask,
    ...rest
}: InputProps) {
    const { control, register, formState: { errors } } = useFormContext()
    const [ focused, setFocused ] = useState<boolean>(false)

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

            { !masked &&  <input
                className='input'
                {...rest}
                {...register(name, validation)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            /> }
            { masked && <Controller
                control={control}
                name="cpf"
                render={({field: { onChange, ref }}) => <IMaskInput
                    mask={ mask }
                    onAccept={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    inputRef={ref}
                    id={name}
                    className="input"
                    placeholder={rest.placeholder}
                />}
            /> }
        </div>
        { errors[name] && <p className="form-error">{(errors[name]?.message) as String}</p> }
    </div>
}
