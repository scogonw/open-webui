<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import MenuLines from '$lib/components/icons/MenuLines.svelte';
	import NewNavbar from '$lib/components/layout/NewNavbar.svelte';
	import { showSidebar } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			const { pathname } = $page.url;

			// Check if the path ends with a trailing slash and it's not the root URL
			if (pathname !== '/' && pathname.endsWith('/')) {
				// Remove the trailing slash
				const newPathname = pathname.slice(0, -1);

				// Navigate to the new URL without the trailing slash
				location.href = new URL(newPathname, location.origin).href;

				// goto(newPathname, { replaceState: true });
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<div class="flex flex-col w-full">
	<div class="w-full h-fit flex shadow">
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
		<NewNavbar />
	</div>
	<slot />
</div>
