<script lang="ts">
	import Plus from '$lib/components/icons/Plus.svelte';
	import Search from '$lib/components/icons/Search.svelte';
	import AddTeamModal from '$lib/components/teams/AddTeamModal.svelte';
	import TeamCard from '$lib/components/teams/TeamCard.svelte';

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
		}
	];

	let showAddTeamModal = false;
</script>

<div class="p-4 md:p-10 h-full w-full">
	<div class="w-full h-20 flex justify-between items-center">
		<div
			class="w-52 md:w-72 h-11 rounded-xl bg-[#F7F8FA] shadow-md flex items-center px-5 gap-2 dark:bg-gray-850"
		>
			<Search className="size-5 stroke-[#818181]" />
			<input
				type="text"
				placeholder="Search"
				class="py-2.5 w-full bg-[#F7F8FA] outline-none dark:bg-gray-850"
			/>
		</div>
		<button
			class="w-24 md:w-32 h-11 rounded-lg bg-black dark:bg-gray-850 font-semibold text-white hover:bg-gray-850 flex justify-center items-center gap-1"
			on:click={() => {
				showAddTeamModal = true;
			}}
		>
			<Plus className="size-4 stroke-white dark:stroke-white" strokeWidth="2" />
			Teams
		</button>
	</div>
	<div>
		<TeamCard team={teamPlaceholder[0]} />
	</div>
	<AddTeamModal bind:show={showAddTeamModal} />
</div>
