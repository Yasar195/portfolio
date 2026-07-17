<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-divider"></div>
    <div class="footer-row">
      <p class="footer-copy">&copy; {currentYear} Yasar Arafath</p>
      <div class="footer-socials">
        <a href="https://github.com/Yasar195" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
        <a href="https://www.linkedin.com/in/yasararafathdev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href="https://x.com/Yasararafathdev" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    padding: var(--spacing-xl) 0 var(--spacing-2xl);
  }
  
  .footer-divider {
    width: 100%;
    height: 1px;
    background: var(--gradient-brand);
    opacity: 0.2;
    margin-bottom: var(--spacing-xl);
  }
  
  .footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }
  
  .footer-copy {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin: 0;
  }
  
  .footer-socials {
    display: flex;
    gap: var(--spacing-md);
  }
  
  .footer-socials a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    transition: all var(--duration-base) var(--ease-out);
  }
  
  .footer-socials a:hover {
    color: var(--color-accent-1);
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    .footer-row {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
