<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const SCOGO_AUTH_API_K8S_HOST = import.meta.env.VITE_SCOGO_AUTH_API_K8S_HOST;

	let password = '';
	let confirPassword = '';
	let loading = false;

	const submitHandler = async () => {
		loading = true;
		const params = new URLSearchParams($page.url.search);
        const user_id = params.get('userID');
        const org_id = params.get('orgID');
        const code = params.get('code');
		const res = await fetch(`${SCOGO_AUTH_API_K8S_HOST}/v1/auth/reset-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
                user_id:user_id,
                org_id:org_id,
                password:password,
                password_confirmation:confirPassword,
                code:code
			})
		});
		if (res.ok) {
			toast.success('Password Reset Successful');
			loading = false;
            goto('/auth');
			return;
		}
		toast.error('Error while resetting password');
		loading = false;
	};
</script>

<div class=" bg-white dark:bg-gray-950 min-h-screen w-full flex justify-center items-center p-10">
	<div class="w-auto flex flex-col gap-2">
		<h1 class="text-lg md:text-2xl">Reset Password</h1>
		<form
			action=""
			class="flex flex-col"
			on:submit|preventDefault={() => {
				submitHandler();
			}}
		>
			<label for="">Enter Password</label>
			<input
				bind:value={password}
				type="password"
				class="w-[42rem] px-5 py-3 rounded-2xl text-sm outline-none border dark:border-none dark:bg-gray-900"
				placeholder={'Enter Password'}
				required
			/>
			<label for="" class="mt-2">Confirm Password</label>
			<input
				bind:value={confirPassword}
				type="password"
				class="w-[40rem] px-5 py-3 rounded-2xl text-sm outline-none border dark:border-none dark:bg-gray-900"
				placeholder={'Confirm Password'}
				required
			/>
			<button
				class=" bg-gray-900 hover:bg-gray-800 rounded-2xl mt-4 text-white font-medium text-sm py-3 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
				type="submit"
				disabled={loading}
			>
				Reset
			</button>
		</form>
		<div class="">
			<a href="/auth" class="">Back to Login</a>
		</div>
	</div>
</div>
