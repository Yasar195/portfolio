import { error } from '@sveltejs/kit';
import { getPost } from '$lib/server/cms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	try {
		const post = await getPost(fetch, params.slug);
		if (!post) throw error(404, 'Writing not found');
		return { post };
	} catch (cause) {
		if ((cause as { status?: number }).status === 404) throw cause;
		console.error('Unable to load writing from Payload CMS:', cause);
		throw error(502, 'This writing is temporarily unavailable');
	}
};
