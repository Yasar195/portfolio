<script lang="ts">
  import { onMount } from 'svelte';
  
  interface BlogPost {
    title: string;
    brief: string;
    url: string;
    coverImage?: string;
    publishedAt: string;
    readTimeInMinutes: number;
  }
  
  let sectionEl: HTMLElement;
  let visible = $state(false);
  let posts = $state<BlogPost[]>([]);
  let loading = $state(true);
  let error = $state(false);
  
  onMount(async () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visible = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionEl);
    
    try {
      const response = await fetch('https://gql.hashnode.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query Publication { publication(host: "blogs.yasararafath.in") { posts(first: 5) { edges { node { title brief url coverImage { url } publishedAt readTimeInMinutes } } } } }`
        })
      });
      const data = await response.json();
      if (data.data?.publication?.posts?.edges) {
        posts = data.data.publication.posts.edges.map((edge: any) => ({
          title: edge.node.title, brief: edge.node.brief, url: edge.node.url,
          coverImage: edge.node.coverImage?.url, publishedAt: edge.node.publishedAt,
          readTimeInMinutes: edge.node.readTimeInMinutes
        }));
      }
      loading = false;
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      error = true;
      loading = false;
    }
    return () => observer.disconnect();
  });
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
</script>

<section id="blog" class="section" bind:this={sectionEl}>
  <div class="container">
    <div class="blog-header" class:visible>
      <div class="section-divider"></div>
      <h2>Latest <span class="gradient-text">Blog Posts</span></h2>
      <p class="blog-subtitle">Sharing knowledge about backend development and DevOps</p>
    </div>
    
    {#if loading}
      <div class="loading-state">
        <div class="loader"></div>
        <p>Loading posts...</p>
      </div>
    {:else if error}
      <div class="error-state">
        <p>Unable to load posts. Visit <a href="https://blogs.yasararafath.in" target="_blank" rel="noopener noreferrer">blogs.yasararafath.in</a></p>
      </div>
    {:else if posts.length > 0}
      <div class="blog-grid" class:visible>
        {#each posts as post, i}
          <a href={post.url} target="_blank" rel="noopener noreferrer" class="blog-card" style="transition-delay: {0.1 + i * 0.08}s">
            {#if post.coverImage}
              <div class="blog-image"><img src={post.coverImage} alt={post.title} loading="lazy" /></div>
            {/if}
            <div class="blog-content">
              <div class="blog-meta">
                <time>{formatDate(post.publishedAt)}</time>
                <span class="meta-dot">·</span>
                <span>{post.readTimeInMinutes} min read</span>
              </div>
              <h3 class="blog-title">{post.title}</h3>
              <p class="blog-brief">{post.brief}</p>
              <span class="read-more">Read article
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </span>
            </div>
          </a>
        {/each}
      </div>
      <div class="view-all" class:visible>
        <a href="https://blogs.yasararafath.in" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">View All Posts</a>
      </div>
    {/if}
  </div>
</section>

<style>
  .blog-header { text-align: center; margin-bottom: var(--spacing-3xl); opacity: 0; transform: translateY(20px); transition: all 0.6s var(--ease-out); }
  .blog-header.visible { opacity: 1; transform: translateY(0); }
  .blog-header .section-divider { margin: 0 auto var(--spacing-xl); }
  .blog-header h2 { font-size: var(--font-size-5xl); margin-bottom: var(--spacing-sm); }
  .blog-subtitle { color: var(--color-text-muted); margin: 0; }
  .loading-state { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-lg); padding: var(--spacing-4xl); }
  .loader { width: 36px; height: 36px; border: 2.5px solid var(--card-border); border-top-color: var(--color-accent-1); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-state p { color: var(--color-text-muted); font-size: var(--font-size-sm); }
  .error-state { text-align: center; padding: var(--spacing-4xl); color: var(--color-text-secondary); }
  .error-state a { color: var(--color-accent-1); text-decoration: underline; text-underline-offset: 3px; }
  .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: var(--spacing-xl); margin-bottom: var(--spacing-3xl); opacity: 0; transform: translateY(16px); transition: all 0.7s var(--ease-out) 0.15s; }
  .blog-grid.visible { opacity: 1; transform: translateY(0); }
  .blog-card { display: flex; flex-direction: column; background: var(--color-bg-secondary); border-radius: var(--radius-xl); border: 1px solid var(--card-border); overflow: hidden; text-decoration: none; color: inherit; transition: all var(--duration-base) var(--ease-out); }
  .blog-card:hover { border-color: rgba(139, 92, 246, 0.2); transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .blog-image { width: 100%; aspect-ratio: 16 / 9; overflow: hidden; background: var(--color-bg-tertiary); }
  .blog-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease-out); }
  .blog-card:hover .blog-image img { transform: scale(1.04); }
  .blog-content { padding: var(--spacing-xl); flex: 1; display: flex; flex-direction: column; }
  .blog-meta { display: flex; align-items: center; gap: var(--spacing-sm); font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--spacing-md); font-weight: 500; }
  .meta-dot { opacity: 0.4; }
  .blog-title { font-family: var(--font-display); font-size: var(--font-size-xl); font-weight: 700; margin-bottom: var(--spacing-sm); color: var(--color-text-primary); line-height: 1.3; }
  .blog-brief { font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--spacing-lg); flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.7; }
  .read-more { display: inline-flex; align-items: center; gap: 6px; font-size: var(--font-size-sm); font-weight: 600; color: var(--color-accent-1); transition: gap var(--duration-base); }
  .blog-card:hover .read-more { gap: 10px; }
  .view-all { display: flex; justify-content: center; opacity: 0; transition: opacity 0.6s var(--ease-out) 0.4s; }
  .view-all.visible { opacity: 1; }
  @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr; } }
</style>
