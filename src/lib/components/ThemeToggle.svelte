<script>
	import { createEventDispatcher } from 'svelte';

	export let options = [{ title: 'Dark Theme', value: 'dark' }, { title: 'Light Theme', value: 'light' }, { title: 'System', value: 'dark'}];
	export let selected = null;

	
	const dispatch = createEventDispatcher();

	let isOpen = false;

	

	function selectOption(option) {
		localStorage.setItem('theme', $selected);
		document.documentElement.setAttribute('data-theme', $selected)
	}
</script>

<div class="toggle-menu">
	<select bind:value={selected} on:click>
		{#each options as option}
			<option value={option.value} on:click={selectOption}> {option.title}</option>
		{/each}
	</select>
	
</div>

<style>
	.toggle-menu {
		display: flex;
		gap: var(--size-2);
	}
</style>
