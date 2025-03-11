export type Tags = string

export type Project = {
	id: string
    title: string
    year: number | string
	slug: string
	description: string
	clientName: string
	url_client: string
    url_android?: string
    url_ios?: string
    platforms: string[] | string
	tags: Tags[]
    folder: string
    live: "live" | "inactive" | "disabled"
    order?: number
    url_notion?: string
    url_project?: string
    content?: any[]
}
