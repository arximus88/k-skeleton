<script>
	import PersonalQuote from '$lib/components/PersonalQuote.svelte';
	import ProjectDetails from '../../../lib/components/ProjectDetails.svelte';
	import { projects } from '$lib/projectsData.js';
	import { page } from '$app/stores';
	import Slider from '$lib/components/Slider.svelte';
	let parts = $page.url.pathname.split('/');
	let projectFolder = parts[parts.length - 1].toString();
	let project = projects.find((p) => p.folder === String(projectFolder));
</script>

<svelte:head>
	<title>{project.title} - Project</title>
	<meta name="description" content="{project.title} - Projects page" />
</svelte:head>

<!-- Main content -->
<div class="project-content">
	<div>
		<h1 class="project-title">{project.title}</h1>
		<p class="project-description caption">
			{project.description}
		</p>
		<Slider from={1} to={12} folder={project.folder} />

		<p class="text-secondary">
			Human Park is a revolutionary project by Virtually Human Studio, dedicated to providing a
			platform for self-expression in the metaverse. As a member of the VHS team, I had the
			opportunity to work on this exciting project, right from its exploration phase. My
			responsibilities included communicating with a globally dispersed team, exploring native
			desktop application UI for editing Noods, and designing the first landing page and release
			version of the website.
		</p>
		<PersonalQuote
			bg="#FFAC8A"
			width="long"
			avatar="4"
			text="Working on Human Park was a wild ride - lots of exploration and new challenges that kept me on my toes. But I loved every minute of it."
		/>
		<p class="text-secondary">
			One of the most significant achievements of the Human Park project was the successful minting
			of 9569 NFTs, with over 10k secondary NFTs generated. As a UI/UX designer, I was involved in
			exploring dozens of mockups with different styling and layouts, to ensure the best possible
			user experience. I was also responsible for designing the interface that allowed users to
			customize their own in-game avatars, which were later minted as NFTs on the release date.
		</p>
		<p class="text-secondary">
			The launch of Human Park was a huge success, with thousands of customization NFTs sold. As
			part of my work on the project, I also designed the in-game UI for the Beta release, allowing
			users to connect with their Eth Wallet through the Metamask browser extension, view their
			owned NFTs, and customize their Noods further. Users can apply Drifter skins, Emote Dances,
			and more, to see in-game.
		</p>
		<Slider from={21} to={29} folder={project.folder} />
		<p class="text-secondary">
			One of the most exciting aspects of the project was the development of the Obelisks, which
			were presented to users on the second minting wave. These Obelisks could be opened on the web
			inventory to achieve Wayfinders or Limited Collection Drifters. The possibilities are endless,
			and the community is continuously growing, making Human Park one of the most exciting projects
			in the metaverse today.
		</p>
		<PersonalQuote
			bg="#FFAC8A"
			width="long"
			avatar="5"
			text="Designing the UI for a video game was a whole new challenge for me, but I'm stoked to say I pulled it off."
		/>
		<p class="text-secondary">
			The Human Park game clients can be downloaded today from the official website and are
			available for Windows and MacOS. As a member of the team, I am proud to have contributed to
			this revolutionary project and its success. The project represents the evolution of the PFP,
			allowing users to use their Noods as a PFP and build endless entertainment experiences, all
			powered by them. The project's unique approach to user-generated content and community-driven
			growth is what makes it truly revolutionary, and I am excited to see where it goes next.
		</p>

		<h3 class="project-highlights">Key features of {project.title} include:</h3>
		<ul class="project-features">
			<li>
				<h4>Unique Nood Customization:</h4>
				<p class="small-text text-secondary">
					Human Park offers a one-of-a-kind experience where users can fully express their identity
					through the creation and customization of their own Nood avatars. From a blank canvas,
					users can drip their Noods with an infinite combination of tattoos and other accessories
					to best represent their vision of themselves in the Metaverse.
				</p>
			</li>
			<li>
				<h4>NFT Integration:</h4>
				<p class="small-text text-secondary">
					Human Park is the first project on the blockchain that allows users to create custom NFTs
					in Unreal Engine game editor that can be successfully realized on the secondary market.
					Users can mint their customized Noods as NFTs and trade them on various marketplaces.
				</p>
			</li>
			<li>
				<h4>Play-to-Earn:</h4>
				<p class="small-text text-secondary">
					Human Park has play-to-earn economics with the ability for users to extract earning
					opportunities within the Park as deeper economics evolve alongside the community. Users
					can earn rewards tailored to experiences within the platform, including game theory and
					prizing systems.
				</p>
			</li>
			<li>
				<h4>Cross-Platform Support:</h4>
				<p class="small-text text-secondary">
					While initially a desktop install experience only, Human Park will eventually support
					browser and mobile platforms. Users can download a launcher for Windows and an
					install-pack for macOS to enjoy the Human Park experience.
				</p>
			</li>
			<li>
				<h4>Inclusive Community:</h4>
				<p class="small-text text-secondary">
					Human Park has a collaborative, inclusive, and supportive work culture, where users can
					join a vibrant community of creators from all over the world in this journey of
					self-expression. The platform provides a safe space for users to explore their identity in
					the Metaverse without fear of judgment or exclusion.
				</p>
			</li>
		</ul>
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
</style>
