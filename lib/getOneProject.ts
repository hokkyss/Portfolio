import axios from 'axios'

export const getOneProject = (id: string) =>
	axios
		.get<Project>(`/api/projects/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: process.env.NEXT_PUBLIC_API_URL,
		})
		.then((response) => response.data)
