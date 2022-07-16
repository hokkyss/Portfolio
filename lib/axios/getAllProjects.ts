import axios from 'axios'

export const getAllProjects = () =>
	axios
		.get<Project[]>('/api/projects', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.data)
