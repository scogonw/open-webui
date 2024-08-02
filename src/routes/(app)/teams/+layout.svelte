<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import MenuLines from '$lib/components/icons/MenuLines.svelte';
	import NewNavbar from '$lib/components/layout/NewNavbar.svelte';
	import { showSidebar } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			console.log($page);
			const { pathname } = $page.url;

			// Check if the path ends with a trailing slash and it's not the root URL
			if (pathname !== '/' && pathname.endsWith('/')) {
				console.log(pathname);
				// Remove the trailing slash
				const newPathname = pathname.slice(0, -1);
				console.log(newPathname);

				// Navigate to the new URL without the trailing slash
				location.href = new URL(newPathname, location.origin).href;
				// goto(newPathname);
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<div class="flex flex-col w-full h-full">
	<div class="w-full h-fit flex shadow">
		<NewNavbar />
	</div>
	<slot />
</div>
