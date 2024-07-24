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
            goto("/");
		}
	});
</script>

<div>callback</div>
