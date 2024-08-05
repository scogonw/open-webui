<script lang="ts">
	import { flyAndScale } from '$lib/utils/transitions';
	import Modal from '../common/Modal.svelte';
	import Check from '../icons/Check.svelte';
	import Cross from '../icons/Cross.svelte';
	import { Checkbox, Combobox, Select } from 'bits-ui';
	import { tweened } from 'svelte/motion';
	import { cubicInOut, cubicOut, linear } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { editTeam, inviteUser } from '$lib/apis/triton';
	import { allUsers, teams, user } from '$lib/stores';
	import { writable } from 'svelte/store';
	import { getCookie } from '$lib/utils';
	import { toast } from 'svelte-sonner';

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

	export let team;
	export let show = false;
	let inviteEmail = '';
	let name = team?.name;
	const access_token = getCookie('access_token');

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

	const handleSubmit = async () => {
		const editedTeam = await editTeam(access_token, team?.uid, {
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
			inviteEmail = '';
			name = editedTeam?.name;
			show = false;
			toast.success('Team name updated');
		}
	};

	const invteByEmail = async () => {
		const body = {
			invitationTo: 'TEAM',
			email: inviteEmail,
			id: team?.uid
		};
		const invited = await inviteUser(access_token, body);
		if (invited) {
			inviteEmail = '';
			show = false;
			toast.success('User invitation email sent');
		}
	};
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
					type="email"
					id="team-members"
					placeholder="Invite by email"
					autocomplete="email"
					class="outline-none flex-grow py-2 px-4 rounded-lg border dark:bg-gray-800 border-[#E2E4EA] dark:border-gray-800 dark:text-white dark:caret-white"
					bind:value={inviteEmail}
				/>
				<button
					class="w-20 bg-[#213BFD] text-white border border-[#1B5AC2] rounded-lg hover:bg-[#1B5AC2]"
					style="transform: scale({$scale});"
					on:click={() => {
						invteByEmail();
						handleClick();
					}}>Invite</button
				>
			</div>
			<hr class="dark:border-gray-800" />
			<div class="max-h-60 px-2 flex flex-col gap-2 overflow-y-auto">
				{#if $allUsers.length > 0}
					{#each $allUsers as user}
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
									src={user.avatar_link ||
										`https://ui-avatars.com/api/?background=5d6d73&color=ffffff&name=${user?.name}`}
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
			<hr class="dark:border-gray-800" />
			<button
				class="bg-black hover:bg-gray-850 text-white px-5 py-2 rounded-lg w-full m-auto"
				on:click={handleSubmit}>Submit</button
			>
		</div>
	</div>
</Modal>
