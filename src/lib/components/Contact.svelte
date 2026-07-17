<script lang="ts">
  import { onMount } from 'svelte';
  
  let sectionEl: HTMLElement;
  let visible = $state(false);
  let formData = $state({ name: '', email: '', message: '' });
  let loading = $state(false);
  let success = $state(false);
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) { visible = true; observer.disconnect(); } }); },
      { threshold: 0.1 }
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    loading = true;
    setTimeout(() => {
      loading = false;
      success = true;
      formData = { name: '', email: '', message: '' };
      setTimeout(() => { success = false; }, 3000);
    }, 1500);
  };
  
  const socials = [
    { name: 'GitHub', url: 'https://github.com/Yasar195', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yasararafathdev/', icon: 'linkedin' },
    { name: 'Twitter / X', url: 'https://x.com/Yasararafathdev', icon: 'twitter' }
  ];
</script>

<section id="contact" class="section" bind:this={sectionEl}>
  <div class="container">
    <div class="contact-header" class:visible>
      <div class="section-divider"></div>
      <h2>Get In <span class="gradient-text">Touch</span></h2>
      <p class="contact-subtitle">Have a project in mind? Let's work together.</p>
    </div>
    
    <div class="contact-grid" class:visible>
      <div class="contact-info">
        <p class="info-text">
          I'm always open to discussing new projects, creative ideas, or 
          opportunities to be part of your vision.
        </p>
        <div class="social-row">
          {#each socials as social}
            <a href={social.url} class="social-btn" target="_blank" rel="noopener noreferrer" aria-label={social.name}>
              {#if social.icon === 'github'}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              {:else if social.icon === 'linkedin'}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
              {/if}
              <span>{social.name}</span>
            </a>
          {/each}
        </div>
      </div>
      
      <form class="contact-form" onsubmit={handleSubmit}>
        <div class="form-row">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" bind:value={formData.name} required placeholder="Your name" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" bind:value={formData.email} required placeholder="you@example.com" />
          </div>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" rows="5" bind:value={formData.message} required placeholder="Tell me about your project..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary submit-btn" disabled={loading}>
          {#if loading}Sending...{:else if success}Sent ✓{:else}Send Message{/if}
        </button>
        {#if success}
          <p class="success-msg">Thanks for reaching out! I'll get back to you soon.</p>
        {/if}
      </form>
    </div>
  </div>
</section>

<style>
  .contact-header { text-align: center; margin-bottom: var(--spacing-3xl); opacity: 0; transform: translateY(20px); transition: all 0.6s var(--ease-out); }
  .contact-header.visible { opacity: 1; transform: translateY(0); }
  .contact-header .section-divider { margin: 0 auto var(--spacing-xl); }
  .contact-header h2 { font-size: var(--font-size-5xl); margin-bottom: var(--spacing-sm); }
  .contact-subtitle { color: var(--color-text-muted); margin: 0; }
  
  .contact-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: var(--spacing-4xl); align-items: start; opacity: 0; transform: translateY(16px); transition: all 0.7s var(--ease-out) 0.15s; }
  .contact-grid.visible { opacity: 1; transform: translateY(0); }
  
  .info-text { font-size: var(--font-size-lg); line-height: 1.8; color: var(--color-text-secondary); margin-bottom: var(--spacing-2xl); }
  
  .social-row { display: flex; flex-wrap: wrap; gap: var(--spacing-sm); }
  .social-btn { display: inline-flex; align-items: center; gap: var(--spacing-sm); padding: 0.5rem 1rem; border-radius: var(--radius-lg); border: 1px solid var(--card-border); color: var(--color-text-secondary); font-size: var(--font-size-sm); font-weight: 500; transition: all var(--duration-base) var(--ease-out); }
  .social-btn:hover { border-color: var(--color-accent-1); color: var(--color-accent-1); transform: translateY(-2px); }
  .social-btn svg { flex-shrink: 0; }
  
  .contact-form { display: flex; flex-direction: column; gap: var(--spacing-lg); background: var(--color-bg-secondary); border: 1px solid var(--card-border); border-radius: var(--radius-xl); padding: var(--spacing-2xl); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg); }
  .form-group { display: flex; flex-direction: column; gap: var(--spacing-xs); }
  label { font-weight: 600; font-size: var(--font-size-sm); color: var(--color-text-primary); }
  input, textarea { padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--card-border); background: var(--color-bg-tertiary); color: var(--color-text-primary); font-family: var(--font-body); font-size: var(--font-size-base); transition: all var(--duration-base) var(--ease-out); }
  input:focus, textarea:focus { outline: none; border-color: var(--color-accent-1); box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1); }
  textarea { resize: vertical; min-height: 120px; }
  .submit-btn { width: 100%; }
  button[disabled] { opacity: 0.7; cursor: not-allowed; }
  .success-msg { color: var(--color-accent-4); font-weight: 500; text-align: center; font-size: var(--font-size-sm); animation: fadeInUp 0.4s var(--ease-out); margin: 0; }
  
  @media (max-width: 968px) { .contact-grid { grid-template-columns: 1fr; } }
  @media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
</style>
