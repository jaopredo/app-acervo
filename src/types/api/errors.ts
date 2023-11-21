
export interface ErrorInterface {
    response: {
        data: {
            message: string,
            errors?: {
                [x: string]: string[]
            }
        }
    }
}
