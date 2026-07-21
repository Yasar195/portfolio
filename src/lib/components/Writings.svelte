<script lang="ts">
  import { onMount } from 'svelte';
  import { posts } from '$lib/data/posts';
  
  let sectionEl: HTMLElement;
  let visible = $state(false);
  
  // Sort posts by date descending and get the first 3
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);
  
  onMount(() => {
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
    return () => observer.disconnect();
  });
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
</script>

<section id="writings" class="section" bind:this={sectionEl}>
  <div class="container">
    <div class="writings-header" class:visible>
      <div class="section-divider"></div>
      <h2>Latest <span class="gradient-text">Writings</span></h2>
      <p class="writings-subtitle">Deep dives into backend architecture, database internals, and production DevOps</p>
    </div>
    
    {#if latestPosts.length > 0}
      <div class="writings-grid" class:visible>
        {#each latestPosts as post, i}
          <a href="/writings/{post.slug}" class="writing-card" style="transition-delay: {0.1 + i * 0.08}s">
            <div class="writing-content">
              <div class="writing-meta">
                <time>{formatDate(post.publishedAt)}</time>
                <span class="meta-dot">·</span>
                <span>{post.readTimeInMinutes} min read</span>
              </div>
              <h3 class="writing-title">{post.title}</h3>
              <p class="writing-brief">{post.brief}</p>
              <div class="writing-tags">
                {#each post.tags.slice(0, 3) as tag}
                  <span class="tag-chip">{tag}</span>
                {/each}
              </div>
              <span class="read-more">Read article
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </span>
            </div>
          </a>
        {/each}
      </div>
      <div class="view-all" class:visible>
        <a href="/writings" class="btn btn-secondary">View All Writings</a>
      </div>
    {:else}
      <div class="empty-state">
        <p>No writings published yet. Check back soon!</p>
      </div>
    {/if}
  </div>
</section>

<style>
  .writings-header { 
    text-align: center; 
    margin-bottom: var(--spacing-3xl); 
    opacity: 0; 
    transform: translateY(20px); 
    transition: all 0.6s var(--ease-out); 
  }
  .writings-header.visible { opacity: 1; transform: translateY(0); }
  .writings-header .section-divider { margin: 0 auto var(--spacing-xl); }
  .writings-header h2 { font-size: var(--font-size-5xl); margin-bottom: var(--spacing-sm); }
  .writings-subtitle { color: var(--color-text-muted); margin: 0; }
  
  .writings-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); 
    gap: var(--spacing-xl); 
    margin-bottom: var(--spacing-3xl); 
    opacity: 0; 
    transform: translateY(16px); 
    transition: all 0.7s var(--ease-out) 0.15s; 
  }
  .writings-grid.visible { opacity: 1; transform: translateY(0); }
  
  .writing-card { 
    display: flex; 
    flex-direction: column; 
    background: var(--color-bg-secondary); 
    border-radius: var(--radius-xl); 
    border: 1px solid var(--card-border); 
    overflow: hidden; 
    text-decoration: none; 
    color: inherit; 
    transition: all var(--duration-base) var(--ease-out); 
  }
  .writing-card:hover { 
    border-color: rgba(194, 151, 103, 0.3); 
    transform: translateY(-4px); 
    box-shadow: var(--shadow-lg); 
  }
  
  .writing-content { padding: var(--spacing-xl); flex: 1; display: flex; flex-direction: column; }
  .writing-meta { display: flex; align-items: center; gap: var(--spacing-sm); font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--spacing-md); font-weight: 500; }
  .meta-dot { opacity: 0.4; }
  .writing-title { font-family: var(--font-display); font-size: var(--font-size-xl); font-weight: 700; margin-bottom: var(--spacing-sm); color: var(--color-text-primary); line-height: 1.3; }
  .writing-brief { font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--spacing-lg); flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.7; }
  
  .writing-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-lg);
  }
  
  .tag-chip {
    font-size: 11px;
    font-weight: 500;
    padding: 0.2rem 0.6rem;
    background: var(--color-bg-tertiary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-full);
    color: var(--color-text-secondary);
  }
  
  .read-more { display: inline-flex; align-items: center; gap: 6px; font-size: var(--font-size-sm); font-weight: 600; color: var(--color-accent-1); transition: gap var(--duration-base); }
  .writing-card:hover .read-more { gap: 10px; }
  
  .view-all { display: flex; justify-content: center; opacity: 0; transition: opacity 0.6s var(--ease-out) 0.4s; }
  .view-all.visible { opacity: 1; }
  
  .empty-state { text-align: center; padding: var(--spacing-4xl); color: var(--color-text-muted); }
  
  @media (max-width: 768px) { .writings-grid { grid-template-columns: 1fr; } }
</style>
