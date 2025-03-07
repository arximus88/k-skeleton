export type Tags = string

export type Project = {
	id: string
    title: string
    year: number | string
	slug: string
	description: string
	clientName: string
	clientUrl: string
    androidUrl?: string
    iosUrl?: string
    platforms: string[] | string
	tags: Tags[]
    folder: string
    visible: boolean
	disabled: boolean
    key?: string
    order?: number
    url?: string
    projectUrl?: string
    sliderFrom?: number
    sliderTo?: number
    content?: any[]
}
