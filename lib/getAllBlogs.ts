import axios from 'axios'

export const getAllBlogs = async () =>
	axios
		.get<Blog[]>('/api/blogs', {
			headers: {
				'Content-Type': 'application/json',
			},
			baseURL: process.env.NEXT_PUBLIC_API_URL,
		})
		.then((response) => response.data)
