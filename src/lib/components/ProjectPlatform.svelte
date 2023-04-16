<script>
	import Icons from './Icons.svelte';
	export let platforms;
</script>

{#each platforms as platform}
	<Icons name={platform} size="16" />
{/each}
