<script lang="ts">
	import Cross from '../icons/Cross.svelte';
	import WhatsappQr from '../icons/WhatsappQR.svelte';
	import Modal from './Modal.svelte';

	export let show = false;
</script>

<Modal size="w-[42rem]" bind:show>
	<div class="relative shadow-lg">
		<button
			class="absolute top-4 right-2 hover:cursor-pointer"
			on:click={() => {
				show = false;
			}}
		>
			<Cross />
		</button>

		<div class="py-6 px-3 flex flex-col md:flex-row gap-4">
			<div class="m-auto">
				<WhatsappQr className="size-60 md:size-60" />
			</div>
			<div class="p-4 flex flex-col gap-4 justify-center dark:text-white">
				<h1 class="font-bold text-3xl">WhatsApp support</h1>
				<p>Thank you for visiting us! Add your name and email to sign up to our newsletter!</p>
				<button class="bg-[#02C27F] text-white rounded-xl w-full p-2 md:px-16 group">
					<p class="group-hover:translate-x-1 w-full transition-all ">Chat Now</p>
				</button>
			</div>
		</div>
	</div>
</Modal>
