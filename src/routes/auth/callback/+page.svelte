<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	const ZITADEL_DOMAIN = import.meta.env.VITE_ZITADEL_DOMAIN;
	const ZITADEL_CLIENT_ID = import.meta.env.VITE_ZITADEL_CLIENT_ID;

	onMount(async () => {
		const searchParams = new URLSearchParams($page.url.search);
		let clientID = ZITADEL_CLIENT_ID;
		if (!['', undefined, null].includes(searchParams.get('client_id'))) {
			clientID = searchParams.get('client_id')?.toString();
		}

		const code = searchParams.get('code');
		if (!code) {
			toast.error('Error unable to login');
			goto('/auth');
			return;
		}

		const redirect_uri = searchParams.get('redirect_uri');
		const verifier = localStorage.getItem('verifier');
		const url = new URL(`${ZITADEL_DOMAIN}/oauth/v2/token`);
		url.searchParams.append('client_id', `${clientID}`);
		url.searchParams.append('code', code!);
		url.searchParams.append('grant_type', 'authorization_code');
		url.searchParams.append('redirect_uri', redirect_uri.toString());
		url.searchParams.append('code_verifier', verifier.toString());

		const res = await fetch('/api/getTokens', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				url: url
			})
		});
		if (res.ok) {
			toast.success('You are now Logged In');
			window.location.href = $page.url.origin;
		} else {
			toast.error('Error : Unable to Login');
			goto('/auth');
		}
	});
</script>

<div
	id="splash-screen"
	style="position: fixed; z-index: 100; top: 0; left: 0; width: 100%; height: 100%"
>
	<style type="text/css" nonce="">
		html {
			overflow-y: scroll !important;
		}
	</style>

	<img
		id="logo"
		style="
					position: absolute;
					width: 6rem;
					height: 6rem;
					top: 41%;
					left: 50%;
					margin-left: -3rem;
				"
		src="/logo.png"
        alt="splash"
	/>

	<div
		style="
					position: absolute;
					top: 33%;
					left: 50%;

					width: 24rem;
					margin-left: -12rem;

					display: flex;
					flex-direction: column;
					align-items: center;
				"
	>
		<img
			id="logo-her"
			style="width: 13rem; height: 13rem"
			src="/logo.png"
			class="animate-pulse-fast"
            alt="splash"
		/>

		<div style="position: relative; width: 24rem; margin-top: 0.5rem">
			<div
				id="progress-background"
				style="
							position: absolute;
							width: 100%;
							height: 0.75rem;

							border-radius: 9999px;
							background-color: #fafafa9a;
						"
			/>

			<div
				id="progress-bar"
				style="
							position: absolute;
							width: 0%;
							height: 0.75rem;
							border-radius: 9999px;
							background-color: #fff;
						"
				class="bg-white"
			/>
		</div>
	</div>

	<!-- <span style="position: absolute; bottom: 32px; left: 50%; margin: -36px 0 0 -36px">
				Footer content
			</span> -->
</div>
