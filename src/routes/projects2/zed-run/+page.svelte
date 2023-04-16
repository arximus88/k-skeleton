<script>
	import PersonalQuote from '$lib/components/PersonalQuote.svelte';
	import ProjectDetails from '../../../lib/components/ProjectDetails.svelte';
	import { projects } from '$lib/projectsData.js';
	import { page } from '$app/stores';
	import Slider from '$lib/components/Slider.svelte';

	// Assign the project data to the project variable.
	let parts = $page.url.pathname.split('/');
	let projectFolder = parts[parts.length - 1].toString();
	let project = projects.find((p) => p.folder === String(projectFolder));
</script>

<svelte:head>
	<title>{project.title} - Project</title>
	<meta name="description" content="ZED RUN - Projects page" />
</svelte:head>

<!-- Main content -->
<div class="project-content">
	<div>
		<h1 class="project-title">{project.title}</h1>
		<p class="project-description caption">
			{project.description}
		</p>
		<Slider from={1} to={13} folder={project.folder} />
		<p class="text-secondary">
			Work on ZED RUN started in November 2019. As a Framer.js prototyper I built an interactive
			horse racing prototype prior to the initial launch. After this, I began working on the website
			UI to prepare it for launch. Alongside the two founders, there were only backend and frontend
			engineers. We released the first iteration of zed.run and began selling the first batch of Z1
			Nakamotos digital racehorses.
		</p>
		<PersonalQuote
			bg="#FFAC8A"
			width="long"
			avatar="1"
			text="I was thrilled to be a part of ZED RUN from the beginning and see how it grew over time. The experience was invaluable and taught me a lot about designing for emerging markets."
		/>
		<p class="text-secondary">
			Subsequently, we introduced users to the first utility abilities, which included Breeding and
			Racing functionality, effectively starting the ZED RUN experience. While the engineering team
			focused on scaling and bug fixes, I investigated quality of life updates by reaching out to
			our customers in Discord and surveying them. Based on my findings, I designed and added a
			Racehorse Detailed Page, Racing filtering, a sidebar wallet to make related transactions more
			visible, and eased transferring racehorses between stables.
		</p>
		<p class="text-secondary">
			As Product Managers and UX Researchers joined the team, we began working more streamlined and
			conducting A/B testing for new features. I worked solo on the design for almost 2 years while
			the engineering team grew, prompting the need to hire another designer. I interviewed nearly
			10 candidates and hired one, providing mentorship throughout her tenure.
		</p>
		<p class="text-secondary">
			Later, it was decided to add a new product team, and I conducted another round of interviews
			to look for a Senior Product Designer. Before I shifted to VHS's next project, Human Park, I
			also participated in interviewing the Head of Design for ZED RUN and helped her transition
			into the role by sharing knowledge about the project.
		</p>
		<PersonalQuote
			bg="#FFAC8A"
			width="long"
			avatar="6"
			text="I am passionate about mentorship and believe that investing time in new designers is crucial to building a stronger design community."
		/>
		<p class="text-secondary">
			Throughout my work on ZED RUN, I had the opportunity to work closely with the founders,
			engineers, and other stakeholders to ensure that the product was meeting the needs of the
			users and the business. I was responsible for creating and maintaining the design system,
			ensuring consistency across all touchpoints, and contributing to the development of new
			features and functionality.
		</p>
		<p class="text-secondary">
			One of the most significant challenges I faced during my time on ZED RUN was ensuring that the
			user experience remained engaging and enjoyable as the platform scaled. This involved a deep
			understanding of the user's needs and desires, as well as a willingness to experiment and
			iterate on new designs and features.
		</p>
		<p class="text-secondary">
			Overall, I am proud of the work I accomplished on ZED RUN and am excited to see the platform
			continue to grow and evolve. I believe that my contributions to the project have helped to
			create a compelling and engaging user experience that will continue to attract new users and
			drive the success of the platform.
		</p>
		<h3 class="project-highlights">Key features of {project.title} include:</h3>
		<ul class="project-features">
			<li>
				<h4>Breed and train digital horses</h4>
				<p class="text-secondary small-text">
					ZED RUN allows players to breed and train digital horses on the blockchain. Each horse has
					unique attributes that affect their performance on the racetrack. Players can breed horses
					to create new offspring with desirable traits, and train their horses to improve their
					racing abilities.
				</p>
			</li>
			<li>
				<h4>Compete in virtual horse races</h4>
				<p class="text-secondary small-text">
					ZED RUN hosts virtual horse races that take place in real-time on the blockchain. Players
					can enter their horses in races and compete against other players from around the world.
					Each race is an immersive experience that allows players to watch their horses compete and
					win prizes.
				</p>
			</li>
			<li>
				<h4>Collect and trade digital horses</h4>
				<p class="text-secondary small-text">
					ZED RUN horses are collectible digital assets that can be bought, sold, and traded on the
					blockchain. Each horse has a unique ID that is stored on the blockchain, making it a rare
					and valuable collectible. Players can trade horses with other players and build a
					collection of rare and valuable digital assets.
				</p>
			</li>
			<li>
				<h4>Accessible to all</h4>
				<p class="text-secondary small-text">
					ZED RUN is designed to be accessible to everyone, from experienced horse racing
					enthusiasts to casual gamers. The game is easy to play and offers a low barrier to entry,
					making it a fun and engaging experience for all players.
				</p>
			</li>
			<li>
				<h4>Decentralized and secure</h4>
				<p class="text-secondary small-text">
					ZED RUN is built on the Ethereum blockchain, making it a decentralized and secure platform
					for digital horse racing. The use of blockchain technology ensures that all transactions
					are transparent and immutable, and that ownership of horses is secure and verifiable.
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
