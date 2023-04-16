<script>
	import Header from '$lib/components/Header.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import VideoBackground from '$lib/components/Video-background.svelte';
	import './styles.css';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';

	onMount(() => {
		if ('serviceWorker' in navigator) {
			addEventListener('load', function () {
				navigator.serviceWorker.register('/service-worker.js', {
					type: dev ? 'module' : 'classic'
				});
			});
		}
	});
</script>

<div class="app">
	<Header />
	<VideoBackground />
	<main>
		<slot />
	</main>

	<Navbar />
	<footer>
		<p>Personal website <a href="https://kharchenko.work">kharchenko.work</a> 2023</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		padding-top: 32px;
		padding-bottom: 128px;
		width: 100%;
		max-width: 1280px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
