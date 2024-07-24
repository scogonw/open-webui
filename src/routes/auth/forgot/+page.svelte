<script lang="ts">
	import { toast } from 'svelte-sonner';

	const SCOGO_AUTH_API_K8S_HOST = import.meta.env.VITE_SCOGO_AUTH_API_K8S_HOST;

	let email = '';
	let loading = false;

	const submitHandler = async () => {
		loading = true;
		const res = await fetch(`${SCOGO_AUTH_API_K8S_HOST}/v1/auth/forgot-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email
			})
		});
		if (res.ok) {
			toast.success('Email Sent');
			loading = false;
			return;
		}
        if(res.status===404){
            toast.error('User not found');
			loading = false;
            return;
        }
		toast.error('Error while sending reset password email');
		loading = false;
	};
</script>

<div class=" bg-white dark:bg-gray-950 min-h-screen w-full flex justify-center items-center p-10">
	<div class="w-auto flex flex-col gap-2">
		<h1 class="text-lg md:text-2xl">Enter your email to reset password</h1>
		<form
			action=""
			class=""
			on:submit|preventDefault={() => {
				submitHandler();
			}}
		>
			<input
				bind:value={email}
				type="email"
				class=" px-5 py-3 rounded-2xl w-full text-sm outline-none border dark:border-none dark:bg-gray-900"
				autocomplete="email"
				placeholder={'Enter Your Email'}
				required
			/>
			<button
				class=" bg-gray-900 hover:bg-gray-800 w-full rounded-2xl mt-4 text-white font-medium text-sm py-3 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
				type="submit"
				disabled={loading}
			>
				Send Email
			</button>
		</form>
		<div class="">
			<a href="/auth" class="">Back to Login</a>
		</div>
	</div>
</div>
