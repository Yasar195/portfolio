import { error } from '@sveltejs/kit';
import { posts } from '$lib/data/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const post = posts.find(p => p.slug === params.slug);
  
  if (!post) {
    throw error(404, {
      message: 'Writing not found'
    });
  }
  
  return { post };
};
