import axios from 'axios'

export const getOneBlog = (id: string) =>
	axios
		.get<Blog>(`/api/blogs/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: process.env.NEXT_PUBLIC_API_URL,
		})
		.then((response) => response.data)
