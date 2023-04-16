<div class="bg-container">
	<video class="bg-video" autoplay muted loop poster="/images/bg-img.webp" defer loading="lazy">
		<source src="/media/bg-vid-dark_1.webm" type="video/webm" />
		<source src="/media/bg-vid-dark_1.mp4" type="video/mp4" />
		<track src="/media/captions_en.vtt" kind="captions" srclang="en" label="english_captions" />
		Your browser does not support the video tag.
	</video>
</div>

<style>
	/* Background */
	.bg-container {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: -1;
	}

	.bg-video {
		height: 64vh;
	}

	.bg-container::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 64vh;

		z-index: 1;
		background: radial-gradient(
			50% 100% at 50% 0%,
			var(--body-bg-shade) 0%,
			var(--body-bg-color) 100%
		);
	}

	:global([data-theme='light']) .bg-video {
		filter: invert(100%) hue-rotate(140deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.bg-video {
			display: none;
		}
	}
</style>
