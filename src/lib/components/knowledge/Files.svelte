<script lang="ts">
	import { Select } from 'bits-ui';
	import SmallFolder from '../icons/SmallFolder.svelte';
	import DownCarret from '../icons/DownCarret.svelte';

	export let name="Default";
	export let hit = 0;
	export let access="Admin";
	export let user = {avatar:"https://picsum.photos/200",name:"Bessie Cooper"};
	export let uploadDate = '16/02/2024';
</script>

<div class="w-full flex p-2 mt-2 items-center">
	<div class="w-12"><SmallFolder /></div>
	<div class="w-72 flex-grow text-sm text-[#272833] font-semibold dark:text-white">{name}</div>
	<div class="w-20 text-sm text-[#272833] font-semibold dark:text-white">{hit}</div>
	<div class="w-36 text-sm text-[#272833] font-semibold">
		<Select.Root class="w-full">
			<Select.Trigger class="hover:bg-[#F3F6FD] p-2 rounded-lg dark:hover:bg-gray-850">
				<Select.Value placeholder="Access" class="dark:text-white" />
				<DownCarret className="size-3 inline ml-4 fill-black dark:fill-white" />
			</Select.Trigger>	
			<Select.Content class="border rounded-lg dark:border-gray-850">
				<Select.Item
					class="flex h-10 w-full select-none items-center rounded-button py-3 pl-2 pr-1.5 text-sm cursor-pointer rounded-lg bg-white dark:bg-gray-900 dark:hover:bg-gray-850 dark:text-white  hover:bg-[#F3F6FD] outline-none transition-all duration-75 data-[highlighted]:bg-muted"
				>
					Public
				</Select.Item>
				<Select.Item
					class="flex h-10 w-full select-none items-center rounded-button py-3 pl-2 pr-1.5 text-sm cursor-pointer rounded-lg bg-white dark:bg-gray-900 dark:hover:bg-gray-850 dark:text-white hover:bg-[#F3F6FD] outline-none transition-all duration-75 data-[highlighted]:bg-muted"
				>
					Private
				</Select.Item>
				<Select.Item
					class="flex h-10 w-full select-none items-center rounded-button py-3 pl-2 pr-1.5 text-sm cursor-pointer rounded-lg bg-white dark:bg-gray-900 dark:hover:bg-gray-850 dark:text-white hover:bg-[#F3F6FD] outline-none transition-all duration-75 data-[highlighted]:bg-muted"
				>
					Protected
				</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
	<div class="w-72 flex items-center gap-2">
		<img src={user?.avatar} alt="avatar" class="w-9 h-9 rounded-full" />
		<p class="text-[#6B6C7E] text-sm dark:text-white">{user?.name}</p>
	</div>
	<div class="w-36 text-[#6B6C7E] text-sm dark:text-white">{uploadDate}</div>
</div>
<hr />
