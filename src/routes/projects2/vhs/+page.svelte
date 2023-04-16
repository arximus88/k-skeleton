<script>
	import PersonalQuote from '$lib/components/PersonalQuote.svelte';
	import ProjectDetails from '../../../lib/components/ProjectDetails.svelte';
	import { projects } from '$lib/projectsData.js';
	import { page } from '$app/stores';
	import Slider from '$lib/components/Slider.svelte';

	let parts = $page.url.pathname.split('/');
	let projectFolder = parts[parts.length - 1].toString();
	let project = projects.find((p) => p.folder === String(projectFolder));
</script>

<svelte:head>
	<title>{project.title} - Project</title>
	<meta name="description" content="{project.title} - Projects page" />
</svelte:head>

<!-- Main content -->
<div class="main-content">
	<div>
		<h1 class="project-title">{project.title}</h1>
		<p class="project-description">
			{project.description}
		</p>
		<Slider from={1} to={2} folder={project.folder} />

		<p class="project-highlights">
			Key features of {project.title} include:
		</p>
		<ul class="project-features">
			<li>One</li>
		</ul>
		<PersonalQuote
			bg="#FFAC8A"
			width="long"
			text="As a player, I can breed, buy, and race your very own racehorses, each with unique attributes and performance capabilities. The game is powered by smart contracts, ensuring fairness and transparency for all players."
		/>
		<p>Text</p>
	</div>

	<ProjectDetails
		clientName={project.clientName}
		clientUrl={project.clientUrl}
		year={project.year}
		platform={project.platform}
		tags={project.tags}
		projectUrl={project.projectUrl}
		platforms={project.platforms}
	/>
</div>

<style>
	.main-content {
		display: grid;
		grid-template-columns: 1fr 320px;
		grid-gap: 2rem;
		margin: 2rem 0;
		padding-bottom: 128px;
	}

	@media (max-width: 1024px) {
		.main-content {
			display: flex;
			flex-direction: column;
			grid-template-columns: 1fr;
			min-width: 288px;
		}
	}
</style>
