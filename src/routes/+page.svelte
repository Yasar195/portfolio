<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Blog from '$lib/components/Blog.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Yasar - Backend Developer & DevOps Engineer</title>
  <meta name="description" content="Portfolio of Yasar - Backend Developer specializing in scalable systems, database architecture, and DevOps automation with Node.js, Python, Docker, and Kubernetes." />
  <meta name="keywords" content="Backend Developer, DevOps Engineer, Database Architect, Node.js, Python, Docker, Kubernetes, AWS, PostgreSQL" />
  <meta name="author" content="Yasar" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Yasar - Backend Developer & DevOps Engineer" />
  <meta property="og:description" content="Building scalable backend systems and automating infrastructure" />
  <meta property="og:type" content="website" />
  
  <!-- Viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="app">
  <Navigation />
  <main>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Blog />
    <Contact />
  </main>
  <Footer />
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  main {
    flex: 1;
  }
</style>
