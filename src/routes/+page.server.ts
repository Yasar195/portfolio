import { getPosts } from '$lib/server/cms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		return { latestPosts: (await getPosts(fetch)).slice(0, 3) };
	} catch (cause) {
		console.error('Unable to load featured writings from Payload CMS:', cause);
		return { latestPosts: [] };
	}
};
