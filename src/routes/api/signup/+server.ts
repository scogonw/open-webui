import cookie from 'cookie';

const SCOGO_AUTH_API_K8S_HOST = import.meta.env.VITE_SCOGO_AUTH_API_K8S_HOST;

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { firstName, lastName, mobile, email, password } = body;
		const falsie = ['', null, undefined];
		console.log(body);
		if (
			falsie.includes(firstName) ||
			falsie.includes(lastName) ||
			falsie.includes(email) ||
			falsie.includes(password)
		) {
			return new Response(JSON.stringify({ message: 'Missing Required Data in body' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		const res = await fetch(`${SCOGO_AUTH_API_K8S_HOST}/v1/auth/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				mobile: mobile,
				email: email,
				password: password
			})
		});

		if (res.ok) {
			const response = await res.json();

			const headers = new Headers({
				'Content-Type': 'application/json',
				'Set-Cookie': [
					cookie.serialize('session_id', response?.session_id, {
						httpOnly: false, // Helps prevent XSS attacks
						secure: false, // Ensures the cookie is sent over HTTPS
						maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
						path: '/' // Path for which the cookie is valid
					}),
					cookie.serialize('session_token', response?.session_token, {
						httpOnly: false,
						secure: false,
						maxAge: 60 * 60 * 24 * 7, // 1 week
						path: '/'
					})
				].join(', ')
			});

			return new Response(JSON.stringify(response), {
				status: 200,
				headers: headers
			});
		}
		// res not ok
		console.log(res);
		return new Response(
			JSON.stringify({ message: 'Error processing request', data: await res.json() }),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
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
