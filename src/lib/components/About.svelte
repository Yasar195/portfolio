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
    <div class="about-content" class:visible>
      <div class="section-divider"></div>
      <h2>About <span class="gradient-text">Me</span></h2>
      <p>
        I build backend systems and infrastructure. APIs, databases, container
        orchestration, CI/CD — whatever it takes to ship and run reliable
        software at scale.
      </p>
      <p>
        Currently working with Node.js, Python, and Go. I design for
        observability, optimize for performance, and automate everything
        that can be automated.
      </p>
    </div>
  </div>
</section>

<style>
  .about-content {
    max-width: 720px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s var(--ease-out);
  }

  .about-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .about-content h2 {
    font-size: var(--font-size-5xl);
    margin-bottom: var(--spacing-xl);
  }

  .about-content p {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    margin-bottom: var(--spacing-lg);
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-xl);
  }

  .tech-tag {
    display: inline-block;
    padding: 0.35rem 0.9rem;
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
  }
</style>
