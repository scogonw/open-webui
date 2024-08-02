<script lang="ts">
	import { goto } from '$app/navigation';
	import { onBoardOrg } from '$lib/apis/triton';
	import { user } from '$lib/stores';
	import { getCookie } from '$lib/utils';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let org = '';
	let loading = false;
	const access_token = getCookie('access_token');

	let loaded = false;

	const submitHandler = async () => {
		if (org) {
			loading = true;
			const body = {
				name: org
			};
			const onbaorded = await onBoardOrg(access_token, body);
			if (onbaorded) {
				toast.success('Onboarding Complete');
				goto('/');
			}
		}
		loading = false;
	};

	onMount(() => {
		if ($user.status !== 'PROFILE_PENDING') {
			goto('/');
		} else {
			loaded = true;
		}
	});
</script>

{#if loaded}
	<div class=" bg-white dark:bg-gray-950 min-h-screen w-full flex justify-center items-center p-10">
		<div class="w-auto flex flex-col gap-2">
			<h1 class="text-lg md:text-2xl">Enter your Organization Name</h1>
			<form
				action=""
				class=""
				on:submit|preventDefault={() => {
					submitHandler();
				}}
			>
				<input
					bind:value={org}
					type="text"
					class=" px-5 py-3 rounded-2xl w-full text-sm outline-none border dark:border-none dark:bg-gray-900"
					placeholder={'Enter Your Organization Name'}
					required
				/>
				<button
					class=" bg-gray-900 hover:bg-gray-800 w-full rounded-2xl mt-4 text-white font-medium text-sm py-3 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
					type="submit"
					disabled={loading}
				>
					Submit
				</button>
			</form>
			<!-- <div class="">
    <a href="/auth" class="">Back to Login</a>
    </div> -->
		</div>
	</div>
{/if}
