<script lang="ts">
	import Icons from './Icons.svelte';
	export let platforms: string[] | string = [];

	// Функція для обробки рядка з комами в масив
	function processCommaSeparated(input: string | string[]): string[] {
		if (typeof input === 'string') {
			return input.split(/[,\s]+/).filter(item => item.trim() !== '');
		}
		return Array.isArray(input) ? input : [];
	}

	// Обробляємо платформи
	const processedPlatforms = processCommaSeparated(platforms);
</script>

{#each processedPlatforms as platform}
	<Icons name={platform} size={16} />
{/each}
