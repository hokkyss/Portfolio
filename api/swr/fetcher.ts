import axios from 'axios'
axios.defaults.baseURL = 'http://103.161.184.2/api'

export const fetcher = <T>(url: string) =>
	axios
		.get<T>(url, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.data)
