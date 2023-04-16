<script>
	import Icons from './Icons.svelte';

	export let size = 'default';
	export let width = 'fit';
	export let variant = 'primary';
	export let disabled = false;
	export let icon = '';
	export let iconType = 'emoji'; // Default to emoji
	export let projectUrl = '';

	let classes = '';

	$: {
		classes = `${size} ${width} ${variant} ${icon ? 'with-icon' : ''} ${
			disabled ? 'disabled' : ''
		}`;
	}

	function handleClick() {
		if (!disabled && projectUrl) {
			window.open(projectUrl, '_blank');
		}
	}
</script>

<button class="button {classes}" on:click={handleClick} {disabled}>
	{#if icon}
		{#if iconType === 'emoji'}
			<span class="icon">{icon}</span>
		{:else}
			<Icons name={icon} class="icon" />
		{/if}
	{/if}
	<slot />
</button>

<style>
	.button {
		color: var(--primary-basic);
		font-weight: bold;
		line-height: 1;
		text-transform: uppercase;
		transition: all 0.15s ease-out;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border: none;
		outline: none;
	}

	/* Size Options */
	.small {
		font-size: 14px;
		padding: 9px 16px;
	}

	.default {
		font-size: 16px;
		padding: 12px 20px;
	}

	.large {
		font-size: 18px;
		padding: 21px 28px;
	}

	/* Width Options */
	.fit {
		width: fit-content;
	}

	.block {
		width: 100%;
	}
	.adaptive {
		width: fit-content;
	}
	@media (max-width: 576px) {
		.adaptive {
			width: 100%;
		}
	}

	/* Variant Options */
	.primary {
		background: #3aafb9;
		box-shadow: 0px 0px 24px rgba(58, 175, 185, 0.32),
			inset 0px 0px 0px 1px rgba(247, 249, 249, 0.24);
		border-radius: 6px;
	}
	.primary:hover {
		background: #3aafb9;
		box-shadow: 0px 0px 24px rgba(58, 175, 185, 0.64),
			inset 0px 0px 0px 2px rgba(247, 249, 249, 0.64);
	}

	.outline {
		background: transparent;
		box-shadow: 0px 0px 24px var(--slight-basic), inset 0px 0px 0px 1px var(--tertiary-basic);
		border-radius: 6px;
	}
	.outline:hover {
		background: transparent;
		box-shadow: 0px 0px 24px var(--caption-basic), inset 0px 0px 0px 2px var(--primary-basic);
		border-radius: 6px;
	}

	.disabled {
		cursor: not-allowed;
		opacity: 0.5;
		background: var(--disabled-basic);
	}
</style>
