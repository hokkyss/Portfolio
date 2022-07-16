import axios from 'axios'

export const getOneBlog = (id: string) =>
	axios
		.get<Blog>(`/api/blogs/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.data)
