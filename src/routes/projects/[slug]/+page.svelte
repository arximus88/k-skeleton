<script>
	import { onMount } from 'svelte';
	import PersonalQuote from '$lib/components/PersonalQuote.svelte';
	import ProjectDetails from '$lib/components/ProjectDetails.svelte';
	import Slider from '$lib/components/Slider.svelte';
	// This variable is set from the load function in +page.server.js
	export let data;
	let project = data.project;
</script>

<svelte:head>
	<title>{project.title} - Borys Kharchenko Portfolio</title>
	<meta name="description" content={project.description} />
	<meta name="keywords" content="product design, UX/UI, {project.tags || ''}, {project.clientName}" />
	<meta name="author" content="Borys Kharchenko" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{project.title} - Borys Kharchenko Portfolio" />
	<meta property="og:description" content={project.description} />
	<meta property="og:image" content="/images/projects-bg/{project.folder}.webp" />
	<meta property="og:url" content="https://kharchenko.work/projects/{project.folder}" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{project.title} - Borys Kharchenko Portfolio" />
	<meta name="twitter:description" content={project.description} />
	<meta name="twitter:image" content="/images/projects-bg/{project.folder}.webp" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://kharchenko.work/projects/{project.folder}" />
</svelte:head>

<!-- Main content -->
<div class="project-content">
	<div>
		<h1 class="project-title">{project.title}</h1>
		<p class="project-description caption">
			{project.description}
		</p>
		<div>
			{#if project.parsedContent && project.parsedContent.length > 0}
				{#each project.parsedContent as block}
					{#if block.type === 'paragraph'}
						<p class="large-text text-secondary">{@html block.content}</p>
					{:else if block.type === 'quote'}
						<PersonalQuote>
							{@html block.content}
						</PersonalQuote>
					{:else if block.type === 'divider'}
						<hr class="solid" />
					{:else if block.type === 'image'}
						<img src={block.content} alt="" />
					{:else if block.type === 'slider'}
						<Slider folder={project.folder} from={block.content.from} to={block.content.to} />
					{:else if block.type === 'column_list'}
						<div class="columns">
							{#each block.content as column}
								<div class="column">
									{#each column.content as item}
										<p class="large-text text-secondary">{item.content}</p>
									{/each}
								</div>
							{/each}
						</div>
					{/if}
				{/each}
			{:else if project.content}
				<p class="large-text text-secondary">{@html project.content}</p>
			{/if}
		</div>
	</div>
	<ProjectDetails
		clientName={project.clientName}
		clientUrl={project.url_client}
		year={project.year}
		tags={project.tags}
		projectUrl={project.url_project}
		platforms={project.platforms}
	/>
</div>

<style>
	.text-secondary {
		color: var(--secondary-basic);
		padding: 1em 1em;
	}
	img {
		max-width: 100%;
	}
</style>
