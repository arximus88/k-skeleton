<script>
	import Button from '$lib/components/Button.svelte';
	let innerWidth = 0;
</script>

<svelte:head>
	<title>Borys's Place</title>
	<meta name="description" content="Borys's Place" />
</svelte:head>
<svelte:window bind:innerWidth />
<div class="home-block">
	<h1 class="hero-text">Borys Kharchenko</h1>
	<div class="hero-subtext">Product Designer</div>
	<section>
		<div class="greeting-block">
			<p class="h3 text-primary">Hey,</p>
			<p class="text-secondary">
				I'm Borys, a strategic Product Designer with 10+ years of experience bridging user needs and business objectives across diverse domains.
			</p>
			<p class="text-secondary">
				My expertise spans multiple industries including Web3, B2C platforms, healthcare, and emerging AI applications. I've collaborated with clients from the USA (Chegg, Upwork), Australia (Virtually Human), and Ukraine (Medics.ua).
			</p>
			<p class="text-secondary">
				As the founding designer for ZED RUN and senior designer for Human Park at Virtually Human Studios, I've led projects that generated 9,500+ unique digital assets and built design systems that scaled with rapidly growing products.
			</p>
			<p class="text-secondary">
				I thrive in dynamic environments where I can apply my holistic approach to product design—blending user research, strategic thinking, and visual craft to create experiences that resonate with users and drive business results.
			</p>
		</div>
		<div class="action-line">
			<Button
				projectUrl="https://www.linkedin.com/in/boryskharchenko/"
				external={true}
				size="default"
				width="adaptive"
				variant="primary">Let's Connect on LinkedIn</Button
			>
			<Button
				projectUrl="/projects"
				external={false}
				size="default"
				width="adaptive"
				variant="outline">View My Projects</Button
			>
		</div>
	</section>
</div>

<style>
	.home-block {
		padding-top: 128px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.action-line {
		padding-top: 32px;
		gap: 16px;
		display: flex;
		justify-content: center;
	}
	.greeting-block {
		padding: 32px 64px;
		margin-top: 64px;
		border-top: 1px solid var(--slight-basic);
		border-bottom: 1px solid var(--slight-basic);
	}
	.hero-text {
		font-style: normal;
		font-weight: 500;
		font-size: 78px;
		text-align: center;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--primary-basic);
	}
	.hero-subtext {
		font-style: normal;
		font-weight: 400;
		font-size: 32px;
		line-height: 38px;
		text-align: center;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--caption-basic);
	}
	@media (max-width: 1280px) {
		.hero-text {
			font-size: 64px;
		}
		.hero-subtext {
			font-size: 28px;
		}
		.home-block {
			padding-top: 64px;
		}
	}
	@media (max-width: 576px) {
		.hero-text {
			font-weight: 700;
			font-size: 48px;
		}
		.hero-subtext {
			font-size: 24px;
			font-weight: 700;
			letter-spacing: 0em;
		}
		.home-block {
			padding-top: 32px;
		}
		.greeting-block {
			padding: 32px 0px;
		}
	}
	@media (max-width: 400px) {
		.hero-text {
			font-size: 32px;
		}
		.hero-subtext {
			font-size: 16px;
		}
	}
</style>
