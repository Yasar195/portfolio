<script lang="ts">
  import { onMount } from 'svelte';
  
  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);
  let isDark = $state(false);
  
  onMount(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    isDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    updateTheme();
    
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  
  const updateTheme = () => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };
  
  const toggleTheme = () => {
    isDark = !isDark;
    updateTheme();
  };
  
  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };
  
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' }
  ];
</script>

<nav class="nav" class:scrolled>
  <div class="container nav-container">
    <a href="/" class="logo">
      <span class="gradient-text">Yasar Arafath</span>
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
    
    <div class="nav-actions">
      <button 
        class="theme-toggle" 
        onclick={toggleTheme}
        aria-label="Toggle theme"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {#if isDark}
          <!-- Sun Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <!-- Moon Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        {/if}
      </button>
      
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
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
  }
  
  .nav.scrolled {
    background: var(--color-bg-primary);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-md) 0;
    border-bottom: 1px solid var(--card-border);
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
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--color-bg-secondary);
    border: 1px solid var(--card-border);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all var(--duration-base);
  }
  
  .theme-toggle:hover {
    background: var(--color-accent-1);
    color: white;
    transform: rotate(15deg) scale(1.05);
    border-color: transparent;
  }
  
  .theme-toggle svg {
    transition: transform var(--duration-base);
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
    
    .theme-toggle {
      display: flex;
    }
    
    .nav-links {
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: 70%;
      max-width: 300px;
      background: var(--color-bg-primary);
      flex-direction: column;
      padding: var(--spacing-4xl) var(--spacing-xl);
      gap: var(--spacing-xl);
      transition: right var(--duration-base);
      box-shadow: var(--shadow-xl);
      border-left: 1px solid var(--card-border);
    }
    
    .nav-links.mobile-open {
      right: 0;
    }
  }
</style>
