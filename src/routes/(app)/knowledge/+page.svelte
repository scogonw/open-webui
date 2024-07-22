<script>
	import Plus from '$lib/components/icons/Plus.svelte';
	import Search from '$lib/components/icons/Search.svelte';
	import BreadCrumbs from '$lib/components/knowledge/BreadCrumbs.svelte';
	import MainFolder from '$lib/components/knowledge/MainFolder.svelte';
</script>

<div class="p-4 md:p-10 md:pl-20 md:pt-2 h-full w-full flex flex-col gap-4">
	<div class="w-full h-20 flex justify-between items-center">
		<div
			class="w-full md:w-80 h-11 rounded-xl bg-[#F7F8FA] shadow-md flex items-center px-5 gap-2 dark:bg-gray-850"
		>
			<Search className="size-5 stroke-[#818181]" />
			<input
				type="text"
				placeholder="Search Knowledge Base"
				class="py-2.5 w-full bg-[#F7F8FA] outline-none dark:bg-gray-850"
			/>
		</div>
	</div>
	<div class="">
		<BreadCrumbs />
	</div>
	<div class="text-[#6B6C7E] font-semibold">
		Files
	</div>
	<div class="md:mt-5 w-full h-svh flex flex-wrap justify-evenly gap-y-4 md:justify-start md:content-start overflow-y-auto">
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
