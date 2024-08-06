<script lang="ts">
	import {
		user,
		chats,
		settings,
		showSettings,
		chatId,
		tags,
		showSidebar,
		mobile,
		showArchivedChats,
		theme,

		allChatMappings

	} from '$lib/stores';
	import { updateUserSettings } from '$lib/apis/users';
	import { getContext, onMount, tick } from 'svelte';
	import {
		deleteChatById,
		getChatList,
		getChatById,
		getChatListByTagName,
		updateChatById,
		getAllChatTags,
		archiveChatById,
		cloneChatById
	} from '$lib/apis/chats';
	import { fade } from 'svelte/transition';
	import ChatItem from '../Sidebar/ChatItem.svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import ArchivedChatsModal from '../Sidebar/ArchivedChatsModal.svelte';
	import DeleteConfirmDialog from '$lib/components/common/ConfirmDialog.svelte';
	import Search from '$lib/components/icons/Search.svelte';
	import { getAllAiChats } from '$lib/apis/triton';
	import { getCookie } from '$lib/utils';

	const i18n = getContext('i18n');

	let search = '';
	let filteredChatList = [];
	let shiftKey = false;
	let selectedChatId = null;
	let deleteChat = null;
	let showDeleteConfirm = false;

	$: filteredChatList = $chats.filter((chat) => {
		if (search === '') {
			return true;
		} else {
			let title = chat.title.toLowerCase();
			const query = search.toLowerCase();

			let contentMatches = false;
			// Access the messages within chat.chat.messages
			if (chat.chat && chat.chat.messages && Array.isArray(chat.chat.messages)) {
				contentMatches = chat.chat.messages.some((message) => {
					// Check if message.content exists and includes the search query
					return message.content && message.content.toLowerCase().includes(query);
				});
			}

			return title.includes(query) || contentMatches;
		}
	});

	// const saveSettings = async (updated) => {
	// 	await settings.set({ ...$settings, ...updated });
	// 	await updateUserSettings(localStorage.token, { ui: $settings });
	// 	location.href = '/';
	// };

	const enrichChatsWithContent = async (chatList) => {
		const enrichedChats = await Promise.all(
			chatList.map(async (chat) => {
				const chatDetails = await getChatById(localStorage.token, chat.id).catch((error) => null); // Handle error or non-existent chat gracefully
				if (chatDetails) {
					chat.chat = chatDetails.chat; // Assuming chatDetails.chat contains the chat content
				}
				return chat;
			})
		);

		await chats.set(enrichedChats);
	};

	const deleteChatHandler = async (id) => {
		const res = await deleteChatById(localStorage.token, id).catch((error) => {
			toast.error(error);
			return null;
		});

		if (res) {
			if ($chatId === id) {
				await chatId.set('');
				await tick();
				goto('/');
			}
			await chats.set(await getChatList(localStorage.token));
		}
	};

	const access_token = getCookie('access_token');

	onMount(async () => {
		mobile.subscribe((e) => {
			if ($showSidebar && e) {
				showSidebar.set(false);
			}

			if (!$showSidebar && !e) {
				showSidebar.set(true);
			}
		});

		const data = await getAllAiChats(access_token);
		if (data) {
			allChatMappings.set(data);
		}

		// await chats.set(await getChatList(localStorage.token));

		// const onKeyDown = (e) => {
		// 	if (e.key === 'Shift') {
		// 		shiftKey = true;
		// 	}
		// };

		// const onKeyUp = (e) => {
		// 	if (e.key === 'Shift') {
		// 		shiftKey = false;
		// 	}
		// };

		// window.addEventListener('keydown', onKeyDown);
		// window.addEventListener('keyup', onKeyUp);

		// return ()=>{
		// 	window.removeEventListener('keydown', onKeyDown);
		// 	window.removeEventListener('keyup', onKeyUp);
		// }
	});
</script>

<ArchivedChatsModal
	bind:show={$showArchivedChats}
	on:change={async () => {
		await chats.set(await getChatList(localStorage.token));
	}}
/>

<DeleteConfirmDialog
	bind:show={showDeleteConfirm}
	title={$i18n.t('Delete chat?')}
	on:confirm={() => {
		deleteChatHandler(deleteChat.id);
	}}
>
	<div class=" text-sm text-gray-500">
		{$i18n.t('This will delete')} <span class="  font-semibold">{deleteChat.title}</span>.
	</div>
</DeleteConfirmDialog>

<div in:fade={{ duration: 200, delay: 200 }}>
	<div class="px-2 mt-0.5 mb-2 flex justify-center space-x-2">
		<div class="flex w-full rounded-xl" id="chat-search">
			<div class="self-center pl-3 py-2 rounded-l-xl bg-transparent">
				<Search />
			</div>

			<input
				class="w-full rounded-r-xl py-1.5 pl-2.5 pr-4 text-sm bg-transparent dark:text-gray-300 outline-none"
				placeholder={$i18n.t('Search')}
				bind:value={search}
				on:focus={() => {
					enrichChatsWithContent($chats);
				}}
			/>
		</div>
	</div>

	<div
		class="relative flex flex-col flex-1 overflow-y-auto px-2.5 py-2.5 md:mt-2"
		in:fade={{ duration: 200 }}
	>
		<div class="pl-2 my-2 flex-1 flex flex-col space-y-1 overflow-y-auto scrollbar-hidden">
			{#each filteredChatList as chat, idx}
				{#if idx === 0 || (idx > 0 && chat.time_range !== filteredChatList[idx - 1].time_range)}
					<div
						class="w-full pl-2.5 text-xs text-gray-500 dark:text-gray-500 font-medium {idx === 0
							? ''
							: 'pt-2'} pb-0.5"
					>
						{$i18n.t(chat.time_range)}
					</div>
				{/if}

				<ChatItem
					{chat}
					{shiftKey}
					selected={selectedChatId === chat.id}
					on:select={() => {
						selectedChatId = chat.id;
					}}
					on:unselect={() => {
						selectedChatId = null;
					}}
					on:delete={(e) => {
						if ((e?.detail ?? '') === 'shift') {
							deleteChatHandler(chat.id);
						} else {
							deleteChat = chat;
							showDeleteConfirm = true;
						}
					}}
				/>
			{/each}
		</div>
	</div>
</div>
