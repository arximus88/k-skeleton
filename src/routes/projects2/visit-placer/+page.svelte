<script>
    import { onMount } from 'svelte';
	import Icon from '$lib/components/Icons.svelte';
    import PersonalQuote from '$lib/components/PersonalQuote.svelte';
    import ProjectDetails from '../../../lib/components/ProjectDetails.svelte';
    import { projects } from '$lib/projectsData.js';

    import { page } from '$app/stores';  
    let parts = $page.url.pathname.split('/');
    let projectFolder = parts[parts.length - 1].toString();
    let project = projects.find(p => p.folder === String(projectFolder));

    // let project = projects.find(p => p.folder === 'zed-run');

    async function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
    });
}

async function loadStylesheet(href) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.href = href;
        link.rel = 'stylesheet';
        link.onload = () => resolve(link);
        link.onerror = (error) => reject(error);
        document.head.appendChild(link);
    });
}

async function loadMyPageScripts() {
    try {
        await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js');
        await loadStylesheet('/src/lib/fotorama.css');
        await loadScript('/src/lib/fotorama.js');
        // All scripts and styles are loaded; you can now execute code that depends on them.
    } catch (error) { console.error('Error loading script or stylesheet:', error);
    }
}

onMount(async () => {
    await loadMyPageScripts();
    // You can now initialize the fotorama slider or execute any code that depends on the loaded scripts.
});

       


</script>

<svelte:head>
	<title>{project.title} - Project</title>
	<meta name="description" content="Visit Placer - Projects page" />
</svelte:head>

<!-- Main content -->
<div class="main-content">
    <div>
    <h1 class="project-title">{project.title}</h1>
    <p class="project-description">
        {project.description}
    </p>
    <div class="slider">
    <!-- Add images to <div class="fotorama"></div> -->
    <div class="fotorama"
        data-width="100%"
        data-ratio="1000/664"
        data-navposition="bottom"
        data-nav="thumbs"
    >
        <img src="https://s.fotorama.io/1.jpg" alt="photo1">
        <img src="https://s.fotorama.io/2.jpg" alt="photo2" >
    </div>
  
    </div>
    <p class="project-highlights">
        Key features of {project.title} include:
    </p>
    <ul class="project-features">
        <li>One</li>
    </ul>
    <PersonalQuote 
    bg="#FFAC8A" 
    width="long" 
    text="As a player, I can breed, buy, and race your very own racehorses, each with unique attributes and performance capabilities. The game is powered by smart contracts, ensuring fairness and transparency for all players." 
    />
    <p>
        Text
    </p>
    </div>
	<ProjectDetails
		clientName={project.clientName}
		clientUrl={project.clientUrl}
		year={project.year}
		platform={project.platform}
		tags={project.tags}
		projectUrl={project.projectUrl}
		platforms={project.platforms}
	/>
</div>


<style>
    .main-content {
        display: grid;
        grid-template-columns: 3fr 320px;
        grid-gap: 2rem;
        margin: 2rem 0;
        padding-bottom: 128px;
    }
    @media (max-width: 768px) {
        .main-content {
            display: flex;
            flex-direction: column;
            grid-template-columns: 1fr;
        }
    }
    .slider {
        background-color: transparent;
    }
</style>