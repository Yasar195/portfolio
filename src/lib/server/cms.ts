import { env } from '$env/dynamic/private';
import { lexicalToHtml } from '$lib/server/lexical';
import type { BlogPost } from '$lib/types/blog';

type PayloadPost = {
	title?: string;
	slug?: string;
	publishedAt?: string;
	_status?: string;
	content?: unknown;
	contentHTML?: string;
	brief?: string;
	excerpt?: string;
	heroImage?: { url?: string } | string | number | null;
	categories?: Array<{ title?: string; name?: string } | string>;
	meta?: { description?: string; title?: string };
};

type PayloadResponse = { docs?: PayloadPost[] };

const cmsBaseUrl = (env.CMS_URL || 'https://cms.yasararafath.in').replace(/\/$/, '');

function assetUrl(value: string | undefined) {
	if (!value) return undefined;
	try {
		const url = new URL(value, `${cmsBaseUrl}/`);
		return ['http:', 'https:'].includes(url.protocol) ? url.href : undefined;
	} catch {
		return undefined;
	}
}

function toPost(post: PayloadPost): BlogPost | null {
	if (!post.slug || !post.title) return null;
	const image = typeof post.heroImage === 'object' && post.heroImage ? assetUrl(post.heroImage.url) : undefined;
	const tags = (post.categories ?? []).map((category) =>
		typeof category === 'string' ? category : category.title ?? category.name ?? ''
	).filter(Boolean);
	const content = post.contentHTML || lexicalToHtml(post.content, `${cmsBaseUrl}/`);
	const words = content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
	return {
		title: post.title,
		slug: post.slug,
		brief: post.brief ?? post.excerpt ?? post.meta?.description ?? '',
		content,
		publishedAt: post.publishedAt ?? '',
		readTimeInMinutes: Math.max(1, Math.ceil(words / 200)),
		tags,
		...(image ? { coverImage: image } : {})
	};
}

async function fetchDocs(fetcher: typeof fetch, params: Record<string, string>) {
	const url = new URL(`${cmsBaseUrl}/api/posts`);
	for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
	const response = await fetcher(url, { headers: { accept: 'application/json' } });
	if (!response.ok) throw new Error(`Payload CMS request failed (${response.status})`);
	const body = await response.json() as PayloadResponse;
	return (body.docs ?? []).map(toPost).filter((post): post is BlogPost => post !== null);
}

export function getPosts(fetcher: typeof fetch) {
	return fetchDocs(fetcher, {
		limit: '100',
		sort: '-publishedAt',
		depth: '1',
		'where[_status][equals]': 'published'
	});
}

export async function getPost(fetcher: typeof fetch, slug: string) {
	const posts = await fetchDocs(fetcher, {
		'where[slug][equals]': slug,
		limit: '1',
		depth: '4',
		'where[_status][equals]': 'published'
	});
	return posts[0] ?? null;
}
