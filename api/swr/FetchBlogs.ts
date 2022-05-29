import useSWR from 'swr'

import { fetcher } from './fetcher'

export const FetchBlogs = () => {
	const { data, error, mutate, isValidating } = useSWR<Blog[]>(
		['/blogs'],
		fetcher
	)

	return {
		blogs: data,
		blogsLoading: isValidating,
		blogsLoaded: !data && !error,
		blogsError: error,
		blogsMutate: mutate,
	}
}
