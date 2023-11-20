'use client'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import AsyncSelect from 'react-select/async'
import LocalStorage from '@/storage'

/* ICONS */
import { IoMdPerson } from "react-icons/io"
import { FaLock } from "react-icons/fa"
import { MdAlternateEmail } from "react-icons/md"
import { HiOutlineDocument } from "react-icons/hi"
import { IoDocumentTextOutline } from "react-icons/io5"

/* COMPONENTS */
import Input from '@/components/inputs/Input'
import Password from '@/components/inputs/Password'
import GoBack from '@/components/layout/GoBack'

/* CONTEXTS */
import { useGlobalContext } from '@/contexts'

/* TYPES */
import { UserRegister } from '@/types/components/user'
import { ClassroomType } from '@/types/api/modals'

export default function Page() {
    const methods = useForm<UserRegister>()
    const router = useRouter()
    
    const {
        handleSubmit,
        setValue,
        getValues
    } = methods

    const { userService, genericService } = useGlobalContext()

    const onSubmit: SubmitHandler<UserRegister> = credentials => {
        async function register() {
            const resp = await userService.register(credentials)
            
            LocalStorage.save('token', resp.authorisation.token)
            LocalStorage.save('user', resp.user)

            router.push('/signed/books')
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


    return <div className='flex flex-col items-center justify-center'>
        <div className="flex items-center justify-center">
            <GoBack className='w-6 h-6 text-leaf'/>
            <h1 className="text-leaf font-bold text-xl">Criar conta</h1>
        </div>
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input-container'>
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
                <fieldset className='input-group'>
                    <legend>Informações pessoais</legend>
                    <Input
                        name="name"
                        label="Nome: "
                        validation={{ required: true }}
                        placeholder="Digite seu nome"
                        Icon={IoMdPerson}
                    />
                    <Input
                        name="email"
                        label="Email: "
                        type='email'
                        placeholder="Digite seu e-mail"
                        Icon={MdAlternateEmail}
                    />
                    <Input
                        name="registration"
                        label="Matrícula: "
                        validation={{ required: true }}
                        placeholder="Informe sua matrícula"
                        Icon={HiOutlineDocument}
                    />
                    <Input
                        name="cpf"
                        label="CPF: "
                        validation={{ required: true }}
                        placeholder='Digite seu CPF'
                        masked
                        mask="000.000.000-00"
                        Icon={IoDocumentTextOutline}
                    />
                </fieldset>
                <fieldset className='input-group'>
                    <legend>Senha</legend>
                    <Password
                        name="password"
                        label="Senha: "
                        validation={{ required: true }}
                        placeholder='Digite sua senha'
                        Icon={FaLock}
                    />
                    <Password
                        name="password_confirmation"
                        label="Confirmar Senha: "
                        validation={{
                            required: true,
                            validate: {
                                equalPassword: (value) => value === getValues('password') || 'As senhas não coincidem!'
                            }
                        }}
                        placeholder="Confirme sua senha"
                        Icon={FaLock}
                    />
                </fieldset>

                <button type="submit" className="leaf-button w-full rounded-2xl">ENVIAR</button>
            </form>
        </FormProvider>
    </div>
}
