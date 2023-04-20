<script>
	import { onMount } from 'svelte';
	import PersonalQuote from '$lib/components/PersonalQuote.svelte';
	import ProjectDetails from '$lib/components/ProjectDetails.svelte';
	import Slider from '$lib/components/Slider.svelte';
	// This variable is set from the load function in +page.server.js
	export let data;
	// rename
	let project = data;
	// console.log(project);

</script>

<svelte:head>
	<title>{project.title} - Project</title>
	<meta name="description" content={project.description} />
</svelte:head>

<!-- Main content -->
<div class="project-content">
	<div>
		<h1 class="project-title">{project.title}</h1>
		<p class="project-description caption">
			{project.description}
		</p>

		<div>
			{#each project.content as block}
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
	img {
		max-width: 100%;
	}
</style>
