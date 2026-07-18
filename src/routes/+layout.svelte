<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<Navigation />
	<main>
		{@render children()}
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
