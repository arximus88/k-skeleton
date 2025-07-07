<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Button from '$lib/components/Button.svelte';

	const links = [
		{
			title: 'AI Meme Cats Sticker Pack',
			url: 'https://t.me/addstickers/aimemecats',
			description: 'Add AI-generated cat stickers to your Telegram',
			icon: '🐱'
		},
		{
			title: 'Instagram',
			url: 'https://www.instagram.com/arximus88/',
			description: 'Follow my updates and behind-the-scenes content',
			icon: '📸'
		},
		{
			title: 'GitHub Repository',
			url: 'https://github.com/arximus88/k-skeleton',
			description: 'Source code for this website',
			icon: '💻'
		}
	];

	const credits = [
		{
			title: 'Dmytro',
			url: 'https://github.com/dmmat',
			description: 'Development support and guidance'
		},
		{
			title: 'Claude',
			url: 'https://anthropic.com/claude',
			description: 'AI assistance with code and ideas'
		},
		{
			title: 'SvelteKit',
			url: 'https://kit.svelte.dev',
			description: 'Full-stack web framework'
		},
		{
			title: 'Tomislav Jakupec',
			url: 'https://pixabay.com/users/tommyvideo-3092371/',
			description: 'Background video from Pixabay'
		}
	];
</script>

<svelte:head>
	<title>Miscellaneous - Borys Kharchenko Portfolio</title>
	<meta name="description" content="Additional links, resources, and credits for Borys Kharchenko's portfolio website" />
	<meta name="keywords" content="portfolio links, social media, GitHub, resources, credits" />
	<meta name="author" content="Borys Kharchenko" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Miscellaneous - Borys Kharchenko Portfolio" />
	<meta property="og:description" content="Additional links, resources, and credits for Borys Kharchenko's portfolio website" />
	<meta property="og:image" content="/images/logo-bo.png" />
	<meta property="og:url" content="https://kharchenko.work/misc" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Miscellaneous - Borys Kharchenko Portfolio" />
	<meta name="twitter:description" content="Additional links, resources, and credits for Borys Kharchenko's portfolio website" />
	<meta name="twitter:image" content="/images/logo-bo.png" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://kharchenko.work/misc" />
</svelte:head>

<h1>Miscellaneous</h1>
<p class="text-secondary">Additional links, resources, and credits.</p>

<section class="page-container">
	<div class="misc-section">
		<h2>Links & Resources</h2>
		<div class="links-grid">
			{#each links as link}
				<div class="link-card">
					<div class="link-header">
						<div class="link-icon">{link.icon}</div>
						<h3 class="text-primary">{link.title}</h3>
					</div>
					<p class="text-secondary">{link.description}</p>
					<div class="link-actions">
						<Button
							projectUrl={link.url}
							external={true}
							size="small"
							width="adaptive"
							variant="outline"
						>
							Visit
						</Button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="misc-section">
		<h2>Credits & Acknowledgments</h2>
		<div class="credits-grid">
			{#each credits as credit}
				<div class="credit-card">
					<h3 class="text-primary">
						<a href={credit.url} target="_blank" rel="noopener noreferrer" class="credit-link">
							{credit.title}
						</a>
					</h3>
					<p class="text-secondary">{credit.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<Footer className="misc" />

<style>
	.misc-section {
		margin-bottom: 48px;
	}

	.links-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 24px;
		margin-top: 32px;
	}

	.link-card {
		padding: 24px;
		background: var(--card-bg);
		border-radius: 12px;
		border: 1px solid var(--slight-basic);
		transition: all 0.3s ease;
	}

	.link-card:hover {
		border-color: var(--tertiary-basic);
		transform: translateY(-2px);
	}

	.link-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 12px;
	}

	.link-icon {
		font-size: 24px;
		line-height: 1;
	}

	.link-card h3 {
		margin: 0;
		font-size: 18px;
		font-weight: 600;
	}

	.link-card p {
		margin: 0 0 16px 0;
		font-size: 14px;
		line-height: 1.4;
	}

	.link-actions {
		display: flex;
		justify-content: flex-start;
	}

	.credits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 24px;
		margin-top: 32px;
	}

	.credit-card {
		padding: 20px;
		border-radius: 8px;
		border: 1px solid var(--slight-basic);
		transition: all 0.3s ease;
	}

	.credit-card:hover {
		border-color: var(--tertiary-basic);
	}

	.credit-card h3 {
		margin: 0 0 8px 0;
		font-size: 16px;
		font-weight: 600;
	}

	.credit-link {
		color: var(--primary-basic);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.credit-link:hover {
		color: var(--primary-accent);
		text-decoration: underline;
	}

	.credit-card p {
		margin: 0;
		font-size: 14px;
		line-height: 1.4;
	}

	@media (max-width: 768px) {
		.links-grid,
		.credits-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
