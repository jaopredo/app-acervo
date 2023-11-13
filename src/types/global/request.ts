
export type PaginationRequestType<T> = {
    data: T[],
    links: {
        first: string,
        last: string,
        prev: string | null,
        next: string | null
    },
    meta: {
        current_page: number,
        from: number,
        to: number,
        total: number,
        per_page: number,
        path: string,
        links: Array<{
            url: string,
            label: string,
            active: boolean
        }>
    }
}
