<!-- src/routes/Cats.svelte -->
<script>
	import Button from '$lib/components/Button.svelte';
	let innerWidth = 0;
</script>

<svelte:head>
	<title>Borys's Cats Playground</title>
	<meta name="description" content="Cat's Playground" />
</svelte:head>
<h1>Cats</h1>
<svelte:window bind:innerWidth />
<section class="page-container">
	<p class="text-secondary">Welcome to the my cats page!</p>
	<p class="text-secondary">While images are here, their playground currently work-in-progress.</p>
	<div class="kitties">
		<div class="kitties-images">
			<img src="images/cats/ball.svg" alt="Ball" />
			<img src="images/cats/kitty-bulka.svg" alt="Bulka cat" />
			<img src="images/cats/kitty-kava.svg" alt="Kava cat" />
			<img src="images/cats/kitty-mo.svg" alt="Mo cat" />
			<img src="images/cats/kitty-zuki.svg" alt="Zuki cat" />
			<img src="images/cats/kitty-ceks.svg" alt="Ceks cat" />
		</div>
		<div class="action-line">
			<Button
				projectUrl="https://www.instagram.com/psy_koteiky/"
				size="default"
				width="adaptive"
				variant="primary">Follow on Instagram</Button
			>
		</div>
	</div>
</section>

<style>
	.kitties {
		padding-top: 64px;
		display: flex;
		flex-direction: column;
	}
	.kitties-images {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: space-around;
		align-items: end;
	}
	.action-line {
		padding-top: 32px;
		display: flex;
		justify-content: center;
	}
</style>
