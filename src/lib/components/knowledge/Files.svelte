<script lang="ts">
	import { Select } from 'bits-ui';
	import SmallFolder from '../icons/SmallFolder.svelte';
	import DownCarret from '../icons/DownCarret.svelte';
	import { goto } from '$app/navigation';
	import LinkIcon from '../icons/LinkIcon.svelte';
	import ThreeDots from '../icons/ThreeDots.svelte';
	import FileDropDown from './FileDropDown.svelte';
	import Tooltip from '../common/Tooltip.svelte';
	import ImageIcon from '../icons/ImageIcon.svelte';
	import TextIcon from '../icons/TextIcon.svelte';
	import ExcelIcon from '../icons/ExcelIcon.svelte';
	import Pdf from '../icons/Pdf.svelte';
	import { editAssetOnDrive } from '$lib/apis/triton';
	import { getCookie } from '$lib/utils';
	import { files } from '$lib/stores';
	import { toast } from 'svelte-sonner';

	const access_token = getCookie('access_token');
	export let hit = 0;
	export let file;

	const mimeTypeIconLookup = {
		'application/folder': SmallFolder,
		'application/link': LinkIcon,
		'image/png': ImageIcon,
		'image/jpeg': ImageIcon,
		'text/plain': TextIcon,
		'application/vnd.ms-excel': ExcelIcon,
		'application/pdf': Pdf
	};

	const mimeTypeClassLookup = {
		'application/folder': 'size-5 fill-black stroke-black dark:stroke-white dark:fill-white',
		'application/link': 'size-5 fill-black stroke-black dark:stroke-white dark:fill-white',
		'image/png': 'size-5 fill-[#FF5F5F] stroke-none',
		'image/jpeg': 'size-5 fill-[#FF5F5F] stroke-none',
		'text/plain': 'size-5 fill-[#FF5F5F] stroke-none',
		'application/msword': 'size-5 fill-[#FF5F5F] stroke-none',
		'application/vnd.ms-excel': 'size-5 fill-[#FF5F5F] stroke-none',
		'application/pdf': 'size-5 fill-[#FF5F5F] stroke-none'
	};

function formatDateToMMDDYYYYWithTime(isoDateString) {
    const date = new Date(isoDateString);

    // Format the date to MM/DD/YYYY
    const formattedDate =
        `${(date.getMonth() + 1).toString().padStart(2, '0')}/` +
        `${date.getDate().toString().padStart(2, '0')}/` +
        `${date.getFullYear()}`;

    // Format the time to hh:mm:ss AM/PM
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');

    const formattedTime = `${formattedHours}:${minutes} ${amPm}`;

    return `${formattedDate} ${formattedTime}`;
}


	const handleClick = async () => {
		if (file.mime_type === 'application/folder') {
			goto(`/knowledge/${file?.resource_id}`);
		}
		// if(file)
	};

	const handSelectChange = async (value) => {
		if (value !== file?.access_levels) {
			const body = {
				access_levels: value
			};
			const data = await editAssetOnDrive(access_token, file?.resource_id, body);
			if (data) {
				files.update((prev) =>
					prev.map((file) => {
						if (file.resource_id === data.resource_id) {
							return data;
						}
						return file;
					})
				);
				toast.success('Access Level Changed');
			}
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-full h-12 flex px-2 items-center hover:bg-[#F3F6FD] hover:dark:bg-gray-850">
	<div class="w-12">
		<svelte:component
			this={mimeTypeIconLookup[file.mime_type] || SmallFolder}
			className={mimeTypeClassLookup[file.mime_type] ||
				'size-5 fill-black stroke-black dark:stroke-white dark:fill-white'}
		/>
	</div>
	<div
		class="w-72 h-12 flex items-center flex-grow text-sm text-[#272833] font-semibold dark:text-white cursor-pointer"
		on:click={handleClick}
	>
		<p class="truncate pr-5">
			{file?.title}
		</p>
	</div>
	<div class="w-20 text-sm text-[#272833] font-semibold dark:text-white">{hit}</div>
	<div class="w-36 text-sm text-[#272833] font-semibold">
		<Select.Root
			class="w-full"
			onSelectedChange={(e) => {
				handSelectChange(e.value);
			}}
		>
			<Select.Trigger
				class="w-full flex justify-between items-center text-left hover:bg-[#F3F6FD] p-2 pr-6 rounded-lg dark:hover:bg-gray-850"
			>
				<Select.Value placeholder={file?.access_levels} class="dark:text-white" />
				<DownCarret className="size-3 inline fill-black dark:fill-white" />
			</Select.Trigger>
			<Select.Content class="border rounded-lg dark:border-gray-850">
				<Select.Item
					class="flex h-10 w-full select-none items-center rounded-button py-3 pl-2 pr-1.5 text-sm cursor-pointer rounded-lg bg-white dark:bg-gray-900 dark:hover:bg-gray-850 dark:text-white  hover:bg-[#F3F6FD] outline-none transition-all duration-75 data-[highlighted]:bg-muted"
					value="USER"
				>
					USER
				</Select.Item>
				<Select.Item
					class="flex h-10 w-full select-none items-center rounded-button py-3 pl-2 pr-1.5 text-sm cursor-pointer rounded-lg bg-white dark:bg-gray-900 dark:hover:bg-gray-850 dark:text-white hover:bg-[#F3F6FD] outline-none transition-all duration-75 data-[highlighted]:bg-muted"
					value="TEAM"
				>
					TEAM
				</Select.Item>
				<Select.Item
					class="flex h-10 w-full select-none items-center rounded-button py-3 pl-2 pr-1.5 text-sm cursor-pointer rounded-lg bg-white dark:bg-gray-900 dark:hover:bg-gray-850 dark:text-white hover:bg-[#F3F6FD] outline-none transition-all duration-75 data-[highlighted]:bg-muted"
					value="ORG"
				>
					ORG
				</Select.Item>
				<Select.Item
					class="flex h-10 w-full select-none items-center rounded-button py-3 pl-2 pr-1.5 text-sm cursor-pointer rounded-lg bg-white dark:bg-gray-900 dark:hover:bg-gray-850 dark:text-white hover:bg-[#F3F6FD] outline-none transition-all duration-75 data-[highlighted]:bg-muted"
					value="PUBLIC"
				>
					PUBLIC
				</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
	<div class="w-72 flex items-center gap-2">
		<img
			src={file?.created_by?.avatar_link ||
				`https://ui-avatars.com/api/?background=5d6d73&color=ffffff&name=${file?.created_by?.name}`}
			alt="avatar"
			class="w-9 h-9 rounded-full"
		/>
		<p class="text-[#6B6C7E] text-sm dark:text-white truncate">{file?.created_by?.name}</p>
	</div>
	<div class="w-36 text-[#6B6C7E] text-sm dark:text-white">
		{formatDateToMMDDYYYYWithTime(file?.created_at)}
	</div>
	<div class="w-20 text-center">
		<FileDropDown {file}>
			<Tooltip content="Options">
				<ThreeDots className="size-3" />
			</Tooltip>
		</FileDropDown>
	</div>
</div>
<hr class="dark:border-gray-700" />
