<script>
	import { page } from '$app/stores';
	import Icon from '$lib/components/Icons.svelte';
</script>

<nav>
	<ul>
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a class="nav-link" href="/"> <Icon name="user-edit" size={20} />Home</a>
		</li>
		<li aria-current={$page.url.pathname === '/projects' ? 'page' : undefined}>
			<a class="nav-link" href="/projects"><Icon name="presentation" size={20} />Projects</a>
		</li>
		<li aria-current={$page.url.pathname === '/cats' ? 'page' : undefined}>
			<a class="nav-link" href="/cats"><Icon name="stars" size={20} />Cats</a>
		</li>
		<li aria-current={$page.url.pathname === '/misc' ? 'page' : undefined}>
			<a class="nav-link" href="/misc"><Icon name="code-snippet" size={20} />Misc</a>
		</li>
	</ul>
</nav>
<div class="bottom-shade" />

<style>
	nav {
		position: fixed;
		bottom: 24px;
		display: flex;
		justify-content: center;
		border-radius: 12px;
		background: var(--card-bg);
		box-shadow: inset 0 0 0 2px var(--slight-basic);
		width: fit-content;
		align-self: center;
		z-index: 100;
	}
	.bottom-shade {
		content: '';
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 64px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--card-bg) 100%);
		z-index: 0;
	}
	ul {
		position: relative;
		padding: 12px 24px;
		margin: 0;
		display: flex;
		gap: 16px;
		justify-content: center;
		align-items: center;
		list-style: none;
	}

	/* li[aria-current='page']::before {
	} */

	.nav-link {
		color: var(--tertiary-basic);
		text-decoration: none;
		display: flex;
		gap: 8px;
		height: 100%;
		align-items: center;
		font-weight: 700;
		font-size: 1rem;
		/* text-transform: uppercase; */
		letter-spacing: 0.05em;
		transition: color 0.1s linear;
	}

	.nav-link:hover {
		color: var(--primary-basic);
	}

	@media (max-width: 576px) {
		nav {
			bottom: 12px;
			width: calc(100% - 24px);
		}
		ul {
			justify-content: space-around;
			width: 100%;
		}
		.nav-link {
			flex-direction: column;
			font-size: small;
			gap: 4px;
		}
	}

	/* .nav-icon {
  width: 24px;
  height: 24px;
} */
</style>
