export const deleteBlog = async (slug: string) => {
	const resp = await fetch(`/api/blogs/${slug}`, {
		method: 'DELETE',
	})

	if (resp.ok) return

	const json = await resp.json()
	throw new Error(json.detail || 'Internal Server Error')
}
