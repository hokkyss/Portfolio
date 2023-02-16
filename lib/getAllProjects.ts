import axios from 'axios'

export const getAllProjects = () =>
	axios
		.get<Project[]>('/api/projects', {
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: process.env.NEXT_PUBLIC_API_URL,
		})
		.then((response) => response.data)
