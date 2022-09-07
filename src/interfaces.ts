// export interface User{
// 	id: number,
// 	name: string,
// 	username: string,
// 	email: string,
// 	phone: string,
// 	website: string,
// 	address: {
// 		street: string,
// 		suite: string,
// 		city: string,
// 		zipcode: string,
// 	}
// 	company: {
// 		name: string,
// 		catchPhrase: string,
// 		bs: string
// 	}
// }
export interface User{
	id: number,
	name: string,
	date: string,
	email: string,
	phone: string,
	gender: string,
	address: {
		city: string,
		district: string,
		ward: string,
		apartment_number: string,
	}
	favorite: [],
	describe: string
}