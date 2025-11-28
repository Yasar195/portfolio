<script lang="ts">
  import { onMount } from 'svelte';
  
  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);
  
  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  
  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };
  
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' }
  ];
</script>

<nav class="nav" class:scrolled>
  <div class="container nav-container">
    <a href="/" class="logo">
      <span class="gradient-text">Yasar</span>
    </a>
    
    <ul class="nav-links" class:mobile-open={mobileMenuOpen}>
      {#each navLinks as link}
        <li>
          <a 
            href={link.href} 
            onclick={() => mobileMenuOpen = false}
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
    
    <button 
      class="mobile-menu-btn" 
      onclick={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      {#if mobileMenuOpen}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      {/if}
    </button>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-sticky);
    transition: all var(--duration-base);
    padding: var(--spacing-lg) 0;
  }
  
  .nav.scrolled {
    background: rgba(26, 26, 36, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-md) 0;
  }
  
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: 700;
    text-decoration: none;
    transition: transform var(--duration-base);
  }
  
  .logo:hover {
    transform: scale(1.05);
  }
  
  .nav-links {
    display: flex;
    gap: var(--spacing-2xl);
    list-style: none;
  }
  
  .nav-links a {
    color: var(--color-text-secondary);
    font-weight: 500;
    font-size: var(--font-size-base);
    transition: all var(--duration-base);
    position: relative;
  }
  
  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: width var(--duration-base);
  }
  
  .nav-links a:hover {
    color: var(--color-text-primary);
  }
  
  .nav-links a:hover::after {
    width: 100%;
  }
  
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--color-text-primary);
    cursor: pointer;
    padding: var(--spacing-sm);
  }
  
  @media (max-width: 768px) {
    .mobile-menu-btn {
      display: block;
    }
    
    .nav-links {
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: 70%;
      max-width: 300px;
      background: var(--color-bg-secondary);
      flex-direction: column;
      padding: var(--spacing-4xl) var(--spacing-xl);
      gap: var(--spacing-xl);
      transition: right var(--duration-base);
      box-shadow: var(--shadow-xl);
    }
    
    .nav-links.mobile-open {
      right: 0;
    }
  }
</style>
