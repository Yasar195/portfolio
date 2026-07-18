<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  
  let { data } = $props();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  function highlightCode() {
    if (typeof window !== 'undefined' && (window as any).Prism) {
      (window as any).Prism.highlightAll();
    }
  }
  
  // Re-run highlighting when data changes (e.g. routing between posts)
  $effect(() => {
    if (data.post) {
      // Delay slightly to allow DOM to render
      setTimeout(highlightCode, 50);
    }
  });
  
  onMount(() => {
    highlightCode();
  });
</script>

<svelte:head>
  <title>{data.post.title} - Yasar Arafath</title>
  <meta name="description" content={data.post.brief} />
  
  <!-- Prism.js Tomorrow Night theme styling -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" />
  
  <!-- Prism.js Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js" onload={highlightCode} defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-go.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-sql.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-yaml.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js" defer></script>
</svelte:head>

<div class="writing-detail-page">
  <div class="container container-narrow">
    <!-- Back Navigation -->
    <a href="/writings" class="back-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      Back to Writings
    </a>
    
    <!-- Article Header -->
    <header class="article-header">
      <div class="article-meta">
        <time datetime={data.post.publishedAt}>{formatDate(data.post.publishedAt)}</time>
        <span class="meta-dot">·</span>
        <span>{data.post.readTimeInMinutes} min read</span>
      </div>
      
      <h1 class="article-title">{data.post.title}</h1>
      
      <p class="article-brief">{data.post.brief}</p>
      
      <div class="article-tags">
        {#each data.post.tags as tag}
          <span class="tag-chip">{tag}</span>
        {/each}
      </div>
      
      <div class="header-divider"></div>
    </header>
    
    <!-- Article Body -->
    <article class="prose">
      {@html data.post.content}
    </article>
    
    <!-- Footer CTA -->
    <footer class="article-footer">
      <div class="footer-divider"></div>
      <div class="footer-cta">
        <p>Thanks for reading! Have thoughts on this article?</p>
        <div class="cta-actions">
          <a href="/#contact" class="btn btn-primary">Get In Touch</a>
          <a href="/writings" class="btn btn-secondary">More Articles</a>
        </div>
      </div>
    </footer>
  </div>
</div>

<style>
  .writing-detail-page {
    padding-top: 130px;
    padding-bottom: var(--spacing-5xl);
    min-height: calc(100vh - 200px);
  }
  
  .container-narrow {
    max-width: 760px;
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-2xl);
    font-weight: 500;
    transition: color var(--duration-base);
  }
  
  .back-link:hover {
    color: var(--color-accent-1);
  }
  
  .article-header {
    margin-bottom: var(--spacing-2xl);
  }
  
  .article-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-md);
    font-weight: 500;
  }
  
  .meta-dot {
    opacity: 0.4;
  }
  
  .article-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 6vw, var(--font-size-4xl));
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
    letter-spacing: -0.01em;
  }
  
  .article-brief {
    font-size: var(--font-size-lg);
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
    font-weight: 400;
  }
  
  .article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-2xl);
  }
  
  .tag-chip {
    font-size: var(--font-size-xs);
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    background: var(--color-bg-secondary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-full);
    color: var(--color-text-secondary);
  }
  
  .header-divider {
    width: 100%;
    height: 1px;
    background: var(--divider);
  }
  
  /* PROSE STYLING FOR DYNAMIC HTML CONTENT */
  :global(.prose) {
    font-family: var(--font-body);
    font-size: 1.05rem;
    line-height: 1.85;
    color: var(--color-text-secondary);
  }
  
  :global(.prose p) {
    margin-bottom: var(--spacing-lg);
    color: var(--color-text-secondary);
  }
  
  :global(.prose h3) {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    color: var(--color-text-primary);
    margin-top: var(--spacing-2xl);
    margin-bottom: var(--spacing-md);
    font-weight: 700;
  }
  
  :global(.prose h4) {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    color: var(--color-text-primary);
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-sm);
    font-weight: 700;
  }
  
  :global(.prose blockquote) {
    border-left: 3px solid var(--color-accent-1);
    padding: var(--spacing-sm) 0 var(--spacing-sm) var(--spacing-lg);
    margin: var(--spacing-xl) 0;
    font-style: italic;
    background: var(--color-bg-secondary);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }
  
  :global(.prose blockquote p) {
    margin-bottom: 0;
    color: var(--color-text-primary);
  }
  
  :global(.prose ul, .prose ol) {
    margin-bottom: var(--spacing-lg);
    padding-left: var(--spacing-xl);
  }
  
  :global(.prose li) {
    margin-bottom: var(--spacing-xs);
  }
  
  :global(.prose code) {
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 0.9em;
    background: var(--color-bg-secondary);
    color: var(--color-accent-3);
    padding: 0.15rem 0.35rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--card-border);
  }
  
  :global(.prose pre) {
    margin: var(--spacing-xl) 0 !important;
    border-radius: var(--radius-lg) !important;
    border: 1px solid var(--card-border) !important;
    background: #1b1b1a !important; /* Ensure it matches bg-secondary */
    padding: var(--spacing-lg) !important;
    overflow-x: auto;
  }
  
  :global(.prose pre code) {
    padding: 0 !important;
    background: transparent !important;
    border: none !important;
    color: inherit !important;
    font-size: 0.9rem !important;
    line-height: 1.6 !important;
  }
  
  /* Override Prism CSS variables to align with portfolio colors */
  :global(.token.comment, .token.prolog, .token.doctype, .token.cdata) {
    color: var(--color-text-muted) !important;
  }
  :global(.token.punctuation) {
    color: var(--color-text-secondary) !important;
  }
  :global(.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted) {
    color: #e8d2bb !important; /* accent-3 */
  }
  :global(.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted) {
    color: #d9ad7c !important; /* accent-2 */
  }
  :global(.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string) {
    color: var(--color-text-primary) !important;
  }
  :global(.token.atrule, .token.attr-value, .token.keyword) {
    color: #c29767 !important; /* accent-1 */
  }
  :global(.token.function, .token.class-name) {
    color: #f3f1eb !important; /* text-primary */
  }
  :global(.token.regex, .token.important, .token.variable) {
    color: #ab8154 !important; /* accent-4 */
  }
  
  .article-footer {
    margin-top: var(--spacing-3xl);
  }
  
  .footer-divider {
    width: 100%;
    height: 1px;
    background: var(--divider);
    margin-bottom: var(--spacing-xl);
  }
  
  .footer-cta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    background: var(--color-bg-secondary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
  }
  
  .footer-cta p {
    margin: 0;
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    font-weight: 500;
  }
  
  .cta-actions {
    display: flex;
    gap: var(--spacing-sm);
  }
  
  @media (max-width: 768px) {
    .writing-detail-page {
      padding-top: 100px;
    }
    
    .footer-cta {
      flex-direction: column;
      text-align: center;
    }
    
    .cta-actions {
      width: 100%;
      flex-direction: column;
    }
    
    .cta-actions .btn {
      width: 100%;
    }
  }
</style>
