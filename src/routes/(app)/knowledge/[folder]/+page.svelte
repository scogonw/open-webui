<script>
	import { page } from '$app/stores';
	import { getFilesByParent } from '$lib/apis/triton';
	import DownCarret from '$lib/components/icons/DownCarret.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	import Search from '$lib/components/icons/Search.svelte';
	import SmallFolder from '$lib/components/icons/SmallFolder.svelte';
	import BreadCrumbs from '$lib/components/knowledge/BreadCrumbs.svelte';
	import Files from '$lib/components/knowledge/Files.svelte';
	import NewFolderModal from '$lib/components/knowledge/NewFolderModal.svelte';
	import UploadDropDown from '$lib/components/knowledge/UploadDropDown.svelte';
	import { getCookie } from '$lib/utils';
	import { Select } from 'bits-ui';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { files } from '$lib/stores';

	const access_token = getCookie('access_token');

	const fetchFiles = async (token, id) => {
		const data = await getFilesByParent(token, id);
		if (data) {
			files.set(data)
		}
	};

	$: parentId = $page.params.folder;

	$: if (parentId) {
		fetchFiles(access_token, parentId);
	}

	let showNewFolderModal = false;

	// onMount(async () => {
	// 	fetchFiles(access_token, parentId);
	// });
</script>

<div class="p-4 md:p-5 md:pt-2 h-[90%] w-full flex flex-col gap-4">
	<div class="w-full h-20 flex justify-between items-center gap-2">
		<div
			class="w-52 md:w-96 h-11 rounded-xl bg-[#F7F8FA] shadow-md flex items-center px-5 gap-2 dark:bg-gray-850"
		>
			<Search className="size-5 stroke-[#818181]" />
			<input
				type="text"
				placeholder="Search Knowledge Base"
				class="py-2.5 w-full bg-[#F7F8FA] outline-none dark:bg-gray-850"
			/>
		</div>
		<div class="">
			<UploadDropDown bind:showNewFolderModal>
				<button
					class="flex justify-center items-center bg-black px-5 py-2 rounded-lg gap-2 text-base font-semibold text-white"
				>
					<Plus strokeWidth="2" />
					New
				</button>
			</UploadDropDown>
		</div>
	</div>
	<div class="" in:fade={{ duration: 200 }}>
		<BreadCrumbs />
	</div>
	<div class="text-[#6B6C7E] font-semibold">Files</div>
	<div class="w-full h-svh">
		<div class="w-full flex p-2 text-[#6B6C7E] font-semibold">
			<div class="w-12" />
			<div class="w-72 flex-grow">Name</div>
			<div class="w-20">Used</div>
			<div class="w-36 pl-2">Access</div>
			<div class="w-72">Uploaded By</div>
			<div class="w-36">Date</div>
		</div>
		{#each $files as file}
			<Files
				{file}
				name="Documentation"
				hit="12"
				access="admin"
				user={{ avatar: 'https://picsum.photos/200', name: 'Lionel Ronaldo' }}
				uploadDate="12/03/2024"
			/>
		{/each}
	</div>
	<NewFolderModal bind:show={showNewFolderModal} />
</div>
