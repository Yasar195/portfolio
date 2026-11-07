import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { getPosts } from '$lib/server/cms';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		return { latestPosts: (await getPosts(fetch)).slice(0, 3) };
	} catch (cause) {
		console.error('Unable to load featured writings from Payload CMS:', cause);
		return { latestPosts: [] };
	}
};

export const actions: Actions = {
	subscribe: async ({ request, fetch }) => {
		const form = await request.formData();
		if (form.get('website')) return { success: true };

		const email = String(form.get('email') ?? '').trim().toLowerCase();
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) {
			return fail(400, { error: 'Please enter a valid email address.' });
		}

		if (!env.NEWSLETTER_SECRET) {
			console.error('Newsletter signup requires NEWSLETTER_SECRET in the server environment.');
			return fail(503, { error: 'Newsletter signup is temporarily unavailable. Please try again later.' });
		}

		try {
			const cmsUrl = (env.CMS_URL || 'https://cms.yasararafath.in').replace(/\/$/, '');
			const response = await fetch(`${cmsUrl}/api/subscribers/subscribe`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'x-newsletter-secret': env.NEWSLETTER_SECRET
				},
				body: JSON.stringify({ email })
			});

			if (!response.ok) {
				console.error(`Newsletter CMS request failed (${response.status}).`);
				return fail(502, { error: 'We could not process your signup right now. Please try again.' });
			}

			return { success: true, email };
		} catch (cause) {
			console.error('Newsletter CMS request could not be completed:', cause);
			return fail(502, { error: 'We could not process your signup right now. Please try again.' });
		}
	}
};
