export type Tags = 'sveltekit' | 'svelte'

export type Post = {
	id: number
    title: string
    year: string
	slug: string
	description: string
	clientName: string
	clientUrl: string
    androidUrl: string
    platforms: string
	tags: Tags[]
    folder: string
    visible: boolean
	disabled: boolean
}
