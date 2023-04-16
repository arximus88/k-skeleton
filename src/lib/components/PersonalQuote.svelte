<script>
	import PersonalAvatar from './PersonalAvatar.svelte';
	export let bg = '#FFAC8A';
	export let avatar;
	export let width = 'fullwide';
	export let text = 'Enter your quote here';
	export let textbg = '#f1f1f1';
</script>

<div class={`personal-quote ${width}`}>
	<PersonalAvatar {bg} {avatar} />
	<div class="quote-text" style="background-color: {textbg};">
		<p>
			{text}
			<slot />
		</p>
	</div>
</div>

<style>
	.personal-quote {
		display: flex;
		gap: 16px;
		flex-direction: row;
		align-items: flex-start;
	}

	.personal-quote .quote-text {
		border-radius: 8px;
		padding: 24px;
		flex-grow: 1;
	}

	.personal-quote p {
		margin: 0;
		color: #191b1d;
		font-weight: 500;
	}

	.personal-quote.fullwide {
		width: 100%;
	}

	.personal-quote.long {
		max-width: 512px;
	}

	.personal-quote.small {
		max-width: 320px;
	}
</style>
