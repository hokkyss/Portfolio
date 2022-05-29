import useSWR from 'swr'

import { fetcher } from './fetcher'

export const FetchBlog = (uuid?: string) => {
	const { data, error, isValidating, mutate } = useSWR<Blog>(
		uuid ? [`/blogs/${uuid}`] : null,
		fetcher
	)

	return {
		blog: data,
		blogLoaded: !data && !error,
		blogLoading: isValidating,
		blogMutate: mutate,
		blogError: error,
	}
}
