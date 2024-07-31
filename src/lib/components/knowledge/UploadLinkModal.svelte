<script lang="ts">
	import { page } from '$app/stores';
	import { createAssetOnDrive } from '$lib/apis/triton';
	import { getCookie } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import Modal from '../common/Modal.svelte';
	import Cross from '../icons/Cross.svelte';
	import { files } from '$lib/stores';
	import { tweened } from 'svelte/motion';
	import { cubicInOut, linear } from 'svelte/easing';
	import Tooltip from '../common/Tooltip.svelte';
	import FileCross from '../icons/FileCross.svelte';
	import LinkIcon from '../icons/LinkIcon.svelte';

	const scale = tweened(1, {
		duration: 50, // Fast transition duration
		easing: cubicInOut // Easing for smooth transition
	});

	async function handleClickAdd() {
		// Scale down quickly
		await scale.set(0.9, { duration: 100, easing: linear });
		// Scale up even faster
		await scale.set(1, { duration: 100, easing: linear });
	}

	export let show = false;

	let linkName = '';
	let url = '';
	let links = [];

	const addLink = () => {
		if (linkName && url) {
			links = [{ name: linkName, url: url }, ...links];
			linkName = '';
			url = '';
		}
	};

	const removeLink = (index) => {
		links = links.filter((e, i) => i !== index);
	};

	const access_token = getCookie('access_token');

	const handleclick = async () => {
		if (links?.length > 0) {
			links.map(async (link) => {
				const body = {
					title: link.name,
					mime_type: 'application/link',
					url: link.url,
					parent: $page.params.folder,
					size: 0,
					is_org_drive: true
				};
				const data = await createAssetOnDrive(access_token, body);
				if (data) {
					files.update((prev) => [data, ...prev]);
				}
			});
			toast.success(`New Link(s) Added`);
			show = false;
		}
	};
</script>

<Modal size="w-[30rem]" bind:show>
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
			class="flex flex-col p-5 gap-3 bg-white dark:bg-gray-850 rounded-lg shadow-lg dark:text-white"
		>
			<h1 class="text-lg font-medium dark:text-white">Add Links</h1>
			<label for="team-name" class="text-sm font-normal text-[#334158] dark:text-white"
				>Name to Display</label
			>
			<input
				type="text"
				id="link-name"
				bind:value={linkName}
				placeholder="Type name for your link"
				required
				class="outline-none py-2 px-4 rounded-lg border dark:bg-gray-800 border-[#E2E4EA] dark:border-gray-800 dark:text-white dark:caret-white"
			/>
			<label for="team-name" class="text-sm font-normal text-[#334158] dark:text-white"
				>Link URL</label
			>
			<div class="w-full flex gap-2">
				<input
					type="text"
					id="link-url"
					bind:value={url}
					placeholder="Enter URL"
					required
					class="outline-none py-2 px-4 flex-grow rounded-lg border dark:bg-gray-800 border-[#E2E4EA] dark:border-gray-800 dark:text-white dark:caret-white"
				/>
				<button
					class="w-20 bg-[#213BFD] text-white border-2 border-[#1B5AC2] rounded-lg hover:bg-[#1B5AC2]"
					style="transform: scale({$scale});"
					on:click={() => {
						handleClickAdd();
						addLink();
					}}>Add</button
				>
			</div>
			<hr class="dark:border-gray-800" />
			<div class="w-full max-h-48 overflow-y-auto no-scrollbar">
				{#if links?.length > 0}
					{#each links as link, index}
						<div
							class="w-full h-14 mb-2 border-2 border-[#E7E7E7] dark:border-gray-700 rounded-2xl p-4 flex items-center gap-3"
						>
							<div>
								<LinkIcon className="size-6 fill-black" />
							</div>
							<div class="flex-grow font-semibold truncate">{link.name}</div>
							<button
								class="w-fit m-auto cursor-pointer hover:scale-110 transition duration-300"
								on:click={() => {
									removeLink(index);
								}}
							>
								<Tooltip content="Remove">
									<FileCross className="size-6" />
								</Tooltip>
							</button>
						</div>
					{/each}
				{/if}
			</div>

			<div class="text-right">
				<button
					class="bg-white text-[#6D6D6D] border border-[#CECECE] px-5 py-2 rounded-lg w-fit m-auto mr-2"
					on:click={() => {
						show = false;
					}}>Close</button
				>
				<button class="bg-black text-white px-5 py-2 rounded-lg w-fit m-auto" on:click={handleclick}
					>Upload</button
				>
			</div>
		</div>
	</div>
</Modal>
