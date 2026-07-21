<script lang="ts">
  import { onMount } from 'svelte';
  
  let sectionEl: HTMLElement;
  let visible = $state(false);
  
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
      { threshold: 0.15 }
    );
    
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="about" class="section" bind:this={sectionEl}>
  <div class="container">
    <div class="about-header" class:visible>
      <div class="section-divider"></div>
      <h2>About <span class="gradient-text">Me</span></h2>
    </div>
    
    <div class="about-body" class:visible>
      <div class="about-text">
        <p class="lead">
          Backend engineer by trade, DevOps advocate by conviction. I design systems 
          that don't just work — they scale, recover, and evolve without breaking.
        </p>
        <p>
          I specialize in high-performance APIs, query-optimized databases, and 
          CI/CD pipelines that turn deployment anxiety into a non-event. From 
          microservices to monoliths, container orchestration to cloud-native 
          architectures — I build the server-side foundation that products run on.
        </p>
        <p>
          My passion is the backend layer: where data moves, logic lives, and 
          infrastructure either keeps up or gets redesigned. No frontend 
          flourishes — just clean architecture, observability, and uptime.
        </p>
      </div>
      
      <div class="tech-row">
        <h4 class="tech-label">Core Technologies</h4>
        <div class="tech-tags">
          {#each ['Node.js', 'Python', 'Rust', 'Go', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'Linux'] as tech}
            <span class="tech-tag">{tech}</span>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-header {
    margin-bottom: var(--spacing-3xl);
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s var(--ease-out);
  }

  .about-header .section-divider {
    margin: 0 auto;
  }
  
  .about-header.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .about-header h2 {
    font-size: var(--font-size-5xl);
    margin-bottom: 0;
  }
  
  .about-body {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.7s var(--ease-out) 0.15s;
  }
  
  .about-body.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .about-text {
    max-width: 720px;
    margin: 0 auto var(--spacing-3xl);
    text-align: center;
  }
  
  .about-text .lead {
    font-size: var(--font-size-lg);
    color: var(--color-text-primary);
    font-weight: 400;
    line-height: 1.8;
    margin-bottom: var(--spacing-xl);
  }
  
  .about-text p {
    font-size: var(--font-size-base);
    line-height: 1.85;
    margin-bottom: var(--spacing-lg);
  }
  
  .tech-row {
    border-top: 1px solid var(--divider);
    padding-top: var(--spacing-2xl);
  }
  
  .tech-label {
    font-family: var(--font-body);
    font-size: var(--font-size-xs);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }
  
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-sm);
  }
  
  .tech-tag {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: var(--color-bg-tertiary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-text-secondary);
    transition: all var(--duration-base) var(--ease-out);
  }
  
  .tech-tag:hover {
    border-color: var(--color-accent-1);
    color: var(--color-accent-1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.1);
  }
</style>
