<script lang="ts">
  import { onMount } from 'svelte';
  
  let visible = $state(false);
  
  onMount(() => {
    // Stagger the entrance
    requestAnimationFrame(() => {
      visible = true;
    });
  });
  
  const roles = ['Backend Developer', 'DevOps Engineer', 'Database Architect', 'SRE'];
  let currentRole = $state(0);
  
  onMount(() => {
    const interval = setInterval(() => {
      currentRole = (currentRole + 1) % roles.length;
    }, 3000);
    return () => clearInterval(interval);
  });
</script>

<section id="home" class="hero">
  <!-- Ambient background -->
  <div class="hero-ambient">
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
  </div>
  
  <div class="container hero-content">
    <div class="hero-top" class:visible>
      <p class="hero-label">DevOps Engineer · Backend Engineer · SRE</p>
    </div>

    <div class="hero-main" class:visible>
      <h1 class="hero-name">
        <span class="line">Yasar</span>
        <span class="line"><span class="gradient-text">Arafath</span></span>
      </h1>
    </div>

    <div class="hero-bottom" class:visible>
      <div class="hero-left">
        <div class="role-ticker">
          {#key currentRole}
            <span class="role-text">{roles[currentRole]}</span>
          {/key}
        </div>
        <p class="hero-bio">
          I build scalable backend systems, design robust database architectures, 
          and automate infrastructure with modern DevOps practices to power 
          mission-critical applications.
        </p>
        <div class="hero-cta">
          <a href="https://projects.yasararafath.in" class="btn btn-primary">
            View My Work
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
          <a href="#contact" class="btn btn-secondary">Get In Touch</a>
        </div>
      </div>
      
      <div class="hero-right">
        <div class="social-links">
          <a href="https://github.com/Yasar195" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/yasararafathdev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://x.com/Yasararafathdev" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" class="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <div class="scroll-cue" class:visible>
    <div class="scroll-line"></div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: var(--spacing-5xl) 0 var(--spacing-4xl);
    overflow: hidden;
  }
  
  /* Ambient gradient background */
  .hero-ambient {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
  }
  
  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.15;
  }
  
  .orb-1 {
    width: 500px;
    height: 500px;
    background: var(--color-accent-1);
    top: -10%;
    right: -5%;
    animation: pulse-glow 8s ease-in-out infinite;
  }
  
  .orb-2 {
    width: 400px;
    height: 400px;
    background: var(--color-accent-3);
    bottom: -15%;
    left: -10%;
    animation: pulse-glow 8s ease-in-out infinite 4s;
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xl);
  }
  
  /* Top label */
  .hero-top {
    opacity: 0;
    transform: translateY(16px);
    transition: all 0.6s var(--ease-out) 0.1s;
  }
  
  .hero-top.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-label {
    font-size: var(--font-size-sm);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin: 0;
  }
  
  /* Main name */
  .hero-main {
    opacity: 0;
    transform: translateY(24px);
    transition: all 0.8s var(--ease-out) 0.25s;
  }
  
  .hero-main.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 10vw, var(--font-size-7xl));
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin: 0;
  }
  
  .hero-name .line {
    display: block;
  }
  
  /* Bottom split */
  .hero-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--spacing-3xl);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.7s var(--ease-out) 0.45s;
  }
  
  .hero-bottom.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-left {
    max-width: 540px;
  }
  
  .role-ticker {
    height: 2rem;
    overflow: hidden;
    margin-bottom: var(--spacing-md);
  }
  
  .role-text {
    display: inline-block;
    font-family: var(--font-body);
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-accent-1);
    animation: fadeInUp 0.4s var(--ease-out);
  }
  
  .hero-bio {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    line-height: 1.8;
    margin-bottom: var(--spacing-xl);
    max-width: 480px;
  }
  
  .hero-cta {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }
  
  /* Social links — right side */
  .hero-right {
    display: flex;
    align-items: flex-end;
  }
  
  .social-links {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    border: 1px solid var(--card-border);
    color: var(--color-text-muted);
    transition: all var(--duration-base) var(--ease-out);
  }
  
  .social-icon:hover {
    color: var(--color-text-primary);
    border-color: var(--color-accent-1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
  }
  
  /* Scroll indicator */
  .scroll-cue {
    position: absolute;
    bottom: var(--spacing-2xl);
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 1s var(--ease-out) 1.2s;
  }
  
  .scroll-cue.visible {
    opacity: 1;
  }
  
  .scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, var(--color-accent-1), transparent);
    animation: scroll-pulse 2s ease-in-out infinite;
  }
  
  @keyframes scroll-pulse {
    0%, 100% { 
      opacity: 0.3; 
      transform: scaleY(0.6); 
      transform-origin: top;
    }
    50% { 
      opacity: 1; 
      transform: scaleY(1); 
    }
  }
  
  /* Responsive */
  @media (max-width: 968px) {
    .hero-bottom {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .hero-right {
      align-items: flex-start;
    }
    
    .social-links {
      flex-direction: row;
    }
  }
  
  @media (max-width: 480px) {
    .hero {
      padding-top: var(--spacing-4xl);
    }
    
    .hero-content {
      gap: var(--spacing-2xl);
    }
    
    .hero-cta {
      flex-direction: column;
      width: 100%;
    }
    
    .hero-cta .btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
