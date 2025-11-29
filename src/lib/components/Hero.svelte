<script lang="ts">
  import { onMount } from 'svelte';
  
  let visible = $state(false);
  
  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
  
  const roles = ['Backend Developer', 'DevOps Engineer', 'Database Architect'];
  let currentRole = $state(0);
  
  onMount(() => {
    const interval = setInterval(() => {
      currentRole = (currentRole + 1) % roles.length;
    }, 3000);
    
    return () => clearInterval(interval);
  });
</script>

<section id="home" class="hero">
  <div class="container hero-content">
    <div class="hero-text" class:visible>
      <p class="greeting">Hi, I'm</p>
      <h1 class="name">
        <span class="gradient-text">Yasar Arafath</span>
      </h1>
      <div class="role-container">
        <h2 class="role">
          {#key currentRole}
            <span class="role-text">{roles[currentRole]}</span>
          {/key}
        </h2>
      </div>
      <p class="description">
        I build scalable backend systems, design robust database architectures, 
        and automate infrastructure with modern DevOps practices to power mission-critical applications.
      </p>
      
      <div class="cta-buttons">
        <a href="#projects" class="btn btn-primary">
          View My Work
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
        <a href="#contact" class="btn btn-secondary">
          Get In Touch
        </a>
      </div>
    </div>
    
    <div class="hero-visual" class:visible>
      <div class="floating-card card-1">
        <div class="icon">🚀</div>
        <p>Scalable Systems</p>
      </div>
      <div class="floating-card card-2">
        <div class="icon">🔄</div>
        <p>CI/CD Automation</p>
      </div>
      <div class="floating-card card-3">
        <div class="icon">🛡️</div>
        <p>High Reliability</p>
      </div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
    </div>
  </div>
  
  <div class="scroll-indicator">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-top: var(--spacing-4xl);
    overflow: hidden;
  }
  
  .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-4xl);
    align-items: center;
  }
  
  .hero-text {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  
  .hero-text.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .greeting {
    font-size: var(--font-size-xl);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-sm);
    font-weight: 500;
  }
  
  .name {
    font-size: var(--font-size-7xl);
    font-weight: 800;
    margin-bottom: var(--spacing-md);
    line-height: 1;
  }
  
  .role-container {
    height: 60px;
    margin-bottom: var(--spacing-lg);
  }
  
  .role {
    font-size: var(--font-size-3xl);
    color: var(--color-text-secondary);
    font-weight: 600;
  }
  
  .role-text {
    display: inline-block;
    animation: fadeInUp 0.5s ease-out;
  }
  
  .description {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    max-width: 600px;
    margin-bottom: var(--spacing-2xl);
  }
  
  .cta-buttons {
    display: flex;
    gap: var(--spacing-lg);
    flex-wrap: wrap;
  }
  
  .hero-visual {
    position: relative;
    height: 500px;
    opacity: 0;
    transform: scale(0.9);
    transition: all 1s ease-out 0.3s;
  }
  
  .hero-visual.visible {
    opacity: 1;
    transform: scale(1);
  }
  
  .floating-card {
    position: absolute;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    padding: var(--spacing-lg);
    border-radius: var(--radius-xl);
    border: 1px solid var(--glass-border);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    box-shadow: var(--shadow-lg);
  }
  
  .card-1 {
    top: 20%;
    left: 10%;
    animation: float 3s ease-in-out infinite;
  }
  
  .card-2 {
    top: 50%;
    right: 10%;
    animation: float 3s ease-in-out infinite 1s;
  }
  
  .card-3 {
    bottom: 15%;
    left: 20%;
    animation: float 3s ease-in-out infinite 2s;
  }
  
  .floating-card .icon {
    font-size: var(--font-size-3xl);
  }
  
  .floating-card p {
    margin: 0;
    font-weight: 600;
    color: var(--color-text-primary);
  }
  
  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.3;
    animation: gradient-shift 8s ease infinite;
  }
  
  .orb-1 {
    width: 300px;
    height: 300px;
    background: var(--gradient-primary);
    top: 10%;
    right: 10%;
  }
  
  .orb-2 {
    width: 250px;
    height: 250px;
    background: linear-gradient(135deg, var(--color-accent-3), var(--color-accent-4));
    bottom: 20%;
    left: 15%;
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: var(--spacing-2xl);
    left: 50%;
    transform: translateX(-50%);
    animation: float 2s ease-in-out infinite;
    color: var(--color-text-secondary);
  }
  
  @media (max-width: 968px) {
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .hero-visual {
      display: none;
    }
    
    .description {
      margin-left: auto;
      margin-right: auto;
    }
    
    .cta-buttons {
      justify-content: center;
    }
    
    .name {
      font-size: var(--font-size-5xl);
    }
  }
  
  @media (max-width: 480px) {
    .name {
      font-size: var(--font-size-4xl);
    }
    
    .role {
      font-size: var(--font-size-2xl);
    }
    
    .cta-buttons {
      flex-direction: column;
      width: 100%;
    }
    
    .btn {
      width: 100%;
    }
  }
</style>
