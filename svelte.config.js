import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// for more information about preprocessors https://kit.svelte.dev/docs/integrations#preprocessors
	// preprocess: sveltePreprocess(), 
	extensions: ['.svelte'],
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			'$projects': './personal/projects',
			'$lib': './src/lib'
		}
	}
};

export default config;
