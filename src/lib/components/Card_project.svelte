<script>
	import Tag from '$lib/components/Tag.svelte';
	import { dragScroll } from '$lib/dragScroll';
	import { onMount } from 'svelte';

	export let title = '';
	export let description = '';
	export let clientName = '';
	export let tags = ['', '', ''];
	export let folder = '';
	export let year = 1;
	export let disabled = false;
	export let visible = true;

	let tagsContainer;
	let hasOverflowingTags = false;

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

<div class="project {visible ? '' : 'display-none'}">
	<div class="card slight-transition">
		<a href={disabled ? '#' : `/projects/${folder}`} class:disabled>
			<picture class="card-image">
				<source class="contain" srcset={`/images/projects-bg/${folder}.webp`} type="image/webp" />
				<img class="contain" src={`/images/projects-bg/${folder}.jpg`} alt={title} />
			</picture>
			<div class="h4 pseudo-title text-primary fast-transition">{title}</div>
			<h4 class="project-title text-primary fast-transition">{title}</h4>
			<div class="project-description small-text text-secondary fast-transition">
				{description}
			</div>
			<div class="lastline fast-transition">
				<div class="year caption">{year}</div>
				<div class="small-text text-tertiary butt">
					{disabled ? `TBD` : `View Case`}
				</div>
			</div>
		</a>
	</div>
	<div class="subline">
		<div class="client">
			<div class="avatar" />
			<p class="client-title caption">{clientName}</p>
		</div>
		<div
			class="tags"
			bind:this={tagsContainer}
			class:has-overflowing-tags={hasOverflowingTags}
			use:dragScroll
		>
			{#each tags as tag}
				<Tag {tag} />
			{/each}
		</div>
	</div>
</div>

<style>
	.avatar {
		display: none;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: #ccc;
	}

	.project {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.card {
		position: relative;
		display: flex;
		height: 200px;
		padding: 0px 12px;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
		align-self: stretch;
		background: var(--card-bg);
		border-radius: 12px;
		box-shadow: 0px 0px 4px var(--card-bg);
		overflow: hidden; /* Add this line to hide image overflow */
	}

	/* .card:hover {
		box-shadow: 0px 0px 1px var(--card-bg), 0px 0px 12px var(--tertiary-basic);
	} */

	.disabled {
		pointer-events: none;
	}

	.card a:link {
		text-decoration: none;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.card-image {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.card-image::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-radius: 12px;
		transition: all 0.1s ease-out;
		box-shadow: inset 0px 0px 0px 2px var(--slight-basic);
		background: linear-gradient(180deg, rgba(57, 60, 63, 0) 72%, rgba(57, 60, 63, 0.64) 100%);
	}
	.card:hover .card-image::after {
		box-shadow: inset 0px 0px 0px 2px var(--tertiary-basic);
		background: linear-gradient(180deg, rgba(57, 60, 63, 0.32) 0%, rgba(33, 33, 33, 0.8) 100%);
	}

	.card-image img {
		width: 100%;
		height: 100%; /* Add this line to set the height to 100% */
		object-fit: cover;
	}

	.disabled img {
		filter: grayscale(100%);
	}
	.pseudo-title {
		transform: translateY(0rem);
		position: absolute;
		bottom: 12px;
	}
	.card:hover .pseudo-title {
		transform: translateY(-1rem);
		opacity: 0;
	}

	.project-title {
		transform: translateY(1rem);
		opacity: 0;
	}
	.card:hover .project-title {
		transform: translateY(0rem);
		opacity: 1;
	}

	.project-description {
		transform: translateY(1rem);
		opacity: 0;
	}
	.card:hover .project-description {
		transform: translateY(0rem);
		opacity: 1;
	}

	.lastline {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		transform: translateY(0rem);
		opacity: 0;
	}
	.card:hover .lastline {
		transform: translateY(-1rem);
		opacity: 1;
	}

	.client {
		display: flex;
		gap: 8px;
		flex-shrink: 0;
	}
	.subline {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
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
