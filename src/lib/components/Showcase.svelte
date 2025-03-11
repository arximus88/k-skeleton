<script>
	import Tag from '$lib/components/Tag.svelte';
	import Card from '$lib/components/Card_project.svelte';
	import Button from './Button.svelte';
	import PersonalQuote from './PersonalQuote.svelte';
	import PersonalAvatar from './PersonalAvatar.svelte';
	import ProjectDetails from './ProjectDetails.svelte';
</script>

<main>
	<h1>All Components</h1>
	<h3>Tags</h3>
	<div class="tags">
		<Tag tag="iOS" /><Tag tag="Android" /><Tag tag="Mobile" /><Tag tag="iOS" />
	</div>
	<h3>Buttons</h3>
	<Button size="small" width="fitcontent" variant="primary" icon="✓" external={false}>Submit</Button>
	<Button size="default" width="block" variant="outline" external={false}>Cancel</Button>
	<Button size="large" width="fitcontent" variant="primary" external={false}>Update</Button>
	<Button size="default" width="fitcontent" variant="primary" disabled={true} external={false}>Disabled</Button>
	<Button external={false}>Default</Button>

	<Button size="small" external={false}>Small Primary</Button>

	<Button size="large" external={false}>Large Primary</Button>

	<Button width="block" external={false}>Block Width Primary</Button>

	<Button size="small" variant="outline" external={false}>Small Outline</Button>

	<Button size="large" variant="outline" external={false}>Large Outline</Button>

	<Button width="block" variant="outline" external={false}>Block Width Outline</Button>

	<Button icon="🚀" external={false}>With Icon</Button>

	<Button disabled external={false}>Disabled</Button>
	<h3>Quotes</h3>
	<PersonalAvatar avatar={1} />
	<PersonalQuote
		bg="#FFAC8A"
		avatar={1}
		width="small"
		text="As a player, I can breed, buy, and race your very own racehorses, each with unique attributes and performance capabilities. The game is powered by smart contracts, ensuring fairness and transparency for all players."
	/>
	<Card
		title="Project Title"
		description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies ultricies, nisl nisl aliquam nisl, vitae ultricies nisl nisl eget nisl. Sed euismod, nisl vitae ultricies ultricies, nisl nisl aliquam nisl, vitae ultricies nisl nisl eget nisl."
	/>
	<ProjectDetails
		clientName="Client Name"
		year={2021}
		platforms={["iOS"]}
		tags={['iOS', 'Android', 'Mobile']}
		projectUrl="https://www.google.com"
	/>
</main>

<style>
	.tags {
		display: flex;
		gap: 8px;
	}
</style>
