<script lang="ts">
	import MenuLines from '$lib/components/icons/MenuLines.svelte';
	import { showSidebar } from '$lib/stores';
</script>

<div class="flex flex-col w-full">
	<div
		class="{$showSidebar
			? 'md:hidden'
			: ''} mr-3 pl-3 pt-3 self-start flex flex-none items-center text-gray-600 dark:text-gray-400"
	>
		<button
			id="sidebar-toggle-button"
			class="cursor-pointer px-2 py-2 flex rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850 transition"
			on:click={() => {
				showSidebar.set(!$showSidebar);
			}}
		>
			<div class=" m-auto self-center">
				<MenuLines />
			</div>
		</button>
	</div>
	<slot />
</div>
