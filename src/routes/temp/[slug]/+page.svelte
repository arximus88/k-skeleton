<script>
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icons.svelte';
	import PersonalQuote from '$lib/components/PersonalQuote.svelte';
	import ProjectDetails from '$lib/components/ProjectDetails.svelte';
	import Slider from '$lib/components/Slider.svelte';
	// This variable is set from the load function in +page.server.js
	export let data;
	// rename
	let project = data;
</script>

<svelte:head>
	<title>{project.title} - Project</title>
	<meta name="description" content={project.description} />
</svelte:head>

<!-- Main content -->
<div class="main-content">
	<div>
		<h1 class="project-title">{project.title} - Project</h1>
		<p class="project-description">
			{project.description}
		</p>

		<div>
			{#each project.content as block}
				{#if block.type === 'paragraph'}
					<p>{@html block.content}</p>
				{:else if block.type === 'quote'}
					<PersonalQuote>
						{@html block.content}
					</PersonalQuote>
				{:else if block.type === 'divider'}
					<hr class="solid" />
				{:else if block.type === 'slider'}
					<Slider folder={project.folder} from={block.content.from} to={block.content.to} />
				{/if}
			{/each}

			<!-- {@html project.text_block} -->
		</div>
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
		grid-template-columns: 3fr 320px;
		grid-gap: 2rem;
		margin: 2rem 0;
		padding-bottom: 128px;
	}

	@media (max-width: 768px) {
		.main-content {
			display: flex;
			flex-direction: column;
			grid-template-columns: 1fr;
		}
	}

	/* .slider {
		background-color: transparent;
	} */
</style>
