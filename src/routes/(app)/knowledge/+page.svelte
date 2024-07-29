<script>
	import Plus from '$lib/components/icons/Plus.svelte';
	import Search from '$lib/components/icons/Search.svelte';
	import BreadCrumbs from '$lib/components/knowledge/BreadCrumbs.svelte';
	import MainFolder from '$lib/components/knowledge/MainFolder.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="p-4 md:p-5 md:pt-2 h-[90%] w-full flex flex-col gap-4">
	<div class="w-full py-2 flex justify-between items-center">
		<div
			class="w-full md:w-80 h-11 rounded-xl bg-[#F7F8FA] shadow-md flex items-center px-5 gap-2 dark:bg-gray-850"
			in:fade={{duration:200}}
		>
			<Search className="size-5 stroke-[#818181]" />
			<input
				type="text"
				placeholder="Search Knowledge Base"
				class="py-2.5 w-full bg-[#F7F8FA] outline-none dark:bg-gray-850"
			/>
		</div>
	</div>
	<div in:fade={{duration:1000}}>
		<BreadCrumbs />
	</div>
	<div class="text-[#6B6C7E] font-semibold" in:fade={{duration:200}}>
		Files
	</div>
	<div class="md:mt-5 w-full h-svh flex flex-wrap justify-evenly gap-y-4 md:justify-start md:content-start overflow-y-auto" in:fade={{duration:200}}>
        <MainFolder name="Finance" count=10 />
        <MainFolder name="Finance" count=10 />
        <MainFolder name="Finance" count=10 />
        <MainFolder name="Finance" count=10 />
        <MainFolder name="Finance" count=10 />
        <MainFolder name="Finance" count=10 />
        <MainFolder name="Finance" count=10 />
        <MainFolder name="Developers" count=15 />
	</div>
</div>
