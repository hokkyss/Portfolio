import axios from 'axios'

export const getOneProject = async (id: string) =>
	axios
		.get<Project>(`/api/projects/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.data)
