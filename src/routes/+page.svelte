<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Writings from '$lib/components/Writings.svelte';
  import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
  <title>Yasar Arafath - Backend Developer & DevOps Engineer</title>
  <meta name="description" content="Portfolio of Yasar Arafath - Backend Developer specializing in scalable systems, database architecture, and DevOps automation with Node.js, Python, Docker, and Kubernetes." />
  <meta name="keywords" content="Backend Developer, DevOps Engineer, Database Architect, Node.js, Python, Docker, Kubernetes, AWS, PostgreSQL" />
  <meta name="author" content="Yasar Arafath" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Yasar Arafath - Backend Developer & DevOps Engineer" />
  <meta property="og:description" content="Building scalable backend systems and automating infrastructure" />
  <meta property="og:type" content="website" />
  
  <!-- Viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<Hero />
<About />
<Writings />
<Skills />
<Contact />
