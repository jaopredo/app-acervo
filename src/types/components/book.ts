import { LoanType } from './loan'
import { ReserveType } from './reserve'

export type BookType = {
	id: number,
	register: string,
	cdd: string,
	isbn: string,
	name: string,
	author: string,
	publication: number,
	description: string,
	editor: string,
	pages: number,
	volume: number,
	example: number,
	aquisition_year: number,
	aquisition: string,
	local: string,
	available: string,
	image: string,
	reserves: ReserveType[],
	loans:LoanType[]
}