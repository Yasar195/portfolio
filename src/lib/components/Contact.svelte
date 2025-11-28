<script lang="ts">
  let formData = $state({
    name: '',
    email: '',
    message: ''
  });
  
  let loading = $state(false);
  let success = $state(false);
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    loading = true;
    
    // Simulate form submission
    setTimeout(() => {
      loading = false;
      success = true;
      formData = { name: '', email: '', message: '' };
      
      setTimeout(() => {
        success = false;
      }, 3000);
    }, 1500);
  };
  
  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'github',
      url: 'https://github.com',
      color: '#fff'
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://linkedin.com',
      color: '#0077b5'
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      url: 'https://twitter.com',
      color: '#1da1f2'
    },
    {
      name: 'Email',
      icon: 'mail',
      url: 'mailto:yasar@example.com',
      color: '#ea4335'
    }
  ];
</script>

<section id="contact" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">
        Get In <span class="gradient-text">Touch</span>
      </h2>
      <p class="section-subtitle">
        Have a project in mind? Let's work together to create something amazing
      </p>
    </div>
    
    <div class="contact-content">
      <div class="contact-info">
        <h3>Let's Connect</h3>
        <p>
          I'm always open to discussing new projects, creative ideas, or 
          opportunities to be part of your vision. Feel free to reach out!
        </p>
        
        <div class="social-links">
          {#each socialLinks as social}
            <a 
              href={social.url} 
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              {#if social.icon === 'github'}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              {:else if social.icon === 'linkedin'}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              {:else if social.icon === 'twitter'}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              {:else if social.icon === 'mail'}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              {/if}
              <span>{social.name}</span>
            </a>
          {/each}
        </div>
      </div>
      
      <form class="contact-form card" onsubmit={handleSubmit}>
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            bind:value={formData.name}
            required
            placeholder="Your name"
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            bind:value={formData.email}
            required
            placeholder="your.email@example.com"
          />
        </div>
        
        <div class="form-group">
          <label for="message">Message</label>
          <textarea 
            id="message" 
            rows="5"
            bind:value={formData.message}
            required
            placeholder="Tell me about your project..."
          ></textarea>
        </div>
        
        <button type="submit" class="btn btn-primary" disabled={loading}>
          {#if loading}
            Sending...
          {:else if success}
            Sent! ✓
          {:else}
            Send Message
          {/if}
        </button>
        
        {#if success}
          <p class="success-message">Thanks for reaching out! I'll get back to you soon.</p>
        {/if}
      </form>
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
  
  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: var(--spacing-4xl);
    align-items: start;
  }
  
  .contact-info h3 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-lg);
  }
  
  .contact-info p {
    font-size: var(--font-size-lg);
    line-height: 1.8;
    margin-bottom: var(--spacing-2xl);
  }
  
  .social-links {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .social-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    background: var(--color-bg-secondary);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all var(--duration-base);
    color: var(--color-text-primary);
  }
  
  .social-link:hover {
    border-color: var(--color-accent-1);
    transform: translateX(8px);
    box-shadow: var(--shadow-md);
  }
  
  .social-link svg {
    flex-shrink: 0;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  label {
    font-weight: 600;
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
  }
  
  input,
  textarea {
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: var(--color-bg-tertiary);
    color: var(--color-text-primary);
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    transition: all var(--duration-base);
  }
  
  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-accent-1);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  button[type="submit"] {
    width: 100%;
  }
  
  button[disabled] {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .success-message {
    color: var(--color-accent-4);
    font-weight: 500;
    text-align: center;
    animation: fadeInUp 0.5s ease-out;
  }
  
  @media (max-width: 968px) {
    .contact-content {
      grid-template-columns: 1fr;
    }
  }
</style>
