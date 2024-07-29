<script lang="ts">
	import { user } from '$lib/stores';
	import { onMount } from 'svelte';
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

<div class="w-full h-16 shadow flex items-center justify-between px-5">
	<div>
		<p class="text-base font-bold">Hello, {$user.first_name}</p>
		<p class="text-sm text-[#707EAE]">{timestamp}</p>
	</div>
	<div>
		<img src={$user?.avatar_link || '/user.png'} alt="" class="w-9 h-9 rounded-full" />
	</div>
</div>
