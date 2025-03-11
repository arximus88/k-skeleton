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
	<title>Borys's Projects</title>
	<meta name="description" content="Projects" />
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
