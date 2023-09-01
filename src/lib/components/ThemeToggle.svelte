<script>
	import { createEventDispatcher, onMount } from 'svelte';

	export let theme;

	let selected = theme.current;
	const dispatch = createEventDispatcher();
	let colorImage = '#1E1E1E';
	let firstClassDropdownMenu = 'dropdown-list',
		firstClassDropdownButton = 'dropdown-button',
		classDropdownMenu = '',
		clasDropdownButton = '';

	let isOpen = false;
	let isSystemTheme = false;
	let isDarkTheme = false;
	let sourceImage = `icons/sun.svg`;

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		isSystemTheme = localStorage.getItem('useSystemTheme');
		try {
			if (savedTheme) {
				theme.current = savedTheme;
			}
			selected = theme.current;
			dispatchSelectedTheme(selected);
			selectedColorClassDropdown();
			selectedImageButton(selected);
		} catch {
			console.log(error);
		}
		detectTheme(); // Визначаємо тему при завантаженні
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener(detectTheme);
	});

	const detectTheme = () => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		isDarkTheme = prefersDark;
	};

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	const closeDropdown = () => {
		isOpen = false;
	};

	const selectOption = (event) => {
		selected = event.target.id;
		localStorage.setItem('useSystemTheme', selected === 'default' ? true : false);
		isSystemTheme = localStorage.getItem('useSystemTheme');
		selectedImageButton(selected);
		selectedColorClassDropdown();
		dispatchSelectedTheme(selected);
		closeDropdown();
	};

	const selectedColorClassDropdown = () => {
		if (selected === 'dark') {
			colorImage = 'white';
			classDropdownMenu = firstClassDropdownMenu + ' dropdown-dark';
			clasDropdownButton = firstClassDropdownButton + ' button-dark';
		} else if (selected === 'light') {
			colorImage = '#1E1E1E';
			classDropdownMenu = firstClassDropdownMenu + ' dropdown-light';
			clasDropdownButton = firstClassDropdownButton + ' button-light';
		} else {
			getComputerStyleColor();
		}
	};

	const getComputerStyleColor = () => {
		if (isDarkTheme) {
			colorImage = 'white';
			classDropdownMenu = firstClassDropdownMenu + ' dropdown-dark';
			clasDropdownButton = firstClassDropdownButton + ' button-dark';
			selected = 'dark';
		} else {
			colorImage = '#1E1E1E';
			classDropdownMenu = firstClassDropdownMenu + ' dropdown-light';
			clasDropdownButton = firstClassDropdownButton + ' button-light';
			selected = 'light';
		}
	};

	const selectedImageButton = (selectedThemeImage) => {
		if (selectedThemeImage === 'dark') {
			sourceImage = `icons/moon.svg`;
		} else if (selectedThemeImage === 'light') {
			sourceImage = `icons/sun-inv.svg`;
		} else if (isSystemTheme) {
			if (isDarkTheme) {
				sourceImage = `icons/lightbulb.svg`;
			} else {
				sourceImage = `icons/lightbulb-inv.svg`;
			}
		} 
	};

	const dispatchSelectedTheme = (selected) => {
		dispatch('change', { theme: selected });
	};
</script>

<div class="dropdown">
	<button class={clasDropdownButton} on:click={toggleDropdown}>
		<img src={sourceImage} alt="Icon theme" />
	</button>
	<ul
		class={classDropdownMenu}
		style="display: {isOpen ? 'block' : 'none'};"
		on:click={selectOption}
	>
		<li class="dropdown-element" id="dark">
			<img
				src="icons/moon.svg"
				alt="Dark icon"
				style="display: {selected === 'dark' ? 'block' : 'none'};"
			/>
			<img
				src="icons/moon-inv.svg"
				alt="Dark icon"
				style="display: {selected === 'dark' ? 'none' : 'block'};"
			/>
			Dark theme
		</li>
		<li class="dropdown-element" id="light">
			<img
				src="icons/sun.svg"
				alt="Light icon"
				style="display: {selected === 'dark' ? 'block' : 'none'};"
			/>
			<img
				src="icons/sun-inv.svg"
				alt="Light icon"
				style="display: {selected === 'dark' ? 'none' : 'block'};"
			/>
			Light theme
		</li>
		<li class="dropdown-element" id="default">
			<img
				src="icons/lightbulb.svg"
				alt="System icon"
				style="display: {selected === 'dark' ? 'block' : 'none'};"
			/>
			<img
				src="icons/lightbulb-inv.svg"
				alt="Dark icon"
				style="display: {selected === 'dark' ? 'none' : 'block'};"
			/>
			System
		</li>
	</ul>
</div>

<style>
	.dropdown {
		position: relative;
		display: flex;
	}

	.dropdown-button {
		display: inline-flex;
		padding: 0.5rem 0.75rem;
		align-items: center;
		gap: 0.75rem;
		border-radius: 3.125rem;
		border: 2px solid var(--slight-basic, rgba(255, 255, 255, 0.12));
		background-color: #1e1e1e;
		cursor: pointer;
	}

	.button-light {
		background-color: white;
	}

	.button-dark {
		background-color: #1e1e1e;
	}
	li {
		display: flex;
		padding: 0.5rem;
		width: 10rem;
		align-items: center;
		margin: 3px;
		justify-content: space-evenly;
		cursor: pointer;
	}

	.dropdown-list {
		display: flex;
		align-self: center;
		justify-self: center;
		position: absolute;
		top: 100%;
		right: 30px;
		background-color: #fff;
		border: 1px solid #ccc;
		padding: 0.5rem;
		list-style: none;
		color: black;
		border-radius: 0.75rem;
		border: 2px solid var(--slight-basic, rgba(255, 255, 255, 0.12));
		box-shadow: 0px 0px 24px 0px rgba(255, 255, 255, 0.12);
	}
	.dropdown-light {
		background-color: #fff;
		color: black;
	}
	.dropdown-dark {
		background-color: #1e1e1e;
		color: white;
	}
</style>
