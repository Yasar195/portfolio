<script lang="ts">
  interface Skill {
    name: string;
    logo: string; // SVG logo path or URL
  }
  
  const skillCategories = [
    {
      category: 'Backend & Databases',
      skills: [
        { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
        { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
        { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' }
      ]
    },
    {
      category: 'DevOps & Cloud',
      skills: [
        { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
        { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        { name: 'GitHub Actions', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg' },
        { name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
        { name: 'Nginx', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
        { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
      ]
    },
    {
      category: 'Frontend (Basic)',
      skills: [
        { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Svelte', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' }
      ]
    }
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
    
    <div class="skills-grid">
      {#each skillCategories as category}
        <div class="skill-category">
          <h3 class="category-title">{category.category}</h3>
          <div class="skills-list">
            {#each category.skills as skill}
              <div class="skill-item">
                <img src={skill.logo} alt={skill.name} class="skill-logo" />
                <span class="skill-name">{skill.name}</span>
              </div>
            {/each}
          </div>
        </div>
      {/each}
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
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--spacing-2xl);
  }
  
  .skill-category {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-xl);
    padding: var(--spacing-2xl);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all var(--duration-base);
  }
  
  .skill-category:hover {
    border-color: var(--color-accent-1);
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
  
  .category-title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    margin-bottom: var(--spacing-xl);
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .skills-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--spacing-lg);
  }
  
  .skill-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    background: var(--color-bg-tertiary);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all var(--duration-base);
    cursor: pointer;
  }
  
  .skill-item:hover {
    border-color: var(--color-accent-1);
    transform: translateY(-4px) scale(1.05);
    box-shadow: var(--shadow-md);
    background: rgba(99, 102, 241, 0.1);
  }
  
  .skill-logo {
    width: 48px;
    height: 48px;
    object-fit: contain;
    transition: transform var(--duration-base);
  }
  
  .skill-item:hover .skill-logo {
    transform: scale(1.1);
  }
  
  .skill-name {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-text-primary);
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }
    
    .skills-list {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
    
    .skill-logo {
      width: 40px;
      height: 40px;
    }
  }
</style>
