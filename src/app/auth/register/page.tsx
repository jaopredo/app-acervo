'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import AsyncSelect from 'react-select/async'

/* CONTEXTS */
import { useGlobalContext } from '@/contexts'

/* TYPES */
import { UserRegister } from '@/types/components/user'
import { ClassroomType } from '@/types/api/modals'

export default function Page() {
    const { register, handleSubmit, control, setValue } = useForm<UserRegister>()
    const { userService, genericService } = useGlobalContext()

    const onSubmit: SubmitHandler<UserRegister> = credentials => {
        async function register() {
            const resp = await userService.register(credentials)
            console.log(resp)
        }

        register()
    }


    /* FUNÇÕES QUE COLOCAM OS VALORES NO SELECT */
    const promiseClassrooms = (inputValue: string) => {
        async function getClassrooms (inputValue: string) {
            genericService.alias('classrooms')
            return genericService.getAll({ filters: {
                name: {
                    like: inputValue
                }
            } }).then(resp => {
                console.log(resp.data)
                return (resp.data as ClassroomType[]).map(classroom =>
                    ({ label: classroom.name, value: classroom.id })
                )
            })
        }
        
        return new Promise<{ label: string, value: number }[]>((resolve) => {
            resolve(getClassrooms(inputValue));
        })
    }


    return <div>
        <h1>CRIAR CONTA</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Nome: </label>
                <input type="text" id="name" {...register('name', { required: true })} />

            </div>
            <div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" {...register('email', { required: true })} />
                </div>
                <div>
                    <label htmlFor="registration">Matrícula: </label>
                    <input type="text" id="registration" {...register('registration', { required: true })} />
                </div>
                <div>
                    <label htmlFor="cpf">CPF: </label>
                    <Controller
                        control={control}
                        name="cpf"
                        render={({field: { onChange, ref }}) => <IMaskInput
                            mask="000.000.000-00"
                            onAccept={onChange}
                            inputRef={ref}
                            id="cpf"
                            // {...register('cpf', { required: true })}
                        />}
                    />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="password">Senha: </label>
                    <input type="password" id="password" {...register('password', { required: true })} />
                </div>
                <div>
                    <label htmlFor="password_confirmation">Confirmar Senha: </label>
                    <input type="password" id="password_confirmation" {...register('password_confirmation', { required: true })} />
                </div>
            </div>
            <div>
                <label htmlFor="classroom_id">Sala de Aula: </label>
                <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={promiseClassrooms}
                    placeholder="Escolha a sala de aula"
                    onChange={(classroom) => {
                        if (classroom) setValue('classroom_id', classroom.value)
                    }}
                />
            </div>

            <button type="submit">ENVIAR</button>
        </form>
    </div>
}
