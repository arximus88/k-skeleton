<script>
	import { onMount } from 'svelte';
	export let folder = '';
	export let from = 1;
	export let to = 1;
	// loadFotorama.js

	async function loadScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => resolve(script);
			script.onerror = (error) => reject(error);
			document.head.appendChild(script);
		});
	}

	async function loadStylesheet(href) {
		return new Promise((resolve, reject) => {
			const link = document.createElement('link');
			link.href = href;
			link.rel = 'stylesheet';
			link.onload = () => resolve(link);
			link.onerror = (error) => reject(error);
			document.head.appendChild(link);
		});
	}

	async function loadMyPageScripts() {
		try {
			await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js');
			await loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.css');
			await loadScript('https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.js');
			// All scripts and styles are loaded; you can now execute code that depends on them.
		} catch (error) {
			console.error('Error loading script or stylesheet:', error);
		}
	}

	export { loadMyPageScripts };

	onMount(async () => {
		await loadMyPageScripts();
		// You can now initialize the fotorama slider or execute any code that depends on the loaded scripts.
	});
</script>

<div class="project-slider">
	<!-- Add images to <div class="fotorama"></div> -->
	<div
		class="fotorama"
		data-width="100%"
		data-maxwidth="100%"
		data-ratio="16/9"
		data-navposition="bottom"
		data-nav="thumbs"
		data-loop="true"
		data-allowfullscreen="true"
	>
		{#each Array.from({ length: to - from + 1 }, (_, i) => from + i) as number}
			<a href={`/images/projects/${folder}/${number}.jpg`} alt={`photo${number}`}> </a>
		{/each}
		<!-- {#each Array.from({ length: to - from + 1 }, (_, i) => from + i) as number}
			<img src={`/images/projects/${folder}/${number}.jpg`} alt={`photo${number}`} />
		{/each} -->
	</div>
</div>

<style>
</style>
