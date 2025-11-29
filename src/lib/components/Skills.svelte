<script lang="ts">
  interface Skill {
    name: string;
    logo: string;
  }
  
  // All skills in a single flat array - no categories
  const skills: Skill[] = [
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
    { name: 'Vault', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vault/vault-original.svg' }
  ];
</script>

<section id="skills" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">
        My <span class="gradient-text">Skills</span>
      </h2>
      <p class="section-subtitle">
        Technologies and tools I work with to bring ideas to life
      </p>
    </div>
    
    <div class="skills-scroll-container">
      <div class="skills-track">
        {#each [...skills, ...skills] as skill}
          <div class="skill-bubble">
            <img src={skill.logo} alt={skill.name} class="skill-logo" />
            <span class="skill-name">{skill.name}</span>
          </div>
        {/each}
      </div>
    </div>
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
  
  .skills-scroll-container {
    overflow: hidden;
    position: relative;
    padding: var(--spacing-2xl) 0;
    mask-image: linear-gradient(
      to right,
      transparent,
      black 10%,
      black 90%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      black 10%,
      black 90%,
      transparent
    );
  }
  
  .skills-track {
    display: flex;
    gap: var(--spacing-xl);
    animation: scroll-left 40s linear infinite;
    width: fit-content;
  }
  
  .skills-track:hover {
    animation-play-state: paused;
  }
  
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .skill-bubble {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    min-width: 140px;
    padding: var(--spacing-lg);
    background: var(--color-bg-secondary);
    border: 2px solid rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-xl);
    transition: all var(--duration-base);
    cursor: pointer;
    position: relative;
  }
  
  .skill-bubble::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: var(--radius-xl);
    background: var(--gradient-primary);
    opacity: 0;
    transition: opacity var(--duration-base);
    z-index: -1;
  }
  
  .skill-bubble:hover {
    transform: translateY(-12px) scale(1.15);
    border-color: transparent;
    box-shadow: 
      0 20px 40px rgba(99, 102, 241, 0.4),
      0 0 80px rgba(139, 92, 246, 0.3);
    z-index: 10;
  }
  
  .skill-bubble:hover::before {
    opacity: 1;
  }
  
  .skill-bubble:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-xl);
    background: var(--gradient-glass);
    animation: bubble-pop 0.6s ease-out;
  }
  
  @keyframes bubble-pop {
    0% {
      transform: scale(1);
      opacity: 0;
    }
    50% {
      transform: scale(1.3);
      opacity: 1;
    }
    100% {
      transform: scale(1.6);
      opacity: 0;
    }
  }
  
  .skill-logo {
    width: 56px;
    height: 56px;
    object-fit: contain;
    transition: all var(--duration-base);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
  
  .skill-bubble:hover .skill-logo {
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 8px 16px rgba(99, 102, 241, 0.5));
  }
  
  .skill-name {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-text-primary);
    text-align: center;
    transition: all var(--duration-base);
  }
  
  .skill-bubble:hover .skill-name {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: var(--font-size-base);
  }
  
  @media (max-width: 768px) {
    .skill-bubble {
      min-width: 120px;
      padding: var(--spacing-md);
    }
    
    .skill-logo {
      width: 48px;
      height: 48px;
    }
    
    .skills-track {
      animation-duration: 30s;
    }
  }
</style>
