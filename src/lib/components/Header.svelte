<script>
	let logo = '/images/logo-bo.png';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let theme = { current: 'dark' };

	import { onMount } from 'svelte';

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			theme.current = savedTheme;
		}
		document.documentElement.setAttribute('data-theme', theme.current);
	});

	function handleThemeChange() {
		const newTheme = theme.current === 'dark' ? 'light' : 'dark';
		theme.current = newTheme;
		localStorage.setItem('theme', newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
	}
</script>

<header>
	<div class="corner">
		<a class="logo-block" href="/">
			<img class="logo" src={logo} alt="SvelteKit" />
			<h3>Borys's Place</h3>
		</a>
	</div>

	<div class="corner">
		<ThemeToggle on:click={handleThemeChange} {theme} />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
	.logo-block {
		display: flex;
		gap: 8px;
	}
	.logo {
		width: 32px;
		height: 32px;
	}
	.corner {
		padding-left: 64px;
		padding-top: 32px;
	}

	.corner a {
		color: var(--secondary-basic);
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: start;
		width: 100%;
		height: 100%;
	}

	/* .corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	} */

	a:hover {
		color: var(--primary-basic);
	}

	@media (max-width: 1200px) {
		.corner {
			padding-left: 12px;
			padding-top: 12px;
		}
	}
</style>
