<script lang="ts">
	import { page } from '$app/stores';
	import { createFolder } from '$lib/apis/triton';
	import { getCookie } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import Modal from '../common/Modal.svelte';
	import Cross from '../icons/Cross.svelte';
	import { files } from '$lib/stores';

	export let show = false;

	let foldername = '';

	const access_token = getCookie('access_token');

	const handleclick = async () => {
		if (foldername) {
			const body = {
				title: foldername,
				mime_type: 'application/folder',
				parent: $page.params.folder,
				size: 0,
				is_org_drive: true
			};
			const data = await createFolder(access_token, body);
			if (data) {
                files.update(prev=>[data,...prev]);
				toast.success(`New folder ${foldername} created`);
				show=false;
			}
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
			<h1 class="text-lg font-medium dark:text-white">New Folder</h1>
			<label for="team-name" class="text-sm font-normal text-[#334158] dark:text-white">Name</label>
			<input
				type="text"
				id="team-name"
				bind:value={foldername}
				placeholder="Display Name"
				required
				class="outline-none py-2 px-4 rounded-lg border dark:bg-gray-800 border-[#E2E4EA] dark:border-gray-800 dark:text-white dark:caret-white"
			/>
			<div class="text-right">
				<button
					class="bg-white text-[#6D6D6D] border border-[#CECECE] px-5 py-2 rounded-lg w-fit m-auto"
					on:click={() => {
						show = false;
					}}>Close</button
				>
				<button class="bg-black text-white px-5 py-2 rounded-lg w-fit m-auto" on:click={handleclick}
					>Create</button
				>
			</div>
		</div>
	</div>
</Modal>
