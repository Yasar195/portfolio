<script lang="ts">
  import type { PageData } from './$types';
  
  let { data } = $props();
  
  let searchQuery = $state('');
  let selectedTag = $state('');
  
  // Derived state for filtering posts
  let filteredPosts = $derived(
    data.posts.filter((post: any) => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.brief.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    })
  );
  
  // Derived state to compute all unique tags
  let allTags = $derived(
    Array.from(new Set(data.posts.flatMap((post: any) => post.tags))) as string[]
  );
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const toggleTag = (tag: string) => {
    if (selectedTag === tag) {
      selectedTag = '';
    } else {
      selectedTag = tag;
    }
  };
  
  const clearFilters = () => {
    searchQuery = '';
    selectedTag = '';
  };
</script>

<svelte:head>
  <title>Writings - Yasar Arafath</title>
  <meta name="description" content="Technical articles, deep dives, and tutorials on DevOps, backend engineering, systems design, and SRE by Yasar Arafath." />
</svelte:head>

<div class="writings-page">
  <div class="container">
    <!-- Header -->
    <header class="page-header">
      <a href="/" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Home
      </a>
      <h1 class="gradient-text">Writings</h1>
      <p class="subtitle">Technical logs, architecture deep dives, and SRE practices.</p>
    </header>

    <!-- Search and Filter Bar -->
    <div class="controls-panel">
      <div class="search-box">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          type="text" 
          placeholder="Search articles, tags, or topics..." 
          bind:value={searchQuery}
        />
        {#if searchQuery !== ''}
          <button class="clear-search-btn" onclick={() => searchQuery = ''} aria-label="Clear search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        {/if}
      </div>

      {#if allTags.length > 0}
        <div class="tags-filter">
          <span class="filter-label">Filter by:</span>
          <div class="tags-list">
            {#each allTags as tag}
              <button 
                class="tag-filter-btn" 
                class:active={selectedTag === tag}
                onclick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            {/each}
          </div>
        </div>
      {/if}

      {#if searchQuery !== '' || selectedTag !== ''}
        <div class="active-filters">
          <span>Showing {filteredPosts.length} of {data.posts.length} articles</span>
          <button class="reset-link" onclick={clearFilters}>Reset Filters</button>
        </div>
      {/if}
    </div>

    <!-- Grid -->
    {#if filteredPosts.length > 0}
      <div class="writings-grid">
        {#each filteredPosts as post}
          <a href="/writings/{post.slug}" class="writing-card">
            <div class="card-inner">
              <div class="writing-meta">
                <time>{formatDate(post.publishedAt)}</time>
                <span class="meta-dot">·</span>
                <span>{post.readTimeInMinutes} min read</span>
              </div>
              <h2 class="writing-title">{post.title}</h2>
              <p class="writing-brief">{post.brief}</p>
              <div class="card-footer">
                <div class="writing-tags">
                  {#each post.tags as tag}
                    <span class="tag-chip">{tag}</span>
                  {/each}
                </div>
                <span class="read-more">Read
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="no-results">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
        <h3>No matches found</h3>
        <p>We couldn't find any articles matching your search query. Try expanding your keywords.</p>
        <button class="btn btn-secondary" onclick={clearFilters}>View All Articles</button>
      </div>
    {/if}
  </div>
</div>

<style>
  .writings-page {
    padding-top: 130px;
    padding-bottom: var(--spacing-5xl);
    min-height: calc(100vh - 200px);
  }
  
  .page-header {
    margin-bottom: var(--spacing-3xl);
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-md);
    font-weight: 500;
    transition: color var(--duration-base);
  }
  
  .back-link:hover {
    color: var(--color-accent-1);
  }
  
  .page-header h1 {
    font-size: var(--font-size-6xl);
    margin-bottom: var(--spacing-sm);
    letter-spacing: -0.02em;
  }
  
  .subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0;
  }
  
  .controls-panel {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-3xl);
    background: var(--color-bg-secondary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
  }
  
  .search-box {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
  }
  
  .search-icon {
    position: absolute;
    left: var(--spacing-md);
    color: var(--color-text-muted);
    pointer-events: none;
  }
  
  .search-box input {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 2.8rem;
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    background: var(--color-bg-primary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-lg);
    color: var(--color-text-primary);
    transition: all var(--duration-base);
  }
  
  .search-box input:focus {
    outline: none;
    border-color: var(--color-accent-1);
    box-shadow: 0 0 0 2px rgba(194, 151, 103, 0.15);
  }
  
  .clear-search-btn {
    position: absolute;
    right: var(--spacing-md);
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border-radius: var(--radius-full);
    transition: all var(--duration-fast);
  }
  
  .clear-search-btn:hover {
    color: var(--color-text-primary);
    background: var(--color-bg-tertiary);
  }
  
  .tags-filter {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }
  
  .filter-label {
    font-size: var(--font-size-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
  }
  
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }
  
  .tag-filter-btn {
    background: var(--color-bg-primary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-full);
    padding: 0.35rem 1rem;
    font-family: var(--font-body);
    font-size: var(--font-size-xs);
    font-weight: 500;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--duration-base);
  }
  
  .tag-filter-btn:hover {
    border-color: var(--color-accent-1);
    color: var(--color-accent-1);
  }
  
  .tag-filter-btn.active {
    background: var(--gradient-brand);
    color: var(--color-bg-primary);
    border-color: transparent;
    font-weight: 600;
  }
  
  .active-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--spacing-sm);
    border-top: 1px solid var(--divider);
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }
  
  .reset-link {
    background: none;
    border: none;
    color: var(--color-accent-1);
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  
  .reset-link:hover {
    color: var(--color-accent-2);
  }
  
  .writings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: var(--spacing-xl);
  }
  
  .writing-card {
    display: flex;
    flex-direction: column;
    background: var(--color-bg-secondary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-xl);
    text-decoration: none;
    color: inherit;
    transition: all var(--duration-base) var(--ease-out);
    position: relative;
    overflow: hidden;
  }
  
  .writing-card:hover {
    border-color: rgba(194, 151, 103, 0.3);
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .card-inner {
    padding: var(--spacing-xl);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .writing-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-md);
    font-weight: 500;
  }
  
  .meta-dot {
    opacity: 0.4;
  }
  
  .writing-title {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-primary);
  }
  
  .writing-brief {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: var(--spacing-xl);
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .card-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--spacing-md);
    margin-top: auto;
  }
  
  .writing-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .tag-chip {
    font-size: 10px;
    font-weight: 500;
    padding: 0.15rem 0.5rem;
    background: var(--color-bg-tertiary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-full);
    color: var(--color-text-secondary);
  }
  
  .read-more {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-accent-1);
    transition: gap var(--duration-base);
    white-space: nowrap;
  }
  
  .writing-card:hover .read-more {
    gap: 10px;
  }
  
  .no-results {
    text-align: center;
    padding: var(--spacing-5xl) var(--spacing-xl);
    background: var(--color-bg-secondary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  .no-results svg {
    color: var(--color-text-muted);
  }
  
  .no-results h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    margin: 0;
  }
  
  .no-results p {
    color: var(--color-text-secondary);
    max-width: 440px;
    margin: 0 0 var(--spacing-md) 0;
    font-size: var(--font-size-sm);
  }
  
  @media (max-width: 768px) {
    .writings-page {
      padding-top: 100px;
    }
    
    .page-header h1 {
      font-size: var(--font-size-4xl);
    }
    
    .writings-grid {
      grid-template-columns: 1fr;
    }
    
    .controls-panel {
      padding: var(--spacing-md);
    }
  }
</style>
