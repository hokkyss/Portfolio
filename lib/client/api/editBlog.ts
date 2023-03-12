export const editBlog = async (
	markdown: string,
	slug: string,
	oldSlug: string,
	subtitle: string,
	tags: string[],
	title: string
) => {
	const resp = await fetch(`/api/blogs/${oldSlug}`, {
		method: 'PATCH',
		body: JSON.stringify({ markdown, slug, subtitle, tags, title }),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const json = await resp.json()

	if (resp.ok) {
		return json as Blog
	}

	throw new Error((json.detail as string) || 'Error!')
}
