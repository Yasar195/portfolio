import { posts } from '$lib/data/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    posts: [...posts].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  };
};
