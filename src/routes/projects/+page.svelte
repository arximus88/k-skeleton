<!-- src/routes/Projects.svelte -->
<script lang="ts">
	import Card from '$lib/components/Card_project.svelte';
	import type { Project } from '$lib/types';

	export let data: { projects: { list: Project[] } };

	// Отримуємо проєкти з даних, завантажених через API
	let projects = data.projects?.list
		? data.projects.list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
		: []; // сортування проєктів за порядком
</script>

<svelte:head>
	<title>Projects - Borys Kharchenko Portfolio</title>
	<meta name="description" content="Portfolio of product design projects including Web3 applications, healthcare platforms, and B2C products. Work with companies like Virtually Human, Chegg, Upwork." />
	<meta name="keywords" content="product design portfolio, UX projects, UI design cases, Web3 design, healthcare design, B2C design" />
	<meta name="author" content="Borys Kharchenko" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Projects - Borys Kharchenko Portfolio" />
	<meta property="og:description" content="Portfolio of product design projects including Web3 applications, healthcare platforms, and B2C products." />
	<meta property="og:image" content="/images/logo-bo.png" />
	<meta property="og:url" content="https://kharchenko.work/projects" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Projects - Borys Kharchenko Portfolio" />
	<meta name="twitter:description" content="Portfolio of product design projects including Web3 applications, healthcare platforms, and B2C products." />
	<meta name="twitter:image" content="/images/logo-bo.png" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://kharchenko.work/projects" />
</svelte:head>

<h1>Projects</h1>
<p class="project-description caption">
	Project cases are still under construction. I'm working on it.
</p>

<section class="page-container">
	<div class="projects">
		{#each projects as project}
			<Card
				folder={project.folder}
				title={project.title}
				description={project.description}
				clientName={project.clientName}
				tags={project.tags}
				year={Number(project.year)}
				live={project.live}
			/>
		{/each}
	</div>
</section>

<style>
	.projects {
		padding-top: 32px;
		display: grid;
		gap: 24px;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
</style>
