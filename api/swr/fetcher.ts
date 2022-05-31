import axios from 'axios'

export const fetcher = <T>(url: string) =>
	axios
		.get<T>(url, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.data)
