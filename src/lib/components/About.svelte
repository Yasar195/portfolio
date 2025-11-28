<script lang="ts">
  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '30+', label: 'Happy Clients' },
    { value: '100%', label: 'Satisfaction' }
  ];
</script>

<section id="about" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">
        About <span class="gradient-text">Me</span>
      </h2>
      <p class="section-subtitle">
        Get to know more about who I am and what I do
      </p>
    </div>
    
    <div class="about-content">
      <div class="about-text">
        <h3>Hey there! 👋</h3>
        <p>
          I'm a backend-focused developer who thrives on building robust, scalable systems. 
          My expertise lies in designing efficient database architectures and automating 
          infrastructure with modern DevOps practices.
        </p>
        <p>
          I specialize in creating high-performance APIs, optimizing database queries, and 
          implementing CI/CD pipelines that streamline development workflows. From microservices 
          to monoliths, containerization to cloud deployments, I handle the server-side 
          architecture that powers applications.
        </p>
        <p>
          While I can work with frontend technologies when needed, my true passion is the 
          backend - where data flows, logic executes, and infrastructure scales to meet demand.
        </p>
        
        <div class="tech-stack">
          <h4>Core Technologies:</h4>
          <div class="tech-tags">
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">Python</span>
            <span class="tech-tag">PostgreSQL</span>
            <span class="tech-tag">MongoDB</span>
            <span class="tech-tag">Docker</span>
            <span class="tech-tag">Kubernetes</span>
            <span class="tech-tag">AWS</span>
            <span class="tech-tag">Redis</span>
          </div>
        </div>
      </div>
      
      <div class="stats-grid">
        {#each stats as stat}
          <div class="stat-card card">
            <div class="stat-value gradient-text">{stat.value}</div>
            <div class="stat-label">{stat.label}</div>
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
  
  .about-content {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--spacing-4xl);
    align-items: start;
  }
  
  .about-text h3 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-lg);
  }
  
  .about-text p {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    margin-bottom: var(--spacing-lg);
  }
  
  .tech-stack {
    margin-top: var(--spacing-2xl);
  }
  
  .tech-stack h4 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }
  
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
  
  .tech-tag {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-bg-tertiary);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-text-secondary);
    transition: all var(--duration-base);
  }
  
  .tech-tag:hover {
    border-color: var(--color-accent-1);
    color: var(--color-accent-1);
    transform: translateY(-2px);
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
  }
  
  .stat-card {
    text-align: center;
    padding: var(--spacing-xl);
  }
  
  .stat-value {
    font-size: var(--font-size-4xl);
    font-weight: 800;
    font-family: var(--font-display);
    margin-bottom: var(--spacing-sm);
  }
  
  .stat-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-weight: 500;
  }
  
  @media (max-width: 968px) {
    .about-content {
      grid-template-columns: 1fr;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
