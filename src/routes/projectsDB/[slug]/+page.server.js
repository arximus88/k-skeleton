import {error} from "@sveltejs/kit";
import { Deta } from 'deta';
import {DETA_PROJECT_KEY} from '$lib/vars.js';
// export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    if (params.slug) {
        const deta = Deta(DETA_PROJECT_KEY);
        const projects_details_db = deta.Base('projects-details');

        const project = await projects_details_db.get(params.slug);
        if (project) return project;
        else  throw error(404, 'Not found');
    }

    throw error(404, 'Not found');
}