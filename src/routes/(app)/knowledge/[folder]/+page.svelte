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
	import UploadDocumentsModal from '$lib/components/teams/UploadDocumentsModal.svelte';
	import UploadLinkModal from '$lib/components/knowledge/UploadLinkModal.svelte';
	import DownArrow from '$lib/components/icons/DownArrow.svelte';
	import EmptyFolderIcon from '$lib/components/icons/EmptyFolderIcon.svelte';

	const access_token = getCookie('access_token');

	let sortBy = localStorage.getItem('sortBy');

	if (!sortBy) {
		localStorage.setItem('sortBy', 'created_at');
		sortBy = 'created_at';
	}

	let sortOrder = localStorage.getItem('sortOrder');

	if (!sortOrder) {
		localStorage.setItem('sortOrder', 'desc');
		sortOrder = 'desc';
	}

	let loading = true;

	const fetchFiles = async (token, id) => {
		loading = true;
		const data = await getFilesByParent(token, id, sortBy, sortOrder);
		if (data) {
			files.set(data);
		}
		scrollUp();
		loading = false;
	};

	$: parentId = $page.params.folder;

	$: if (parentId) {
		fetchFiles(access_token, parentId);
	}

	let scrollableDiv;

	function scrollUp() {
		if (scrollableDiv) {
			scrollableDiv.scrollTop = 0;
		}
	}

	let showNewFolderModal = false;
	let showUploadDocumentModal = false;
	let showUploadLinkModal = false;

	$: currentFiles = $files; // Reactive statement to get the current value of files

	$: breadcrumb = currentFiles.length > 0 ? currentFiles[0]?.breadcrumbs : null;

	// onMount(async () => {
	// 	fetchFiles(access_token, parentId);
	// });
</script>

<div class="p-4 md:p-5 md:pt-2 h-[90%] w-full flex flex-col gap-4">
	<div class="w-full h-12 flex justify-between items-center gap-2">
		<div
			class="w-52 md:w-96 max-h-11 rounded-xl bg-[#F7F8FA] shadow-md flex items-center px-5 gap-2 dark:bg-gray-850"
		>
			<Search className="size-5 stroke-[#818181]" />
			<input
				type="text"
				placeholder="Search Knowledge Base"
				class="py-2.5 w-full bg-[#F7F8FA] outline-none dark:bg-gray-850"
			/>
		</div>
		<div class="">
			<UploadDropDown bind:showNewFolderModal bind:showUploadDocumentModal bind:showUploadLinkModal>
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
		{#if breadcrumb && !loading}
			<BreadCrumbs {breadcrumb} />
		{:else}
			<BreadCrumbs />
		{/if}
	</div>
	<!-- <div class="text-[#6B6C7E] font-semibold">Files</div> -->
	{#if $files?.length > 0 && !loading}
		<div class="w-full flex p-2 text-[#6B6C7E] font-semibold">
			<div class="w-12" />
			<div class="w-72 flex-grow flex gap-2 items-center">
				<button
					class="px-3 rounded-md hover:bg-[#F3F6FD]"
					on:click={() => {
						localStorage.setItem('sortBy', 'title');
						sortBy = 'title';
						fetchFiles(access_token, parentId);
					}}
				>
					Name
				</button>
				{#if sortBy === 'title'}
					{#if sortOrder === 'asc'}
						<button
							class="rounded-md hover:bg-[#F3F6FD]"
							on:click={() => {
								localStorage.setItem('sortOrder', 'desc');
								sortOrder = 'desc';
								fetchFiles(access_token, parentId);
							}}
						>
							<DownArrow className="size-5 stroke-[#6B6C7E] fill-[#6B6C7E] transform rotate-180" />
						</button>
					{/if}
					{#if sortOrder === 'desc'}
						<button
							on:click={() => {
								localStorage.setItem('sortOrder', 'asc');
								sortOrder = 'asc';
								fetchFiles(access_token, parentId);
							}}
						>
							<DownArrow className="size-5 stroke-[#6B6C7E] fill-[#6B6C7E]" />
						</button>
					{/if}
				{/if}
			</div>
			<div class="w-28">Interactions</div>
			<div class="w-36 pl-2">Access</div>
			<div class="w-72">Uploaded By</div>
			<div class="w-36 flex gap-2 items-center">
				<button
					class="px-3 rounded-md hover:bg-[#F3F6FD]"
					on:click={() => {
						localStorage.setItem('sortBy', 'created_at');
						sortBy = 'created_at';
						fetchFiles(access_token, parentId);
					}}
				>
					Date
				</button>
				{#if sortBy === 'created_at'}
					{#if sortOrder === 'asc'}
						<button
							on:click={() => {
								localStorage.setItem('sortOrder', 'desc');
								sortOrder = 'desc';
								fetchFiles(access_token, parentId);
							}}
						>
							<DownArrow className="size-5 stroke-[#6B6C7E] fill-[#6B6C7E] transform rotate-180" />
						</button>
					{/if}
					{#if sortOrder === 'desc'}
						<button
							on:click={() => {
								localStorage.setItem('sortOrder', 'asc');
								sortOrder = 'asc';
								fetchFiles(access_token, parentId);
							}}
						>
							<DownArrow className="size-5 stroke-[#6B6C7E] fill-[#6B6C7E]" />
						</button>
					{/if}
				{/if}
			</div>
			<div class="w-20 text-center" />
		</div>
		<div class="w-full h-svh overflow-y-auto" bind:this={scrollableDiv} in:fade={{ duration: 200 }}>
			{#each $files as file}
				{#if file.mime_type === 'application/folder'}
					<Files {file} />
				{/if}
			{/each}
			{#each $files as file}
				{#if file.mime_type !== 'application/folder'}
					<Files {file} />
				{/if}
			{/each}
		</div>
	{:else if !loading}
		<div class="w-full h-svh flex justify-center items-center">
			<div class="flex flex-col items-center text-center gap-2">
				<EmptyFolderIcon className="size-52 stroke-none" />
				<h1 class="text-black font-bold text-2xl">Team Knowledge Base is Empty</h1>
				<p class="text-[#7C7C7C] font-normal text-lg">
					Add documents securely to our encrypted Knowledge Hub.<br />You control who can access
					them, anytime you like
				</p>
			</div>
		</div>
	{:else}
		<div class="h-svh" />
	{/if}
	<UploadDocumentsModal bind:show={showUploadDocumentModal} />
	<NewFolderModal bind:show={showNewFolderModal} />
	<UploadLinkModal bind:show={showUploadLinkModal} />
</div>
