<script lang="ts">
	import { WEBUI_BASE_URL } from '$lib/constants';
	import { marked } from 'marked';

	import { config, user, models as _models } from '$lib/stores';
	import { onMount, getContext } from 'svelte';

	import { blur, fade } from 'svelte/transition';

	import Suggestions from '../MessageInput/Suggestions.svelte';
	import { sanitizeResponseContent } from '$lib/utils';
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import WhatsApp from '$lib/components/icons/WhatsApp.svelte';
	import PhoneCall from '$lib/components/icons/PhoneCall.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import WhatsAppModal from '$lib/components/common/WhatsAppModal.svelte';
	import PhoneSupportModal from '$lib/components/common/PhoneSupportModal.svelte';

	const i18n = getContext('i18n');

	export let modelIds = [];
	export let models = [];

	export let submitPrompt;

	let mounted = false;
	let selectedModelIdx = 0;
	let showWhatsAppModal = false;
	let showPhoneCallModal = false;

	$: if (modelIds.length > 0) {
		selectedModelIdx = models.length - 1;
	}

	$: models = modelIds.map((id) => $_models.find((m) => m.id === id));

	onMount(() => {
		mounted = true;
	});
</script>

{#key mounted}
	<div
		class="m-auto w-full max-w-6xl h-full px-8 lg:px-20 pb-10 pt-10 flex flex-col justify-between"
	>
		<div
			class=" mt-2 mb-4 text-3xl text-gray-800 dark:text-gray-100 font-semibold text-left flex flex-col items-start gap-4"
		>
			<div class="flex justify-start w-full">
				<div class="flex -space-x-4 mb-1" in:fade={{ duration: 200 }}>
					{#each models as model, modelIdx}
						<button
							on:click={() => {
								selectedModelIdx = modelIdx;
							}}
						>
							<Tooltip
								content={marked.parse(
									sanitizeResponseContent(models[selectedModelIdx]?.info?.meta?.description ?? '')
								)}
								placement="right"
							>
								<img
									crossorigin="anonymous"
									src={model?.info?.meta?.profile_image_url ??
										($i18n.language === 'dg-DG'
											? `/doge.png`
											: `${WEBUI_BASE_URL}/static/favicon.png`)}
									class="size-[5rem] md:size-[6rem] rounded-full"
									alt="logo"
									draggable="false"
								/>
							</Tooltip>
						</button>
					{/each}
				</div>
			</div>
			<div class="w-full">
				<div
					class=" capitalize line-clamp-1 w-fit bg-clip-text text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-[#0051AF] via-[#EB00FF] to-[#FF6565]"
					in:fade={{ duration: 200 }}
				>
					{#if models[selectedModelIdx]?.info}
						{models[selectedModelIdx]?.info?.name}
					{:else}
						{$i18n.t('Hello, {{name}}', { name: $user.name })}
					{/if}
				</div>

				<div in:fade={{ duration: 200, delay: 200 }} class="w-full">
					{#if models[selectedModelIdx]?.info?.meta?.description ?? null}
						<div
							class="mt-0.5 text-base font-normal text-gray-500 dark:text-gray-400 line-clamp-3 markdown"
						>
							{@html marked.parse(
								sanitizeResponseContent(models[selectedModelIdx]?.info?.meta?.description)
							)}
						</div>
						{#if models[selectedModelIdx]?.info?.meta?.user}
							<div class="mt-0.5 text-sm text-[#818181] dark:text-[#818181] font-semibold">
								By
								{#if models[selectedModelIdx]?.info?.meta?.user.community}
									<a
										href="https://openwebui.com/m/{models[selectedModelIdx]?.info?.meta?.user
											.username}"
										>{models[selectedModelIdx]?.info?.meta?.user.name
											? models[selectedModelIdx]?.info?.meta?.user.name
											: `@${models[selectedModelIdx]?.info?.meta?.user.username}`}</a
									>
								{:else}
									{models[selectedModelIdx]?.info?.meta?.user.name}
								{/if}
							</div>
						{/if}
					{:else}
						<div
							class="text-2xl md:text-4xl mt-2 md:mt-4 text-[#818181] font-semibold dark:text-gray-500 line-clamp-1"
						>
							{$i18n.t('How can I help you today?')}
						</div>
					{/if}
				</div>
				<div class="flex flex-col md:flex-row gap-4 mt-2 md:mt-8 w-full">
					<button
						class=" flex justify-center rounded-xl py-3 px-3.5 w-64 bg-[#F3F6FD] dark:bg-gray-850 dark:hover:bg-gray-850 transition group"
						on:click={() => {
							showWhatsAppModal = true;
						}}
					>
						<div class=" self-center mr-3">
							<WhatsApp className="size-6" />
						</div>
						<div class="self-center text-base font-medium group-hover:translate-x-1 transition-all">
							Get Sia on WhatsApp
						</div>
					</button>

					<button
						class=" flex justify-center rounded-xl py-3 px-3.5 w-64 bg-[#F3F6FD] dark:bg-gray-850 dark:hover:bg-gray-850 transition group"
						on:click={() => {
								showPhoneCallModal = true;
						}}
					>
						<div class=" self-center mr-3">
							<PhoneCall className="size-6" />
						</div>
						<div class="self-center text-base font-medium group-hover:translate-x-1 transition-all">
							Tap to make a call
						</div>
					</button>
				</div>
			</div>
		</div>
		<WhatsAppModal bind:show={showWhatsAppModal} />
		<PhoneSupportModal bind:show={showPhoneCallModal} />

		<!-- <div class=" w-full" in:fade={{ duration: 200, delay: 300 }}>
			<Suggestions
				suggestionPrompts={models[selectedModelIdx]?.info?.meta?.suggestion_prompts ??
					$config.default_prompt_suggestions}
				{submitPrompt}
			/>
		</div> -->
	</div>
{/key}
