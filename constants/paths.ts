export const loginPath = {
	path: '/login',
	name: 'Login',
}

export const specificBlogPath = { path: '/blogs/[uuid]', name: 'Blog Detail' }
export const specificProjectPath = {
	path: '/projects/[uuid]',
	name: 'Project Detail',
}

export const paths = {
	home: { path: '/', name: 'About' },
	blogs: { path: '/blogs', name: 'Blogs' },
	skills: { path: '/skills', name: 'Skills' },
	projects: { path: '/projects', name: 'Projects' },
}
