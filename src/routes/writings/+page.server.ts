import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/server/cms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		return { posts: await getPosts(fetch) };
	} catch (cause) {
		console.error('Unable to load writings from Payload CMS:', cause);
		throw error(502, 'Writings are temporarily unavailable');
	}
};
