<!-- Slider component, displays a slider with a set of images from the project folder -->
<!--
take from and to from the project content block
 ```json

{"from": 1, "to": 13}

``` 
-->
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
		// Завантажуємо скрипти тільки якщо слайдер потрібно відображати
		if (from > 0 && to > 0) {
			await loadMyPageScripts();
		}
	});
	
	// Перевіряємо, чи потрібно відображати слайдер
	const showSlider = from > 0 && to > 0 && from <= to;
</script>

{#if showSlider}
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
			<a href={`/images/projects/${folder}/${number}.jpg`} title={`photo${number}`}> </a>
		{/each}
	</div>
</div>
{/if}

<style>
</style>
