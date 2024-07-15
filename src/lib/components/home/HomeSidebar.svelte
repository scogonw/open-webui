<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import {
		showSidebar,
		mobile,
		theme
	} from '$lib/stores';
	import { onMount, getContext, tick } from 'svelte';

	const i18n = getContext('i18n');

	import MyAccount from '../icons/MyAccount.svelte';
	import DarkMode from '../icons/DarkMode.svelte';
	import Logout from '../icons/Logout.svelte';
	import Plus from '../icons/Plus.svelte';
	import Home from '../icons/Home.svelte';
	import Teams from '../icons/Teams.svelte';
	import KnowledgeHub from '../icons/KnowledgeHub.svelte';
	import { fade } from 'svelte/transition';
	import LightMode from '../icons/LightMode.svelte';

	const BREAKPOINT = 768;

	let navElement;

	let shiftKey = false;

	let selectedChatId = null;
	let themes = ['dark', 'light', 'rose-pine dark', 'rose-pine-dawn light', 'oled-dark'];


	onMount(async () => {
		mobile.subscribe((e) => {
			if ($showSidebar && e) {
				showSidebar.set(false);
			}

			if (!$showSidebar && !e) {
				showSidebar.set(true);
			}
		});

		showSidebar.set(window.innerWidth > BREAKPOINT);

		let touchstart;
		let touchend;

		function checkDirection() {
			const screenWidth = window.innerWidth;
			const swipeDistance = Math.abs(touchend.screenX - touchstart.screenX);
			if (touchstart.clientX < 40 && swipeDistance >= screenWidth / 8) {
				if (touchend.screenX < touchstart.screenX) {
					showSidebar.set(false);
				}
				if (touchend.screenX > touchstart.screenX) {
					showSidebar.set(true);
				}
			}
		}

		const onTouchStart = (e) => {
			touchstart = e.changedTouches[0];
			console.log(touchstart.clientX);
		};

		const onTouchEnd = (e) => {
			touchend = e.changedTouches[0];
			checkDirection();
		};

		const onKeyDown = (e) => {
			if (e.key === 'Shift') {
				shiftKey = true;
			}
		};

		const onKeyUp = (e) => {
			if (e.key === 'Shift') {
				shiftKey = false;
			}
		};

		const onFocus = () => {};

		const onBlur = () => {
			shiftKey = false;
			selectedChatId = null;
		};

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);

		window.addEventListener('touchstart', onTouchStart);
		window.addEventListener('touchend', onTouchEnd);

		window.addEventListener('focus', onFocus);
		window.addEventListener('blur', onBlur);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);

			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchend', onTouchEnd);

			window.removeEventListener('focus', onFocus);
			window.removeEventListener('blur', onBlur);
		};
	});


	const applyTheme = (_theme: string) => {
		let themeToApply = _theme === 'oled-dark' ? 'dark' : _theme;

		if (_theme === 'system') {
			themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}

		if (themeToApply === 'dark' && !_theme.includes('oled')) {
			document.documentElement.style.setProperty('--color-gray-900', '#171717');
			document.documentElement.style.setProperty('--color-gray-950', '#0d0d0d');
		}

		themes
			.filter((e) => e !== themeToApply)
			.forEach((e) => {
				e.split(' ').forEach((e) => {
					document.documentElement.classList.remove(e);
				});
			});

		themeToApply.split(' ').forEach((e) => {
			document.documentElement.classList.add(e);
		});

		console.log(_theme);
	};

	const themeChangeHandler = (_theme: string) => {
		theme.set(_theme);
		localStorage.setItem('theme', _theme);
		if (_theme.includes('oled')) {
			document.documentElement.style.setProperty('--color-gray-900', '#000000');
			document.documentElement.style.setProperty('--color-gray-950', '#000000');
			document.documentElement.classList.add('dark');
		}
		applyTheme(_theme);
	};
</script>



<!-- svelte-ignore a11y-no-static-element-interactions -->

{#if $showSidebar}
	<div
		class=" fixed md:hidden z-40 top-0 right-0 left-0 bottom-0 bg-black/60 w-full min-h-screen h-screen flex justify-center overflow-hidden overscroll-contain"
		on:mousedown={() => {
			showSidebar.set(!$showSidebar);
		}}
	/>
{/if}

<div
	bind:this={navElement}
	id="sidebar"
	class="h-screen max-h-[100dvh] min-h-screen select-none {$showSidebar
		? 'md:relative w-[260px]'
		: '-translate-x-[260px] w-[0px]'} bg-white border-r-2 text-gray-900 dark:bg-gray-950 dark:text-gray-200 dark:border-gray-850 text-sm transition fixed z-50 top-0 left-0
        "
	data-state={$showSidebar}
