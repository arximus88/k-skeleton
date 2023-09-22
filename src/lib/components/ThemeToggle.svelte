<script>
	import { createEventDispatcher, onMount } from 'svelte';

	export let theme;

	let selected = theme.current;
	const dispatch = createEventDispatcher();

	let isSystemTheme = false;
	let isDarkTheme = false;

	let selectedImage = '';
	let showOptions = false;
	let options = [
		{ label: 'Dark Theme', image: 'icons/moon.svg', value: 'dark' },
		{ label: 'Light Theme', image: 'icons/sun.svg', value: 'light' },
		{ label: 'System', image: 'icons/lightbulb.svg', value: 'default' }
	];

	onMount(() => {
		isSystemTheme = JSON.parse(localStorage.getItem('useSystemTheme'));
		try {
			selected = isSystemTheme ? 'default' : theme.current;
			let selectedElementCollection = searchElementOptions(selected);
			handleSelect(selectedElementCollection);
			dispatchSelectedTheme(selected);
		} catch {
			console.log(error);
		}	
	})

	
	const searchElementOptions = (selectedTheme) => {
		return options.find((item) => item.value === selectedTheme);
	};

	const detectTheme = () => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		isDarkTheme = prefersDark;
	};

	const checkDefaultTheme = () => {
		isSystemTheme = selected === 'default' ? true : false;
		localStorage.setItem('useSystemTheme', isSystemTheme);
		if (isSystemTheme) {
			detectTheme();
			selected = isDarkTheme ? 'dark' : 'light';
		}
	};

	const dispatchSelectedTheme = (selected) => {
		dispatch('change', { theme: selected });
	};

	function toggleOptions() {
		showOptions = !showOptions;
	}

	function handleSelect(option) {
		selectedImage = option.image;
		selected = option.value;
		checkDefaultTheme();
		showOptions = false;
		dispatchSelectedTheme(selected);
	}
</script>

<div class="custom-select">
	<div class="select-container">
		<div
			class="select-selected {selected === 'dark' ? '' : 'toggle-color'}"
			on:click={toggleOptions}
		>
			<img src={selectedImage} alt="" />
			<div class="select-arrow" />
		</div>
		<div
			class="select-items {selected === 'dark' ? '' : 'toggle-color'}"
			style="display: {showOptions ? 'block' : 'none'}"
		>
			{#each options as option}
				<div on:click={() => handleSelect(option)}>
					<img src={option.image} alt="" />
					{option.label}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.custom-select {
		position: relative;
		margin-right: 64px;
	}

	.select-container {
		position: relative;
	}

	.select-selected {
		display: inline-flex;
		padding: 0.36rem 0.5rem;
		align-items: center;
		gap: 0.75rem;
		border-radius: 3.125rem;
		border: 2px solid var(----slight-basic, rgba(255, 255, 255, 0.12));
		background: #1e1e1e;
		cursor: pointer;
		color: #ffffffcc;
	}

	.select-selected img {
		margin-right: 10px;
		width: 20px;
		height: 20px;
	}

	.select-arrow {
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 6px solid #ccc;
	}

	.select-items {
		display: flex;
		width: 11.75rem;
		padding: 0.5rem;
		flex-direction: column;
		align-items: flex-start;
		position: absolute;
		margin-top: 15px;
		right: 0px;
		min-width: 200px;
		border-radius: 0.75rem;
		border: 2px solid var(----slight-basic, rgba(255, 255, 255, 0.12));
		background: #1e1e1e;
		box-shadow: 0px 0px 24px 0px rgba(255, 255, 255, 0.12);
		z-index: 1;
	}

	.select-items div {
		display: inline-flex;
		padding: 0.625rem;
		align-items: center;
		gap: 0.625rem;
		cursor: pointer;
		color: #ffffffcc;
	}

	.select-items div:last-child {
		border-bottom: none;
	}

	.toggle-color {
		filter: invert(1);
	}
</style>
