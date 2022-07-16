import axios from 'axios'

export const getAllProjects = async () =>
	axios
		.get<Project[]>('/api/projects', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.data)
