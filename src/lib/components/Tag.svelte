<script lang="ts">
	export let tag: string | string[] = '';

	// Обробляємо тег, якщо він переданий як масив символів або рядок з комами
	function processTag(input: string | string[]): string {
		// Якщо це масив символів, об'єднуємо їх
		if (Array.isArray(input) && input.every(p => p.length === 1)) {
			return input.join('');
		}
		
		// Якщо це рядок з комами, беремо перший елемент
		if (typeof input === 'string' && input.includes(',')) {
			return input.split(',')[0];
		}
		
		return String(input);
	}

	const processedTag = processTag(tag);
</script>

<div class="tag tag-text fast-transition">{processedTag}</div>

<style>
	.tag-text {
		margin: 0px;
		font-size: 12px;
		font-weight: 500;
		font-family: var(--font-mono);
		color: var(--caption-basic);
		text-transform: uppercase;
	}

	.tag {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 4px 8px;
		gap: 8px;
		border: 1px solid var(--slight-basic);
		border-radius: 4px;
		width: fit-content;
		cursor: help;
	}
	.tag:hover {
		border: 1px solid var(--disabled-basic);
	}
	.tag-text:hover {
		color: var(--primary-basic);
	}
</style>
