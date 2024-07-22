<script lang="ts">
	import Plus from '$lib/components/icons/Plus.svelte';
	import Search from '$lib/components/icons/Search.svelte';
	import AddTeamModal from '$lib/components/teams/AddTeamModal.svelte';
	import EditTeamModal from '$lib/components/teams/EditTeamModal.svelte';
	import TeamCard from '$lib/components/teams/TeamCard.svelte';
	import UploadDocumentsModal from '$lib/components/teams/UploadDocumentsModal.svelte';

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

	let showAddTeamModal = false;
	let showEditTeamModal = false;
	let showUploadDocumentsModal = false;
</script>

<div class="p-4 md:p-10 md:pl-20 md:pt-2 h-full w-full flex flex-col">
	<div class="w-full h-20 flex justify-between items-center">
		<div
			class="w-52 md:w-80 h-11 rounded-xl bg-[#F7F8FA] shadow-md flex items-center px-5 gap-2 dark:bg-gray-850"
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
	<div class="w-full flex flex-wrap justify-center md:justify-start gap-10 mt-5 pb-2 overflow-y-auto no-scrollbar">
		<TeamCard team={teamPlaceholder[0]} bind:showEditTeamModal={showEditTeamModal} bind:showUploadDocumentsModal={showUploadDocumentsModal}/>
		<TeamCard team={teamPlaceholder[1]} bind:showEditTeamModal={showEditTeamModal} bind:showUploadDocumentsModal={showUploadDocumentsModal}/>
		<TeamCard team={teamPlaceholder[2]} bind:showEditTeamModal={showEditTeamModal} bind:showUploadDocumentsModal={showUploadDocumentsModal}/>
		<TeamCard team={teamPlaceholder[3]} bind:showEditTeamModal={showEditTeamModal} bind:showUploadDocumentsModal={showUploadDocumentsModal}/>
	</div>
	<AddTeamModal bind:show={showAddTeamModal} />
	<EditTeamModal bind:show={showEditTeamModal}/>
	<UploadDocumentsModal bind:show={showUploadDocumentsModal}/>
</div>
