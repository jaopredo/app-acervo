import { ErrorInterface } from "@/types/api/errors";

export function parseApiErrors(err: ErrorInterface): string[] {
    const { data } = err.response

    if (data.errors) {
        const errors: string[] = []
        Object.values(data.errors).forEach(errorsList => errorsList.forEach(errMsg => errors.push(errMsg)))
        return errors
    } else {
        return [data.message]
    }
}
