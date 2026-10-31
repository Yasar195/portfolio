type LexicalNode = {
	type?: string;
	text?: string;
	src?: string;
	altText?: string;
	format?: number | string;
	url?: string;
	tag?: string;
	listType?: string;
	fields?: {
		url?: string;
		newTab?: boolean;
		blockType?: string;
		media?: string | number | { url?: string; alt?: string; filename?: string };
		caption?: string;
	};
	value?: { url?: string; alt?: string; filename?: string } | string | number;
	children?: LexicalNode[];
};

const escapeHtml = (value: string) =>
	value.replace(/[&<>"']/g, (character) => ({
		'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
	})[character]!);

function safeUrl(value: string | undefined, baseUrl: string) {
	if (!value) return '';
	try {
		const url = new URL(value, baseUrl);
		return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : '';
	} catch {
		return '';
	}
}

function renderChildren(children: LexicalNode[] = [], baseUrl: string): string {
	return children.map((node) => renderNode(node, baseUrl)).join('');
}

function renderNode(node: LexicalNode, baseUrl: string): string {
	if (node.type === 'text') {
		let text = escapeHtml(node.text ?? '').replace(/\n/g, '<br>');
		const format = typeof node.format === 'number' ? node.format : 0;
		if (format & 16) text = `<code>${text}</code>`;
		if (format & 1) text = `<strong>${text}</strong>`;
		if (format & 2) text = `<em>${text}</em>`;
		if (format & 4) text = `<s>${text}</s>`;
		if (format & 8) text = `<u>${text}</u>`;
		return text;
	}

	const children = renderChildren(node.children, baseUrl);
	switch (node.type) {
		case 'root': return children;
		case 'paragraph': return `<p>${children}</p>`;
		case 'heading': {
			const tag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tag ?? '') ? node.tag : 'h2';
			return `<${tag}>${children}</${tag}>`;
		}
		case 'quote': return `<blockquote>${children}</blockquote>`;
		case 'list': {
			const tag = node.listType === 'number' ? 'ol' : 'ul';
			return `<${tag}>${children}</${tag}>`;
		}
		case 'listitem': return `<li>${children}</li>`;
		case 'link':
		case 'autolink': {
			const href = safeUrl(node.fields?.url ?? node.url, baseUrl);
			return href ? `<a href="${escapeHtml(href)}" rel="noopener noreferrer">${children}</a>` : children;
		}
		case 'upload':
		case 'image': {
			const image = typeof node.value === 'object' && node.value ? node.value : undefined;
			const src = safeUrl(image?.url ?? node.src ?? node.url ?? node.fields?.url, baseUrl);
			if (!src) return children;
			const alt = escapeHtml(image?.alt ?? node.altText ?? image?.filename ?? '');
			return `<figure><img src="${escapeHtml(src)}" alt="${alt}" loading="lazy">${children ? `<figcaption>${children}</figcaption>` : ''}</figure>`;
		}
		case 'block': {
			if (node.fields?.blockType !== 'mediaBlock') return children;
			const media = typeof node.fields.media === 'object' && node.fields.media ? node.fields.media : undefined;
			const src = safeUrl(media?.url, baseUrl);
			if (!src) return children;
			const alt = escapeHtml(media?.alt ?? media?.filename ?? '');
			const caption = node.fields.caption ? `<figcaption>${escapeHtml(node.fields.caption)}</figcaption>` : '';
			return `<figure class="media-block"><img src="${escapeHtml(src)}" alt="${alt}" loading="lazy">${caption}</figure>`;
		}
		case 'linebreak': return '<br>';
		case 'horizontalrule': return '<hr>';
		case 'code': return `<pre><code>${children}</code></pre>`;
		default: return children;
	}
}

export function lexicalToHtml(value: unknown, baseUrl: string): string {
	if (!value || typeof value !== 'object') return '';
	const root = (value as { root?: LexicalNode }).root;
	return root ? renderNode(root, baseUrl) : '';
}
