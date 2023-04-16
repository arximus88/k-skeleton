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
	<meta name="description" content="{project.title} - Project page" />
</svelte:head>

<!-- Main content -->
<div class="project-content">
	<div>
		<h1 class="project-title">{project.title}</h1>
		<p class="project-description caption">
			{project.description}
		</p>
		<Slider from={1} to={1} folder={project.folder} />
		<p class="text-secondary">Sample text here. Evereting is fine. TBD Soon.</p>
		<PersonalQuote bg="#FFAC8A" width="short" text="I like {project.title}" />
		<p class="text-secondary">Sample text here too. Evereting is fine. TBD Soon.</p>
		<h3 class="project-highlights">Key features of {project.title} include:</h3>
		<ul class="project-features">
			<li>
				<h4>One</h4>
				<p class="small-text text-secondary">Something</p>
			</li>
			<li>
				<h4>Two</h4>
				<p class="small-text text-secondary">Something</p>
			</li>
		</ul>
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
</style>
