<script>
	import { goto } from '$app/navigation';
	import Folder from '../icons/Folder.svelte';
	import { page } from '$app/stores';
	export let folder;
</script>

<button
	class="w-40 md:w-48 h-fit p-2 flex flex-col justify-center items-center gap-1 rounded-xl cursor-pointer group hover:bg-[#F3F6FD] dark:hover:bg-gray-850"
	on:click={() => goto(`${$page.url.href}/${folder.resource_id}`)}
>
	<div class="relative">
		<Folder className="size-28" />
		<span
			class="absolute top-[60%] left-[45%] -translate-x-1/2 -translate-y-1/2 text-white text-2xl"
			>{0}</span
		>
	</div>
	<p class="text-[#676767] w-full text-center text-xl truncate">{folder?.title}</p>
</button>
