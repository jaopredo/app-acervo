import LocalStorage from "."
import { ErrorInterface } from "@/types/api/errors"
import { parseApiErrors } from "@/utils/errors"

export default class ErrorStorage {
    static async add(err: ErrorInterface) {
        const parsedErrors = parseApiErrors(err)
        const errors = await LocalStorage.get('errors') as Array<{ message: string }>

        if (errors) {
            const newErrors = [...errors, ...parsedErrors]
            await LocalStorage.save('errors', newErrors)
        } else {
            await LocalStorage.save('errors', [...parsedErrors])
        }

        window.dispatchEvent(new Event('error-change-event'))

        setTimeout(() => {
            LocalStorage.save('errors', [])
        }, 10000)
    }

    static async get() {
        return await LocalStorage.get('errors')
    }
}