>
	<div
		class="pt-2.5 my-auto flex flex-col justify-between h-screen max-h-[100dvh] w-[260px] z-50 {$showSidebar
			? ''
			: 'invisible'}"
	>
		<div class="px-2.5 flex justify-between space-x-1 text-gray-600 dark:text-gray-400" in:fade={{ duration: 200, delay: 200}}>
			<button
				id="sidebar-new-chat-button"
				class="flex flex-1 justify-center rounded-xl px-2 py-1.5 bg-black border-none hover:bg-gray-850 dark:bg-white dark:hover:bg-gray-400  transition-all duration-300"
				draggable="false"
				on:click={async () => {
					selectedChatId = null;
					await goto('/home');
					const newChatButton = document.getElementById('new-chat-button');
					setTimeout(() => {
						newChatButton?.click();
						if ($mobile) {
							showSidebar.set(false);
						}
					}, 0);
				}}
			>
				<div class="self-center mx-1">
					<Plus className="size-4 stroke-white dark:stroke-black" strokeWidth="2"/>
				</div>
				<div class=" self-center font-medium text-base text-white dark:text-black">
					{$i18n.t('New Chat')}
				</div>
			</button>

			<button
				class=" cursor-pointer px-2 py-2 flex rounded-xl hover:bg-[#F3F6FD] dark:hover:bg-gray-850 transition"
				on:click={() => {
					showSidebar.set(!$showSidebar);
				}}
			>
				<div class=" m-auto self-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class="size-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
						/>
					</svg>
				</div>
			</button>
		</div>

		<div class="relative flex flex-col flex-1 overflow-y-auto px-2.5 py-2.5 md:mt-5" in:fade={{ duration: 200}}>

			<button
				class=" flex rounded-xl py-3 px-3.5 w-full hover:bg-[#F3F6FD] dark:hover:bg-gray-850 transition group"
				on:click={() => {
					goto('/home');
				}}
			>
				<div class=" self-center mr-3">
					<Home className="size-5 fill-black dark:fill-white"/>
				</div>
				<div class="self-center font-medium group-hover:translate-x-1 transition-all">Home</div>
			</button>
			<button
				class=" flex rounded-xl py-3 px-3.5 w-full hover:bg-[#F3F6FD] dark:hover:bg-gray-850 transition group"
				on:click={() => {
					goto('/teams');
				}}
			>
				<div class=" self-center mr-3">
					<Teams className="size-5 fill-black dark:fill-white"/>
				</div>
				<div class="self-center font-medium group-hover:translate-x-1 transition-all">Teams</div>
			</button>
			<button
				class=" flex rounded-xl py-3 px-3.5 w-full hover:bg-[#F3F6FD] dark:hover:bg-gray-850 transition group"
				on:click={() => {
					goto('/knowledge');
				}}
			>
				<div class=" self-center mr-3">
					<KnowledgeHub className="size-5 fill-black dark:fill-white"/>
				</div>
				<div class="self-center font-medium group-hover:translate-x-1 transition-all">Knowledge Hub</div>
			</button>
		</div> 

		<div class="px-2.5 py-2.5 border-t-[0.5px] dark:border-gray-850" in:fade={{ duration: 200, delay: 200}}>
			<!-- <button
				class=" flex rounded-xl py-3 px-3.5 w-full hover:bg-[#F3F6FD] dark:hover:bg-gray-850 transition group"
				on:click={() => {
					
				}}
			>
				<div class=" self-center mr-3">
					<MyAccount className="size-5 fill-black dark:fill-white"/>
				</div>
				<div class="self-center font-medium group-hover:translate-x-1 transition-all">My Account</div>
			</button> -->

			{#if $theme !== 'dark'}
			<button
				class=" flex rounded-xl py-3 px-3.5 w-full hover:bg-[#F3F6FD] dark:hover:bg-gray-850 transition group"
				on:click={() => {
					themeChangeHandler('dark')
				}}
			>
				<div class=" self-center mr-3">
					<DarkMode className="size-5 fill-black dark:fill-white"/>
				</div>
				<div class="self-center font-medium group-hover:translate-x-1 transition-all">Dark Mode</div>
			</button>
			{/if}

			{#if $theme === 'dark'}
			<button
				class=" flex rounded-xl py-3 px-3.5 w-full hover:bg-[#F3F6FD] dark:hover:bg-gray-850 transition group"
				on:click={() => {
					themeChangeHandler('light')
				}}
			>
				<div class=" self-center mr-3">
					<LightMode className="size-5 fill-black dark:fill-white"/>
				</div>
				<div class="self-center font-medium group-hover:translate-x-1 transition-all">Light Mode</div>
			</button>
			{/if}

			<!-- <button
				class=" flex rounded-xl py-3 px-3.5 w-full hover:bg-[#F3F6FD] dark:hover:bg-gray-850 transition group"
				on:click={() => {
					localStorage.removeItem('token');
					location.href = '/auth';
				}}
			>
				<div class=" self-center mr-3">
					<Logout	className="size-5 fill-black dark:fill-white"/>
				</div>
				<div class="self-center font-medium group-hover:translate-x-1 transition-all">Log Out</div>
			</button> -->
		</div>
	</div>
</div>

<style>
	.scrollbar-hidden:active::-webkit-scrollbar-thumb,
	.scrollbar-hidden:focus::-webkit-scrollbar-thumb,
	.scrollbar-hidden:hover::-webkit-scrollbar-thumb {
		visibility: visible;
	}
	.scrollbar-hidden::-webkit-scrollbar-thumb {
		visibility: hidden;
	}
</style>
