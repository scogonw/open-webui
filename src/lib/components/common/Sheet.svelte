<script>
	import { onMount, onDestroy } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let side = 'right'; // default to opening from the right
	export let open = false;

	const closeSheet = () => {
		open = false;
	};

	const handleClickOutside = (event) => {
		if (open && !event.target.closest('.sheet')) {
			closeSheet();
		}
	};
</script>

{#if open}
	<div class="fixed top-0 left-0 w-lvw h-lvh z-10" on:click={closeSheet} />
	<div
		class={`sheet ${side} ${open ? 'open' : ''} border-l-2 border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-850`}
		transition:slide={{ duration: 300, easing: quintOut, axis: 'x' }}
	>
		<div class="flex justify-end">
			<button on:click={closeSheet} class="block p-2">x</button>
		</div>
		<slot />
	</div>
{/if}

<style>
	.sheet {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 300px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		transition: transform 0.5s ease;
		z-index: 20;
	}
	.sheet.right {
		right: 0;
		transform: translateX(100%);
	}
	.sheet.left {
		left: 0;
		transform: translateX(-100%);
	}
	.sheet.top {
		top: 0;
		left: 0;
		right: 0;
		height: 300px;
		transform: translateY(-100%);
	}
	.sheet.bottom {
		bottom: 0;
		left: 0;
		right: 0;
		height: 300px;
		transform: translateY(100%);
	}
	.sheet.open.right {
		transform: translateX(0);
	}
	.sheet.open.left {
		transform: translateX(0);
	}
	.sheet.open.top {
		transform: translateY(0);
	}
	.sheet.open.bottom {
		transform: translateY(0);
	}
</style>
