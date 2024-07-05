<script lang="ts">
	import Cross from '../icons/Cross.svelte';
	import PhoneCallSupport from '../icons/PhoneCallSupport.svelte';
	import WhatsappQr from '../icons/WhatsappQR.svelte';
	import Modal from './Modal.svelte';

	export let show = false;
</script>

<Modal size="w-[42rem]" bind:show>
	<div class="relative">
		<button
			class="absolute top-4 right-2 hover:cursor-pointer"
			on:click={() => {
				show = false;
			}}
		>
			<Cross />
		</button>

		<div class="px-3 w-full flex flex-col justify- md:flex-row gap-4">
			<div class="p-4 flex flex-col items-center gap-2 dark:text-white">
				<PhoneCallSupport className="size-20 md:size-40" />
				<h1 class="font-bold text-3xl">On Call Support</h1>
				<p class="text-center">Thank you for visiting us! Add your name to our newsletter!</p>
				<button class="bg-[#02C27F] text-white rounded-xl w-full p-2 md:px-16 group">
					<p class="group-hover:translate-x-1 transition-all">Tap to make a call</p>
				</button>
			</div>
			<div class="p-4 flex flex-col items-center gap-2 dark:text-white">
				<PhoneCallSupport className="size-20 md:size-40" />
				<h1 class="font-bold text-3xl">Web Call Support</h1>
				<p class="text-center">Thank you for visiting us! Add your name to our newsletter!</p>
				<button class="bg-[#02C27F] text-white rounded-xl w-full p-2 md:px-16 group">
					<p class="group-hover:translate-x-1 transition-all">Start a call</p>
				</button>
			</div>
		</div>
	</div>
</Modal>
