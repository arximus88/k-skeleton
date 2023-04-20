import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
// import sveltePreprocess from 'svelte-preprocess';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// for more information about preprocessors https://kit.svelte.dev/docs/integrations#preprocessors
	// preprocess: sveltePreprocess(), 
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
