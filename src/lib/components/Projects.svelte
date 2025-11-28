<script lang="ts">
  interface Project {
    title: string;
    description: string;
    tags: string[];
    image: string;
    github?: string;
    demo?: string;
  }
  
  const projects: Project[] = [
    {
      title: 'Microservices Platform',
      description: 'Built a scalable microservices architecture with Docker, Kubernetes, and service mesh for handling 1M+ requests/day.',
      tags: ['Node.js', 'Docker', 'Kubernetes', 'RabbitMQ'],
      image: '🏗️',
      github: '#',
      demo: '#'
    },
    {
      title: 'Real-time Analytics API',
      description: 'High-performance REST API with Redis caching, PostgreSQL, and real-time data processing using event-driven architecture.',
      tags: ['Python', 'FastAPI', 'Redis', 'PostgreSQL'],
      image: '📊',
      github: '#',
      demo: '#'
    },
    {
      title: 'CI/CD Pipeline Automation',
      description: 'Automated deployment pipeline using GitHub Actions, reducing deployment time by 80% with comprehensive testing.',
      tags: ['GitHub Actions', 'Docker', 'AWS', 'Terraform'],
      image: '🔄',
      github: '#'
    },
    {
      title: 'Database Optimization Project',
      description: 'Optimized database queries and indexes, improving response time by 60% for a high-traffic application.',
      tags: ['PostgreSQL', 'Query Optimization', 'Indexing'],
      image: '⚡',
      github: '#'
    },
    {
      title: 'Infrastructure Monitoring',
      description: 'Complete monitoring solution with Prometheus, Grafana, and alerting for distributed systems.',
      tags: ['Prometheus', 'Grafana', 'Docker', 'Node.js'],
      image: '📈',
      github: '#'
    },
    {
      title: 'Cloud Infrastructure as Code',
      description: 'Terraform modules for AWS infrastructure provisioning with auto-scaling, load balancing, and disaster recovery.',
      tags: ['Terraform', 'AWS', 'CloudFormation'],
      image: '☁️',
      github: '#'
    }
  ];
</script>

<section id="projects" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">
        Featured <span class="gradient-text">Projects</span>
      </h2>
      <p class="section-subtitle">
        A showcase of my recent work and personal projects
      </p>
    </div>
    
    <div class="projects-grid">
      {#each projects as project}
        <div class="project-card card">
          <div class="project-image">
            <div class="project-emoji">{project.image}</div>
            <div class="project-overlay">
              <div class="project-links">
                {#if project.github}
                  <a href={project.github} class="project-link" aria-label="View on GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                {/if}
                {#if project.demo}
                  <a href={project.demo} class="project-link" aria-label="View Demo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                {/if}
              </div>
            </div>
          </div>
          
          <div class="project-content">
            <h3 class="project-title">{project.title}</h3>
            <p class="project-description">{project.description}</p>
            
            <div class="project-tags">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
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
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: var(--spacing-2xl);
  }
  
  .project-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
  }
  
  .project-image {
    position: relative;
    height: 200px;
    background: var(--gradient-glass);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .project-emoji {
    font-size: 80px;
    transition: transform var(--duration-base);
  }
  
  .project-card:hover .project-emoji {
    transform: scale(1.1);
  }
  
  .project-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 15, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--duration-base);
  }
  
  .project-card:hover .project-overlay {
    opacity: 1;
  }
  
  .project-links {
    display: flex;
    gap: var(--spacing-lg);
  }
  
  .project-link {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all var(--duration-base);
  }
  
  .project-link:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: var(--shadow-glow);
  }
  
  .project-content {
    padding: var(--spacing-xl);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .project-title {
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-primary);
  }
  
  .project-description {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
    flex: 1;
  }
  
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
  
  .tag {
    padding: var(--spacing-xs) var(--spacing-sm);
    background: var(--color-bg-tertiary);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: var(--radius-md);
    font-size: var(--font-size-xs);
    font-weight: 500;
    color: var(--color-text-secondary);
  }
  
  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
