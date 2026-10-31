export interface BlogPost {
	title: string;
	slug: string;
	brief: string;
	content: string;
	publishedAt: string;
	readTimeInMinutes: number;
	tags: string[];
	coverImage?: string;
}
