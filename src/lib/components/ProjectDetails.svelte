<!-- Project details container, component displays client name, year, platforms, tags and a button to visit the project website on projects/[slug] page -->
<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import Icons from './Icons.svelte';
	import { dragScroll } from '$lib/dragScroll';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';

	export let clientName = '';
	export let clientUrl = '';
	export let year = 1;
	export let platforms: string[] | string = ['', '', ''];
	export let tags: string[] | string = ['', '', ''];
	export let projectUrl = '';

	let tagsContainer: HTMLElement;
	let hasOverflowingTags = false;

	// Функція для обробки рядка з комами в масив
	function processCommaSeparated(input: string | string[]): string[] {
		if (typeof input === 'string') {
			return input.split(/[,\s]+/).filter(item => item.trim() !== '');
		}
		return Array.isArray(input) ? input : [];
	}

	// Обробляємо платформи і теги
	const processedPlatforms = processCommaSeparated(platforms);
	const processedTags = processCommaSeparated(tags);

	onMount(() => {
		checkOverflowingTags();

		window.addEventListener('resize', checkOverflowingTags);
	});

	function checkOverflowingTags() {
		if (tagsContainer) {
			const containerWidth = tagsContainer.offsetWidth;
			const tagsWidth = tagsContainer.scrollWidth;

			if (tagsWidth > containerWidth) {
				hasOverflowingTags = true;
			} else {
				hasOverflowingTags = false;
			}
		}
	}
</script>

<aside class="details">
	<h3>Details</h3>
	<div>
		<div class="detailsLine">
			<span class="text-caption">Client</span>
			<a href={clientUrl} target="_blank" rel="noopener noreferrer">{clientName}</a>
		</div>
		<div class="detailsLine">
			<span class="text-caption">Year</span>
			<span>{year}</span>
		</div>
		<div class="detailsLine">
			<span class="text-caption">Platform</span>
			<div class="platforms">
				{#each processedPlatforms as platform}
					<Icons name={platform} size={16} />
				{/each}
			</div>
		</div>
	</div>
	<div
		class="tags"
		bind:this={tagsContainer}
		class:has-overflowing-tags={hasOverflowingTags}
		use:dragScroll
	>
		{#each processedTags as tag}
			<Tag {tag} />
		{/each}
	</div>
	<Button {projectUrl} external={true} size="default" width="block" variant="primary">Visit Website</Button>
</aside>

<style>
	.platforms {
		display: flex;
		gap: 8px;
	}
	.details {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.detailsLine {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--slight-basic);
		padding: 12px 0px;
	}

	.tags {
		scrollbar-width: none;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 8px;
		overflow-x: auto;
		white-space: nowrap;
		position: relative;
		user-select: none;
	}
	/* Hide the scrollbars */
	.tags::-webkit-scrollbar {
		height: 0;
	}
	.tags.has-overflowing-tags {
		mask-size: cover;
		mask-repeat: no-repeat;
		mask-position: center;
		mask-image: linear-gradient(to left, rgba(255, 255, 255, 0), rgb(0, 0, 0) 10%);
		-webkit-mask-image: linear-gradient(to left, rgba(255, 255, 255, 0), rgb(0, 0, 0) 10%);
		-webkit-mask-size: cover;
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
	}
	
</style>
