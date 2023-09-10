import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		'hello-world': 'Hello world!'
	};
};
