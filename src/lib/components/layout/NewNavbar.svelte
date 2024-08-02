<script lang="ts">
	import { showSidebar, user } from '$lib/stores';
	import { onMount } from 'svelte';
	import FlipText from './FlipText.svelte';
	import MenuLines from '../icons/MenuLines.svelte';
	function formatDate(timestamp) {
		const date = new Date(timestamp);
		const options = {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		};

		const formatter = new Intl.DateTimeFormat('en-US', options);
		const parts = formatter.formatToParts(date);

		const formattedTime = parts.reduce((acc, part) => {
			if (part.type === 'hour' || part.type === 'minute') {
				return acc + part.value;
			} else if (part.type === 'day' || part.type === 'month' || part.type === 'year') {
				return acc + part.value + ' ';
			} else if (part.type === 'literal' && part.value === ':') {
				return acc + '.';
			} else if (part.type === 'dayPeriod') {
				return acc + part.value.toLowerCase() + ' ';
			}
			return acc;
		}, '');

		return formattedTime.trim();
	}

	let timestamp = formatDate(Date.now());
	onMount(() => {
		const interval = setInterval(() => {
			timestamp = formatDate(Date.now());
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="w-full h-16 shadow flex items-center justify-between px-5 pr-6">
	<div
		class="{$showSidebar
			? 'md:hidden'
			: ''} mr-3 pt-3 mb-3 self-start flex flex-none items-center text-gray-600 dark:text-gray-400"
	>
		<button
			id="sidebar-toggle-button"
			class="cursor-pointer px-2 py-2 flex rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850 transition"
			on:click={() => {
				showSidebar.set(!$showSidebar);
			}}
		>
			<div class="m-auto self-center">
				<MenuLines />
			</div>
		</button>
	</div>
	<div class="my-auto flex-grow">
		<p class="text-base font-bold">Hello, {$user.first_name}</p>
		<p class="text-sm text-[#707EAE]">{timestamp}</p>
		<!-- <FlipText /> -->
	</div>
	<div>
		<img
			src={$user?.avatar_link ||
				`https://ui-avatars.com/api/?background=5d6d73&color=ffffff&name=${$user?.first_name}+${$user?.last_name}`}
			alt=""
			class="w-9 h-9 rounded-full"
		/>
	</div>
</div>
