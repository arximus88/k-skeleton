<!-- src/routes/misc/+page.svelte -->
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	// Масив з посиланнями для кращої організації
	const links = [
		{
			title: 'AI Meme Cats Sticker Pack',
			url: 'https://t.me/addstickers/aimemecats',
			description: 'Додайте стікери з котами, згенеровані за допомогою Midjourney',
			icon: '🐱'
		},
		{
			title: 'Мій Instagram',
			url: 'https://www.instagram.com/arximus88/',
			description: 'Слідкуйте за моїми оновленнями',
			icon: '📸'
		},
		{
			title: 'GitHub',
			url: 'https://github.com/arximus88/k-projekt',
			description: 'Код цього веб-сайту',
			icon: '💻'
		}
	];

	// Масив з кредитами
	const credits = [
		{
			title: 'Dmytro',
			url: 'https://github.com/dmmat',
			description: 'За допомогу в розробці'
		},
		{
			title: 'Claude',
			url: 'https://anthropic.com/claude',
			description: 'За допомогу з кодом та ідеями'
		},
		{
			title: 'SvelteKit',
			url: 'https://kit.svelte.dev',
			description: 'Фреймворк для розробки'
		},
		{
			title: 'Tomislav Jakupec',
			url: 'https://pixabay.com/users/tommyvideo-3092371/',
			description: 'Відео на фоні з Pixabay'
		}
	];

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Borys's Miscellaneous</title>
	<meta name="description" content="Різні цікаві посилання та інформація" />
</svelte:head>

<div class="misc-container">
	<h1 class="title">Різне</h1>
	
	<section class="links-section">
		<h2>Цікаві посилання</h2>
		<div class="links-grid">
			{#each links as link}
				<a 
					href={link.url} 
					target="_blank" 
					rel="noopener noreferrer" 
					class="link-card"
					class:fade-in={mounted}
				>
					<div class="link-icon">{link.icon}</div>
					<div class="link-content">
						<h3>{link.title}</h3>
						<p>{link.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section class="credits-section">
		<h2>Подяки</h2>
		<div class="credits-list">
			{#each credits as credit, i}
				<div class="credit-item" style="animation-delay: {i * 100}ms">
					<h3>
						<a href={credit.url} target="_blank" rel="noopener noreferrer">
							{credit.title}
						</a>
					</h3>
					<p>{credit.description}</p>
				</div>
			{/each}
		</div>
	</section>
</div>

<Footer className="misc" />

<style>
	.misc-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.title {
		font-size: 3rem;
		margin-bottom: 2rem;
		color: var(--primary-basic);
		text-align: center;
	}

	.links-section, .credits-section {
		margin-bottom: 3rem;
	}

	h2 {
		font-size: 2rem;
		margin-bottom: 1.5rem;
		color: var(--secondary-basic);
		border-bottom: 1px solid var(--slight-basic);
		padding-bottom: 0.5rem;
	}

	.links-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.link-card {
		display: flex;
		align-items: center;
		padding: 1.5rem;
		background: var(--card-bg);
		border-radius: 12px;
		border: 1px solid var(--slight-basic);
		text-decoration: none;
		transition: all 0.3s ease;
		opacity: 0;
		transform: translateY(20px);
	}

	.fade-in {
		opacity: 1;
		transform: translateY(0);
		transition: opacity 0.5s ease, transform 0.5s ease;
	}

	.link-card:hover {
		border-color: var(--tertiary-basic);
		transform: translateY(-5px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.link-icon {
		font-size: 2rem;
		margin-right: 1rem;
	}

	.link-content h3 {
		color: var(--primary-basic);
		margin: 0 0 0.5rem 0;
	}

	.link-content p {
		color: var(--secondary-basic);
		margin: 0;
	}

	.credits-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.credit-item {
		padding: 1rem;
		border-radius: 8px;
		background: var(--card-bg);
		border: 1px solid var(--slight-basic);
		animation: fadeIn 0.5s ease forwards;
		opacity: 0;
	}

	.credit-item h3 {
		margin: 0 0 0.5rem 0;
	}

	.credit-item a {
		color: var(--primary-basic);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.credit-item a:hover {
		color: var(--tertiary-basic);
		text-decoration: underline;
	}

	.credit-item p {
		color: var(--secondary-basic);
		margin: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.links-grid, .credits-list {
			grid-template-columns: 1fr;
		}
	}

	:global(.misc) {
		text-align: center;
		margin-top: 3rem;
		padding: 1.5rem 0;
		border-top: 1px solid var(--slight-basic);
	}
</style>
