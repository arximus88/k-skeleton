<!-- src/routes/Projects.svelte -->
<script>
	import Card from '$lib/components/Card_project.svelte';
	export let data;
	
	// Отримуємо проєкти з даних, завантажених через API
	let projects = data.projects ? data.projects.sort((a, b) => a.order - b.order) : []; // сортування проєктів за порядком
	const { error } = data;
</script>

<svelte:head>
	<title>Borys's Projects</title>
	<meta name="description" content="Projects" />
</svelte:head>

<h1>Projects</h1>
<p class="project-description caption">
	Project cases are still under construction. I'm working on it.
</p>

{#if error}
	<div class="error-message">
		<p>Помилка завантаження проєктів: {error}</p>
	</div>
{/if}

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
				key={project.slug}
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
	
	.error-message {
		background-color: #fee2e2;
		border: 1px solid #ef4444;
		color: #b91c1c;
		padding: 0.75rem 1rem;
		border-radius: 0.25rem;
		margin-bottom: 1rem;
	}
</style>
