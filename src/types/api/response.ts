export type GetAllResponseType<T> = {
	data: T[],
	meta: {
		current_page: number,
		last_page: number,
		from: number,
		to: number,
		path: string,
		per_page: number,
		total: number,

		links: Array<{
			url: string | null,
			label: string,
			active: boolean
		}>
	},
	links: {
		first: string | null,
		last: string | null,
		prev: string | null,
		next: string | null,
	}
}