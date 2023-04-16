<script>
	export let theme;
</script>

<button on:click>
	{#if theme.current === 'dark'}
		Light
	{:else}
		Dark
	{/if}
</button>

<style>
	/* your styles here */
</style>
