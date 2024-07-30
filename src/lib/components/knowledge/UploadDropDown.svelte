<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import Dropdown from '../common/Dropdown.svelte';
	import { flyAndScale } from '$lib/utils/transitions';
	import NewFolder from '../icons/NewFolder.svelte';
	import FileUpload2 from '../icons/FileUpload2.svelte';
	import LinkFIle from '../icons/LinkFIle.svelte';

	let show = false;
	export let showNewFolderModal;
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
			<DropdownMenu.Item
				class="flex h-10 select-none items-center rounded-md py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer hover:bg-[#F3F6FD] dark:hover:bg-gray-700 !ring-0 !ring-transparent data-[highlighted]:bg-muted"
				on:click={() => {
					showNewFolderModal = true;
				}}
			>
				<NewFolder className="w-4 h-4" />
				<p class="ml-2">New Folder</p>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="flex h-10 select-none items-center rounded-md py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer hover:bg-[#F3F6FD] dark:hover:bg-gray-700 !ring-0 !ring-transparent data-[highlighted]:bg-muted"
				on:click={() => {}}
			>
				<FileUpload2 className="w-4 h-4 stroke-[#666F8D]" />
				<p class="ml-2">File Upload</p>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="flex h-10 select-none items-center rounded-md py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer hover:bg-[#F3F6FD] dark:hover:bg-gray-700 !ring-0 !ring-transparent data-[highlighted]:bg-muted"
			>
				<LinkFIle className="w-4 h-4 stroke-[#666F8D]" />
				<p class="ml-2">Add Links</p>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</div>
</Dropdown>
