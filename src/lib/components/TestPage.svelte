<script lang="ts">
	import { onMount } from 'svelte';

	let jsonData: Record<string, any> | null = null;

  onMount(async () => {
    const response = await fetch('src/lib/projects-table.json');
    jsonData = await response.json();
  });

	function displayObject(obj: Record<string, any>, indent = 0): string {
		let output = '';
		for (const key in obj) {
			const value = obj[key];
			if (typeof value === 'object') {
				output += `${' '.repeat(indent)}${key}:\n`;
				output += displayObject(value, indent + 2);
			} else {
				output += `${' '.repeat(indent)}${key}: ${value}\n`;
			}
		}
		return output;
	}
</script>

{#if jsonData}
	<pre>{@html displayObject(jsonData)}</pre>
{:else}
	<p>Loading data...</p>
{/if}
