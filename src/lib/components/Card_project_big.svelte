<script>
	import Tag from '$lib/components/Tag.svelte';

	export let title = '';
	export let description = '';
	export let clientName = '';
	export let tags = ['', '', ''];
	export let folder = '';
	export let year = 1;
</script>

<div class="project">
	<div class="card slight-transition">
		<a href={`/projects/${folder}`}>
			<picture class="card-image">
				<source class="contain" srcset={`/images/projects-bg/${folder}.webp`} type="image/webp" />
				<img class="contain" src={`/images/projects-bg/${folder}.jpg`} alt={title} />
			</picture>
			<div class="h4 pseudo-title text-primary fast-transition">{title}</div>
			<h4 class="project-title text-primary fast-transition">{title}</h4>
			<div class="project-description small-text text-secondary fast-transition">
				{description}
			</div>
			<div class="year caption fast-transition">{year}</div>
		</a>
	</div>
	<div class="subline">
		<div class="client">
			<div class="avatar" />
			<p class="client-title caption">{clientName}</p>
		</div>
		<div class="tags">
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
		height: calc(100vh - 200px);
		padding: 12px;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
		align-self: stretch;
		background: var(--card-bg);
		border-radius: 12px;
		box-shadow: 0px 0px 4px var(--card-bg), 0px 0px 1px var(--tertiary-basic);
		overflow: hidden; /* Add this line to hide image overflow */
	}

	.card:hover {
		box-shadow: 0px 0px 1px var(--card-bg), 0px 0px 12px var(--tertiary-basic);
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
		background: linear-gradient(180deg, rgba(57, 60, 63, 0.16) 0%, rgba(57, 60, 63, 0.64) 100%);
	}
	.card:hover .card-image::after {
		background: linear-gradient(180deg, rgba(57, 60, 63, 0.32) 0%, rgba(33, 33, 33, 0.8) 100%);
	}

	.card-image img {
		width: 100%;
		height: 100%; /* Add this line to set the height to 100% */
		object-fit: cover;
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

	.year {
		transform: translateY(1rem);
		opacity: 0;
	}
	.card:hover .year {
		transform: translateY(0rem);
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
</style>
