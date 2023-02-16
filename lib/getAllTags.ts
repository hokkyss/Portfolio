import axios from 'axios'

export const getAllTags = () =>
	axios
		.get<Tags[]>('/api/tags', {
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: process.env.NEXT_PUBLIC_API_URL,
		})
		.then((response) => response.data)
