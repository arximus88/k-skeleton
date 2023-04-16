<!-- src/routes/Projects.svelte -->
<script>
	import Card from '$lib/components/Card_project.svelte';
	export let data;
	// rename
	let projects = data.items.sort((a, b) => a.order - b.order);
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
				year={project.year}
				disabled={project.disabled}
				visible={project.visible}
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
