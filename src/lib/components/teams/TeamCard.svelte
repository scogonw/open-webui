<script lang="ts">
	import { fade } from 'svelte/transition';
	import Cross from '../icons/Cross.svelte';
	import Tooltip from '../common/Tooltip.svelte';
	import ThreeDots from '../icons/ThreeDots.svelte';
	import TeamDropDown from './TeamDropDown.svelte';
	import AddDocument from '../icons/AddDocument.svelte';
	import EditTeam from '../icons/EditTeam.svelte';

	export let team;
	export let showEditTeamModal;
	export let showUploadDocumentsModal;

	let container;
	let isAtBottom = false;

	const handleScroll = () => {
		isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight;
	};
</script>

<div
	class="h-[22rem] w-80 rounded-xl flex flex-col border border-[#E5E5E580] dark:border-gray-800 shadow-md overflow-hidden text-black dark:text-white relative group"
	in:fade={{ duration: 200 }}
>
	<div
		class="h-12 w-full flex justify-between items-center pl-3 pr-2 bg-[#F7F8FA] dark:bg-gray-850 border-b border-b-[#E5E5E5] dark:border-gray-800"
	>
		<h1 class="font-semibold text-lg">{team.teamName}</h1>
		<div class="flex gap-2">
			<Tooltip content="Add Document">
				<button on:click={()=>{
					showUploadDocumentsModal=true;
				}}>
					<AddDocument className="w-[1.1rem] h-[1.1rem] cursor-pointer"/>
			</button>
			</Tooltip>
			<!-- <TeamDropDown bind:showEditTeamModal={showEditTeamModal}>
				<Tooltip content='More'>
					<ThreeDots className="size-3 cursor-pointer" />
				</Tooltip>
			</TeamDropDown> -->
			<Tooltip content='Edit'>
				<button
				on:click={()=>{
					showEditTeamModal=true;
				}}>
					<EditTeam className='size-4 cursor-pointer'/>
				</button>
			</Tooltip>
			
		</div>
	</div>
	<div
		class="flex-grow h-full w-full p-3 flex flex-col gap-4 overflow-y-auto no-scrollbar"
		bind:this={container}
		on:scroll={handleScroll}
	>
		<div class="flex items-center gap-3">
			<img src={team.agent.avatar} alt="Profile" class="rounded-full w-9 h-9" />
			<h2 class="text-xs font-medium">{team.agent.name}</h2>
		</div>
		{#if team.users.length > 0}
			{#each team.users as user}
				<div class="flex items-center gap-3 cursor-pointer group/user">
					<img src={user.avatar} alt="Profile" class="rounded-full w-9 h-9" />
					<div class="flex-grow">
						<h2 class="text-xs font-medium">{user.name}</h2>
						<h2 class="text-xs font-medium text-[#90A0B7]">{user.email}</h2>
					</div>
					{#if user.role}
						<div class="text-[10px] text-[#90A0B7] ml-auto group-hover/user:hidden">
							{user.role}
						</div>
					{/if}
					<Tooltip content={'Remove'} className={'ml-auto'}>
						<div class="text-[10px] text-[#90A0B7] hidden group-hover/user:block">
							<Cross className="size-5  translate-x-1/4 translate-y-1/4" />
						</div>
					</Tooltip>
				</div>
			{/each}
		{/if}
	</div>
	{#if team.users.length > 4}
		<div
			class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/100 dark:from-gray-850 to-transparent blur-lg group-hover:hidden transition-all"
			class:hidden={isAtBottom}
		/>
	{/if}
</div>
