<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Skill {
    name: string;
    logo: string;
  }
  
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
      { threshold: 0.1 }
    );
    
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
  
  const skillsRow1: Skill[] = [
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'GitHub Actions', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg' },
    { name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
    { name: 'Nginx', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
    { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  ];
  
  const skillsRow2: Skill[] = [
    { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Svelte', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
    { name: 'Cloudflare', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg' },
    { name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
    { name: 'Rust', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
    { name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
    { name: 'GCP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
    { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
    { name: 'Vault', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vault/vault-original.svg' },
  ];
</script>

<section id="skills" class="section" bind:this={sectionEl}>
  <div class="container">
    <div class="skills-header" class:visible>
      <div class="section-divider"></div>
      <h2>My <span class="gradient-text">Skills</span></h2>
      <p class="skills-subtitle">Technologies and tools I work with</p>
    </div>
    
    <div class="marquee-wrapper" class:visible>
      <!-- Row 1: Scrolls left -->
      <div class="marquee-container">
        <div class="marquee-track track-left">
          {#each [...skillsRow1, ...skillsRow1] as skill}
            <div class="skill-chip">
              <img src={skill.logo} alt={skill.name} class="skill-logo" loading="lazy" />
              <span class="skill-name">{skill.name}</span>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Row 2: Scrolls right -->
      <div class="marquee-container">
        <div class="marquee-track track-right">
          {#each [...skillsRow2, ...skillsRow2] as skill}
            <div class="skill-chip">
              <img src={skill.logo} alt={skill.name} class="skill-logo" loading="lazy" />
              <span class="skill-name">{skill.name}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .skills-header {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s var(--ease-out);
  }
  
  .skills-header.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .skills-header .section-divider {
    margin: 0 auto var(--spacing-xl);
  }
  
  .skills-header h2 {
    font-size: var(--font-size-5xl);
    margin-bottom: var(--spacing-sm);
  }
  
  .skills-subtitle {
    font-size: var(--font-size-base);
    color: var(--color-text-muted);
    margin: 0;
  }
  
  .marquee-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    opacity: 0;
    transform: translateY(16px);
    transition: all 0.7s var(--ease-out) 0.15s;
  }
  
  .marquee-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .marquee-container {
    overflow: hidden;
    position: relative;
    padding: var(--spacing-sm) 0;
    mask-image: linear-gradient(
      to right,
      transparent,
      black 8%,
      black 92%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      black 8%,
      black 92%,
      transparent
    );
  }
  
  .marquee-track {
    display: flex;
    gap: var(--spacing-md);
    width: fit-content;
  }
  
  .track-left {
    animation: scroll-left 45s linear infinite;
  }
  
  .track-right {
    animation: scroll-right 40s linear infinite;
  }
  
  .marquee-track:hover {
    animation-play-state: paused;
  }
  
  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  @keyframes scroll-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  
  .skill-chip {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.6rem 1.2rem;
    background: var(--color-bg-secondary);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-lg);
    white-space: nowrap;
    transition: all var(--duration-base) var(--ease-out);
    cursor: default;
  }
  
  .skill-chip:hover {
    border-color: rgba(139, 92, 246, 0.3);
    background: var(--color-bg-tertiary);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.12);
  }
  
  .skill-logo {
    width: 28px;
    height: 28px;
    object-fit: contain;
    transition: transform var(--duration-base) var(--ease-out);
  }
  
  .skill-chip:hover .skill-logo {
    transform: scale(1.1);
  }
  
  .skill-name {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-text-primary);
  }
  
  @media (max-width: 768px) {
    .skill-chip {
      padding: 0.5rem 1rem;
    }
    
    .skill-logo {
      width: 24px;
      height: 24px;
    }
    
    .track-left {
      animation-duration: 35s;
    }
    
    .track-right {
      animation-duration: 30s;
    }
  }
</style>
