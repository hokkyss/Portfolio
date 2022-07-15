import axios from 'axios'

export const fetchTags = async () =>
	axios
		.get<Tags[]>('/api/tags', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.data)
