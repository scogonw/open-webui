<script lang="ts">
	import { flyAndScale } from '$lib/utils/transitions';
	import Modal from '../common/Modal.svelte';
	import Check from '../icons/Check.svelte';
	import Cross from '../icons/Cross.svelte';
	import { Checkbox, Combobox, Select } from 'bits-ui';
	import { tweened } from 'svelte/motion';
	import { cubicInOut, cubicOut, linear } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { editTeam, getUsers } from '$lib/apis/triton';
	import { teams, user } from '$lib/stores';
	import { writable } from 'svelte/store';

	// Initialize a tweened value for scale
	const scale = tweened(1, {
		duration: 50, // Fast transition duration
		easing: cubicInOut // Easing for smooth transition
	});

	async function handleClick() {
		// Scale down quickly
		await scale.set(0.9, { duration: 100, easing: linear });
		// Scale up even faster
		await scale.set(1, { duration: 100, easing: linear });
	}

	let users = [];

	export let team;
	export let show = false;
	let name = team?.name;

	let selectedUserIds = writable(new Set());

	function toggleUserSelection(userId) {
		selectedUserIds.update((selectedIds) => {
			if (selectedIds.has(userId)) {
				selectedIds.delete(userId);
			} else {
				selectedIds.add(userId);
			}
			console.log($selectedUserIds);
			return selectedIds;
		});
	}

	const handleclick = async () => {
		const editedTeam = await editTeam(team?.uid, {
			name: name,
			type: 'INTERNAL'
		});
		if (editedTeam) {
			teams.update((prev) => {
				return prev.map((e) => {
					if (e?.uid === editedTeam?.uid) {
						return editedTeam;
					}
					return e;
				});
			});
			show=false;
		}
	};

	onMount(async () => {
		const data = await getUsers();
		if (data) {
			users = data;
		}
	});
</script>

<Modal size="w-[26rem]" bind:show>
	<div class="relative">
		<button
			class="absolute top-4 right-1 hover:cursor-pointer"
			on:click={() => {
				show = false;
			}}
		>
			<Cross />
		</button>
		<div
			class="flex flex-col p-5 gap-4 bg-white dark:bg-gray-850 rounded-lg shadow-lg dark:text-white"
		>
			<h1 class="text-lg font-medium dark:text-white">Edit Team</h1>
			<label for="team-name" class="text-sm font-normal text-[#334158] dark:text-white"
				>Team Name</label
			>
			<input
				type="text"
				id="team-name"
				placeholder="Type group name"
				bind:value={name}
				class="outline-none py-2 px-4 rounded-lg border dark:bg-gray-800 border-[#E2E4EA] dark:border-gray-800 dark:text-white dark:caret-white"
			/>
			<label for="team-members" class="text-sm font-normal text-[#334158] dark:text-white"
				>Add Members</label
			>
			<div class="w-full flex gap-2">
				<input
					type="text"
					id="team-members"
					placeholder="Invite by name or type email"
					class="outline-none flex-grow py-2 px-4 rounded-lg border dark:bg-gray-800 border-[#E2E4EA] dark:border-gray-800 dark:text-white dark:caret-white"
				/>
				<button
					class="w-20 bg-[#213BFD] text-white border border-[#1B5AC2] rounded-lg hover:bg-[#1B5AC2]"
					style="transform: scale({$scale});"
					on:click={handleClick}>Invite</button
				>
			</div>
			<hr class="dark:border-gray-800" />
			<div class="max-h-60 px-2 flex flex-col gap-2 overflow-y-auto">
				{#if users.length > 0}
					{#each users as user}
						<div class="flex items-center space-x-3">
							<Checkbox.Root
								id={`terms-${user.id}`}
								aria-labelledby="terms-label"
								class="peer inline-flex size-[20px] items-center justify-center rounded-md border border-muted dark:border-gray-700 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
								on:click={() => toggleUserSelection(user.uid)}
							>
								<Checkbox.Indicator
									let:isChecked
									class="inline-flex w-full h-full items-center justify-center text-background overflow-hidden"
								>
									{#if isChecked}
										<div class="w-full h-full rounded-md bg-[#666F8D] dark:bg-gray-600" />
										<!-- <Check /> -->
									{/if}
								</Checkbox.Indicator>
							</Checkbox.Root>
							<div class="w-full flex items-center gap-5 group/user">
								<img
									src={user.avatar_link}
									alt="Profile"
									class="rounded-full w-9 h-9 md:w-11 md:h-11"
								/>
								<div>
									<h2 class="text-base font-medium">{user.first_name}</h2>
									<h2 class="text-xs font-medium text-[#90A0B7]">{user.email}</h2>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
			<button class="bg-black text-white px-5 py-2 rounded-lg w-fit m-auto" on:click={handleclick}
				>Submit</button
			>
		</div>
	</div>
</Modal>
