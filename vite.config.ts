import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import path from 'path'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [sveltekit()],
		resolve: {
			alias: {
				$projects: path.resolve('./personal/projects')
			}
		},
		server: {
			fs: {
				allow: ['.']
			}
		}
	};
});
