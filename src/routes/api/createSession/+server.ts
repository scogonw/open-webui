const SCOGO_AUTH_API_K8S_HOST = import.meta.env.VITE_SCOGO_AUTH_API_K8S_HOST;

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { email, password } = body;
		const falsie = ['', null, undefined];
		console.log(body);
		if (falsie.includes(email) || falsie.includes(password)) {
			return new Response(JSON.stringify({ message: 'Missing Required Data in body' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		const res = await fetch(`${SCOGO_AUTH_API_K8S_HOST}/v1/auth/session`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user_input: email,
				password: password,
				send_otp: false,
				create_legacy_token: false
			})
		});

		if (res.ok) {
			const response = await res.json();

			return new Response(JSON.stringify(response), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error) {
		console.error('Error:', error);

		return new Response(JSON.stringify({ message: 'Error processing request' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
