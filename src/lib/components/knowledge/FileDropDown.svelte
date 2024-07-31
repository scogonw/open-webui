<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import Dropdown from '../common/Dropdown.svelte';
	import { flyAndScale } from '$lib/utils/transitions';
	import GarbageBin from '../icons/GarbageBin.svelte';
	import { deleteAssetOnDrive } from '$lib/apis/triton';
	import { getCookie } from '$lib/utils';
	import { files } from '$lib/stores';
	import { toast } from 'svelte-sonner';

	export let file;
	let show = false;
	const access_token = getCookie('access_token');

	const handleDelete = async () => {
		const data = await deleteAssetOnDrive(access_token, file.resource_id);
		if (data) {
			files.update((prev) => prev.filter((e) => e.resource_id !== file.resource_id));
			toast.success('Asset Deleted');
		}
	};

	const handlePreview = async () => {};

	const handleDownload = async () => {};
</script>

<Dropdown bind:show>
	<slot />

	<div slot="content">
		<DropdownMenu.Content
			class="w-full max-w-[150px] rounded-xl px-1 py-1 text-[#666F8D] border-gray-300/30 dark:border-gray-700/50 z-50 bg-white dark:bg-gray-850 dark:text-white shadow"
			sideOffset={1}
			alignOffset={1}
			side="right"
			align="start"
			transition={flyAndScale}
		>
			<!-- <DropdownMenu.Item
				class="flex h-10 select-none items-center rounded-md py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer hover:bg-[#F3F6FD] dark:hover:bg-gray-700 !ring-0 !ring-transparent data-[highlighted]:bg-muted"
				on:click={() => {
				}}
			>
				<Edit className="w-4 h-4 stroke-[#666F8D]" />
				<p class="ml-2">Edit</p>
			</DropdownMenu.Item> -->
			{#if file?.mime_type !== 'application/folder' && file?.mime_type !== 'application/link'}
				<DropdownMenu.Item
					class="flex h-10 select-none items-center rounded-md py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer hover:bg-[#F3F6FD] dark:hover:bg-gray-700 !ring-0 !ring-transparent data-[highlighted]:bg-muted"
					on:click={handlePreview}
				>
					<GarbageBin className="w-4 h-4 stroke-[#666F8D]" />
					<p class="ml-2">Preview</p>
				</DropdownMenu.Item>
				<DropdownMenu.Item
					class="flex h-10 select-none items-center rounded-md py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer hover:bg-[#F3F6FD] dark:hover:bg-gray-700 !ring-0 !ring-transparent data-[highlighted]:bg-muted"
					on:click={handleDownload}
				>
					<GarbageBin className="w-4 h-4 stroke-[#666F8D]" />
					<p class="ml-2">Download</p>
				</DropdownMenu.Item>
			{/if}
			<DropdownMenu.Item
				class="flex h-10 select-none items-center rounded-md py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer hover:bg-[#F3F6FD] dark:hover:bg-gray-700 !ring-0 !ring-transparent data-[highlighted]:bg-muted"
				on:click={handleDelete}
			>
				<GarbageBin className="w-4 h-4 stroke-[#666F8D]" />
				<p class="ml-2">Delete</p>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</div>
</Dropdown>
