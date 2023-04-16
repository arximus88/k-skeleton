<script lang="ts">
	export let name = '';
	export let size = 24;
	export let className = '';
</script>

<span
	class="icon {className}"
	style="width: {size}px; height: {size}px; --icon-url: url('/icons/{name}.svg');"
/>

<style>
	.icon {
		display: inline-block;
		background-color: currentColor;
		mask-size: cover;
		mask-repeat: no-repeat;
		mask-position: center;
		mask-image: var(--icon-url);
		-webkit-mask-image: var(--icon-url); /* Chrome, Safari */
		-webkit-mask-size: cover;
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
	}
</style>
