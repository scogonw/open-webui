<script lang="ts">
	import Plus from '$lib/components/icons/Plus.svelte';
	import Search from '$lib/components/icons/Search.svelte';
	import AddTeamModal from '$lib/components/teams/AddTeamModal.svelte';
	import TeamCard from '$lib/components/teams/TeamCard.svelte';
	import { fade } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicInOut, cubicOut, linear } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { getTeams } from '$lib/apis/triton';
	import { teams } from '$lib/stores';
	import { tick } from 'svelte';
	import Skeletonteams from '$lib/components/teams/SkeletonTeams.svelte';
	import { showSidebar } from '$lib/stores';


	// Initialize a tweened value for scale
	const scale = tweened(1, {
		duration: 50, // Fast transition duration
		easing: cubicInOut // Easing for smooth transition
	});

	async function handleClick() {
		// Scale down quickly
		await scale.set(0.9, { duration: 200, easing: linear });
		// Scale up even faster
		await scale.set(1, { duration: 100, easing: linear });
	}

	let teamPlaceholder = [
		{
			teamName: 'HR Team',
			users: [
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: 'Admin',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				}
			],
			documentCount: 10,
			agent: {
				name: 'HR Agent',
				avatar: 'https://picsum.photos/200/300'
			}
		},
		{
			teamName: 'Finance Team',
			users: [
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: 'Admin',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				}
			],
			documentCount: 10,
			agent: {
				name: 'Finance Agent',
				avatar: 'https://picsum.photos/200/300'
			}
		},
		{
			teamName: 'Operations Team',
			users: [
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: 'Admin',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				}
			],
			documentCount: 10,
			agent: {
				name: 'Operations Agent',
				avatar: 'https://picsum.photos/200/300'
			}
		},
		{
			teamName: 'Developer Team',
			users: [
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: 'Admin',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				},
				{
					name: 'Siera Ferguson',
					email: 'sieraferguson@gmail.com',
					role: '',
					avatar: 'https://picsum.photos/200/300'
				}
			],
			documentCount: 10,
			agent: {
				name: 'Developers Agent',
				avatar: 'https://picsum.photos/200/300'
			}
		}
	];

	let search = '';
	let loading = true;
	let showAddTeamModal = false;
	let timer;

	const handleChange = async () => {
		console.log(search);
		if (search) {
			loading = true;
			await tick();
			const teamsdata = await getTeams(search);
			if (teamsdata) {
				const { data, metadata } = teamsdata;
				teams.set(data);
				console.log(teams);
			}
			loading = false;
		} else {
			loading = true;
			const teamsdata = await getTeams();
			if (teamsdata) {
				const { data, metadata } = teamsdata;
				teams.set(data);
				console.log(teams);
			}
			loading = false;
		}
	};

	let container;
	let isAtBottom = false;
	let metadataOfTeams;

	const handleScroll =async () => {
		isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight;
		if(isAtBottom){
			const teamsdata = await getTeams(search ? search : '',metadataOfTeams?.limit*metadataOfTeams?.page);
			if(teamsdata){
				const { data, metadata } = teamsdata;
				teams.update(prev => [...prev,...data]);
				metadataOfTeams = metadata;
			}
		}
	};


	onMount(async () => {
		loading = true;
		const teamsdata = await getTeams();
		if (teamsdata) {
			const { data, metadata } = teamsdata;
			teams.set(data);
			metadataOfTeams = metadata;
		}
		loading = false;
	});
</script>

<div class="p-4 md:pr-5 md:pl-5  md:pt-2 h-[90%] w-full flex flex-col">
	<div class="w-full py-2 flex justify-between items-center">
		<div
			class="w-52 md:w-80 h-11 rounded-xl bg-[#F7F8FA] shadow-md flex items-center px-5 gap-2 dark:bg-gray-850"
			in:fade={{ duration: 200 }}
		>
			<Search className="size-5 stroke-[#818181]" />
			<input
				bind:value={search}
				type="text"
				placeholder="Search"
				class="py-2.5 w-full bg-[#F7F8FA] outline-none dark:bg-gray-850"
				on:input={() => {
					if (timer) {
						clearTimeout(timer);
					}
					timer = setTimeout(() => {
						handleChange();
					}, 500);
				}}
			/>
		</div>
		<button
			class="w-24 md:w-32 h-11 rounded-lg bg-black dark:bg-gray-850 font-semibold text-white hover:bg-gray-850 flex justify-center items-center gap-1"
			style="transform: scale({$scale});"
			in:fade={{ duration: 200 }}
			on:click={() => {
				handleClick();
				showAddTeamModal = true;
			}}
		>
			<Plus className="size-4 stroke-white dark:stroke-white" strokeWidth="2" />
			Teams
		</button>
	</div>
	<div
		class={`w-full flex flex-wrap justify-center md:justify-start mt-5 pb-2 overflow-y-auto no-scrollbar ${$showSidebar ? `gap-10`:`gap-2`}`}
		in:fade={{ duration: 200 }}
		bind:this={container}
		on:scroll={handleScroll}
	>
		{#if loading}
			<Skeletonteams />
			<Skeletonteams />
			<Skeletonteams />
			<Skeletonteams />
			<Skeletonteams />
			<Skeletonteams />
		{/if}
		{#if $teams.length > 0 && !loading}
			{#each $teams as team}
				<TeamCard {team} />
			{/each}
		{/if}
		<!-- <TeamCard team={teamPlaceholder[2]} bind:showEditTeamModal bind:showUploadDocumentsModal />
		<TeamCard team={teamPlaceholder[3]} bind:showEditTeamModal bind:showUploadDocumentsModal /> -->
	</div>
	<AddTeamModal bind:show={showAddTeamModal} />
</div>
