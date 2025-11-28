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
  
  let posts = $state<BlogPost[]>([]);
  let loading = $state(true);
  let error = $state(false);
  
  onMount(async () => {
    try {
      const response = await fetch('https://gql.hashnode.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query Publication {
              publication(host: "blogs.yasararafath.in") {
                posts(first: 5) {
                  edges {
                    node {
                      title
                      brief
                      url
                      coverImage {
                        url
                      }
                      publishedAt
                      readTimeInMinutes
                    }
                  }
                }
              }
            }
          `
        })
      });
      
      const data = await response.json();
      
      if (data.data?.publication?.posts?.edges) {
        posts = data.data.publication.posts.edges.map((edge: any) => ({
          title: edge.node.title,
          brief: edge.node.brief,
          url: edge.node.url,
          coverImage: edge.node.coverImage?.url,
          publishedAt: edge.node.publishedAt,
          readTimeInMinutes: edge.node.readTimeInMinutes
        }));
      }
      
      loading = false;
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      error = true;
      loading = false;
    }
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
</script>

<section id="blog" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">
        Latest <span class="gradient-text">Blog Posts</span>
      </h2>
      <p class="section-subtitle">
        Sharing my knowledge and insights about backend development and DevOps
      </p>
    </div>
    
    {#if loading}
      <div class="loading">
        <div class="spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    {:else if error}
      <div class="error-message">
        <p>Unable to load blog posts. Visit my blog at <a href="https://blogs.yasararafath.in" target="_blank" rel="noopener noreferrer">blogs.yasararafath.in</a></p>
      </div>
    {:else if posts.length > 0}
      <div class="blog-grid">
        {#each posts as post}
          <a href={post.url} target="_blank" rel="noopener noreferrer" class="blog-card card">
            {#if post.coverImage}
              <div class="blog-image">
                <img src={post.coverImage} alt={post.title} />
              </div>
            {/if}
            
            <div class="blog-content">
              <h3 class="blog-title">{post.title}</h3>
              <p class="blog-brief">{post.brief}</p>
              
              <div class="blog-meta">
                <span class="blog-date">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {formatDate(post.publishedAt)}
                </span>
                
                <span class="blog-read-time">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {post.readTimeInMinutes} min read
                </span>
              </div>
            </div>
          </a>
        {/each}
      </div>
      
      <div class="view-all">
        <a href="https://blogs.yasararafath.in" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          View All Posts
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    {/if}
  </div>
</section>

<style>
  .section-header {
    text-align: center;
    margin-bottom: var(--spacing-4xl);
  }
  
  .section-title {
    font-size: var(--font-size-5xl);
    margin-bottom: var(--spacing-md);
  }
  
  .section-subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
    padding: var(--spacing-4xl);
  }
  
  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid var(--color-bg-tertiary);
    border-top-color: var(--color-accent-1);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .error-message {
    text-align: center;
    padding: var(--spacing-4xl);
    color: var(--color-text-secondary);
  }
  
  .error-message a {
    color: var(--color-accent-1);
    text-decoration: underline;
  }
  
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-2xl);
    margin-bottom: var(--spacing-3xl);
  }
  
  .blog-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
    text-decoration: none;
    color: inherit;
  }
  
  .blog-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: var(--color-bg-tertiary);
  }
  
  .blog-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--duration-slow);
  }
  
  .blog-card:hover .blog-image img {
    transform: scale(1.05);
  }
  
  .blog-content {
    padding: var(--spacing-xl);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .blog-title {
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-primary);
    line-height: 1.3;
  }
  
  .blog-brief {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .blog-meta {
    display: flex;
    gap: var(--spacing-lg);
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }
  
  .blog-date,
  .blog-read-time {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }
  
  .view-all {
    display: flex;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    .blog-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
