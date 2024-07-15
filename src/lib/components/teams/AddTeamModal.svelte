<script lang="ts">
	import Modal from '../common/Modal.svelte';
	import Check from '../icons/Check.svelte';
	import Cross from '../icons/Cross.svelte';
	import { Checkbox, Select } from 'bits-ui';

	let users = [
		{
			id: 1,
			name: 'Siera Ferguson',
			email: 'sieraferguson@gmail.com',
			role: 'Admin',
			avatar: 'https://picsum.photos/200/300'
		},
		{
			id: 2,
			name: 'Siera Ferguson',
			email: 'sieraferguson@gmail.com',
			role: '',
			avatar: 'https://picsum.photos/200/300'
		},
		{
			id: 3,
			name: 'Siera Ferguson',
			email: 'sieraferguson@gmail.com',
			role: '',
			avatar: 'https://picsum.photos/200/300'
		},
		{
			id: 4,
			name: 'Siera Ferguson',
			email: 'sieraferguson@gmail.com',
			role: '',
			avatar: 'https://picsum.photos/200/300'
		},
		{
			id: 5,
			name: 'Siera Ferguson',
			email: 'sieraferguson@gmail.com',
			role: '',
			avatar: 'https://picsum.photos/200/300'
		},
		{
			id: 6,
			name: 'Siera Ferguson',
			email: 'sieraferguson@gmail.com',
			role: '',
			avatar: 'https://picsum.photos/200/300'
		},
		{
			id: 7,
			name: 'Siera Ferguson',
			email: 'sieraferguson@gmail.com',
			role: '',
			avatar: 'https://picsum.photos/200/300'
		},
		{
			id: 8,
			name: 'Siera Ferguson',
			email: 'sieraferguson@gmail.com',
			role: '',
			avatar: 'https://picsum.photos/200/300'
		}
	];

	export let show = false;
</script>

<Modal size="w-[32rem]" bind:show>
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
			<h1 class="text-lg font-medium dark:text-white">Create New Team</h1>
			<label for="team-name" class="text-sm font-normal text-[#334158] dark:text-white"
				>Team Name</label
			>
			<input
				type="text"
				id="team-name"
				placeholder="Type group name"
				class="outline-none py-2 px-4 rounded-lg border border-[#E2E4EA] dark:border-gray-800 dark:text-white dark:caret-white"
			/>
			<label for="team-members" class="text-sm font-normal text-[#334158] dark:text-white"
				>Add Members</label
			>
			<div class="w-full flex gap-2">
				<input
					type="text"
					id="team-members"
					placeholder="Invite by name or type email"
					class="outline-none flex-grow py-2 px-4 rounded-lg border border-[#E2E4EA] dark:border-gray-800 dark:text-white dark:caret-white"
				/>
				<button
					class="w-20 bg-[#213BFD] text-white border border-[#1B5AC2] rounded-lg hover:bg-[#1B5AC2]"
					>Invite</button
				>
			</div>
			<hr class="dark:border-gray-800"/>
			<div class="max-h-72 px-2 flex flex-col gap-2 overflow-y-auto">
				{#each users as user}
					<div class="flex items-center space-x-3">
						<Checkbox.Root
							id={`terms-${user.id}`}
							aria-labelledby="terms-label"
							class="peer inline-flex size-[20px] items-center justify-center rounded-md border border-muted bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
						>
							<Checkbox.Indicator
								let:isChecked
								class="inline-flex items-center justify-center text-background"
							>
								{#if isChecked}
									<Check />
								{/if}
							</Checkbox.Indicator>
						</Checkbox.Root>
						<div class="w-full flex items-center gap-5 cursor-pointer group/user">
							<img src={user.avatar} alt="Profile" class="rounded-full w-9 md:w-12 h-9 md:h-12" />
							<div>
								<h2 class="text-base font-medium">{user.name}</h2>
								<h2 class="text-xs font-medium text-[#90A0B7]">{user.email}</h2>
							</div>
							<Select.Root>
								<Select.Trigger>
									<Select.Value />
								</Select.Trigger>

								<Select.Content>
									<Select.Item value='admin'>
                                        Admin
										<Select.ItemIndicator class="ml-auto" asChild={false}>
											<Check />
										</Select.ItemIndicator>
									</Select.Item>

									<Select.Arrow />
								</Select.Content>
							</Select.Root>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Modal>
