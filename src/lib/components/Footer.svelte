<script lang="ts">
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-brand">
        <h3 class="gradient-text">Yasar Arafath</h3>
        <p>Building digital experiences that make a difference.</p>
      </div>
      
      <div class="footer-links">
        <h4>Quick Links</h4>
        <ul>
          {#each quickLinks as link}
            <li>
              <a href={link.href}>{link.label}</a>
            </li>
          {/each}
        </ul>
      </div>
      
      <div class="footer-social">
        <h4>Connect</h4>
        <div class="social-icons">
          <a href="https://github.com/Yasar195" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/yasararafathdev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://x.com/Yasararafathdev" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {currentYear} Yasar Arafath. All rights reserved.</p>
      <p>Made with ❤️ using Svelte</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-bg-secondary);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: var(--spacing-4xl) 0 var(--spacing-xl);
    margin-top: var(--spacing-5xl);
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: var(--spacing-4xl);
    margin-bottom: var(--spacing-3xl);
  }
  
  .footer-brand h3 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-md);
  }
  
  .footer-brand p {
    color: var(--color-text-secondary);
    max-width: 300px;
  }
  
  .footer-links h4,
  .footer-social h4 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }
  
  .footer-links ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .footer-links a {
    color: var(--color-text-secondary);
    transition: color var(--duration-base);
  }
  
  .footer-links a:hover {
    color: var(--color-accent-1);
  }
  
  .social-icons {
    display: flex;
    gap: var(--spacing-md);
  }
  
  .social-icons a {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--color-bg-tertiary);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    transition: all var(--duration-base);
  }
  
  .social-icons a:hover {
    background: var(--gradient-primary);
    border-color: transparent;
    color: white;
    transform: translateY(-4px);
  }
  
  .footer-bottom {
    padding-top: var(--spacing-xl);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }
  
  .footer-bottom p {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    margin: 0;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }
    
    .footer-bottom {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
