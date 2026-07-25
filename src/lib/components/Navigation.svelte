<script lang="ts">
  import { onMount } from 'svelte';
  
  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);
  let isDark = $state(true);
  
  onMount(() => {
    // Check saved preference — default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      isDark = false;
    } else {
      isDark = true;
    }
    updateTheme();
    
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  const updateTheme = () => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };
  
  const toggleTheme = () => {
    isDark = !isDark;
    updateTheme();
  };
  
  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };
  
  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: 'https://projects.yasararafath.in', label: 'Projects' },
    { href: '/#writings', label: 'Writings' },
    { href: '/#contact', label: 'Contact' }
  ];
</script>

<nav class="nav" class:scrolled>
  <div class="container nav-container">
    <a href="/" class="logo" aria-label="Home">
      <span class="logo-text">Yasar</span><span class="logo-dot">.</span>
    </a>
    
    <ul class="nav-links" class:mobile-open={mobileMenuOpen}>
      <li class="mobile-close-row">
        <button 
          class="mobile-close-btn" 
          onclick={() => mobileMenuOpen = false}
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </li>
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
    
    {#if mobileMenuOpen}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="mobile-overlay" onclick={() => mobileMenuOpen = false} onkeydown={() => {}}></div>
    {/if}
    
    <div class="nav-actions">
      <button 
        class="theme-toggle" 
        onclick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <div class="toggle-icon" class:is-dark={isDark}>
          {#if isDark}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          {/if}
        </div>
      </button>
      
      <button 
        class="mobile-menu-btn" 
        onclick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="7" x2="20" y2="7"></line>
          <line x1="4" y1="17" x2="20" y2="17"></line>
        </svg>
      </button>
    </div>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-sticky);
    transition: all var(--duration-base) var(--ease-out);
    padding: var(--spacing-lg) 0;
  }
  
  .nav.scrolled {
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: var(--spacing-md) 0;
    border-bottom: 1px solid var(--glass-border);
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
    color: var(--color-text-primary);
    transition: opacity var(--duration-base);
    letter-spacing: -0.02em;
  }
  
  .logo:hover {
    opacity: 0.8;
    color: var(--color-text-primary);
  }
  
  .logo-dot {
    color: var(--color-accent-1);
  }
  
  .nav-links {
    display: flex;
    gap: var(--spacing-2xl);
    list-style: none;
  }
  
  .mobile-close-row {
    display: none;
  }
  
  .nav-links a {
    color: var(--color-text-muted);
    font-weight: 500;
    font-size: var(--font-size-sm);
    letter-spacing: 0.02em;
    transition: color var(--duration-base) var(--ease-out);
    position: relative;
    padding-bottom: 4px;
  }
  
  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1.5px;
    background: var(--gradient-brand);
    transition: width var(--duration-base) var(--ease-out);
    border-radius: 1px;
  }
  
  .nav-links a:hover {
    color: var(--color-text-primary);
  }
  
  .nav-links a:hover::after {
    width: 100%;
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    background: transparent;
    border: 1px solid var(--card-border);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--duration-base) var(--ease-out);
  }
  
  .theme-toggle:hover {
    border-color: var(--color-accent-1);
    color: var(--color-accent-1);
  }
  
  .toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s var(--ease-spring);
  }
  
  .toggle-icon.is-dark {
    transform: rotate(0deg);
  }
  
  .toggle-icon:not(.is-dark) {
    transform: rotate(-90deg);
  }
  
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--color-text-primary);
    cursor: pointer;
    padding: var(--spacing-xs);
  }
  
  .mobile-overlay {
    display: none;
  }
  
  @media (max-width: 768px) {
    .mobile-menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .mobile-overlay {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: calc(var(--z-sticky) + 1);
    }
    
    .nav-links {
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: 280px;
      background: var(--color-bg-primary);
      flex-direction: column;
      padding: var(--spacing-xl);
      gap: 0;
      transition: right var(--duration-slow) var(--ease-out);
      border-left: 1px solid var(--card-border);
      z-index: calc(var(--z-sticky) + 2);
    }
    
    .nav-links li {
      border-bottom: 1px solid var(--divider);
    }
    
    .nav-links li:last-child {
      border-bottom: none;
    }
    
    .nav-links a {
      display: block;
      padding: var(--spacing-md) 0;
      font-size: var(--font-size-base);
    }
    
    .nav-links a::after {
      display: none;
    }
    
    .mobile-close-row {
      display: flex;
      justify-content: flex-end;
      padding-bottom: var(--spacing-md);
      margin-bottom: var(--spacing-sm);
      border-bottom: 1px solid var(--divider) !important;
    }
    
    .mobile-close-btn {
      background: none;
      border: none;
      color: var(--color-text-secondary);
      cursor: pointer;
      padding: var(--spacing-xs);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .nav-links.mobile-open {
      right: 0;
    }
  }
</style>
