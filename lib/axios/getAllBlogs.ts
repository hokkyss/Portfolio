import axios from 'axios'

export const getAllBlogs = async () =>
	axios
		.get<Blog[]>('/api/blogs', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.data)
