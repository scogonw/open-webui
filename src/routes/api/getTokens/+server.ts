import cookie from 'cookie';

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { url } = body;
		const res = await fetch(url, { method: 'GET' });
		if (res.ok) {
			const tokens = await res.json();

			const headers = new Headers({
				'Content-Type': 'application/json',
				'Set-Cookie': [
					cookie.serialize('access_token', tokens?.access_token, {
						httpOnly: true, // Helps prevent XSS attacks
						secure: false, // Ensures the cookie is sent over HTTPS
						maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
						path: '/' // Path for which the cookie is valid
					}),
					cookie.serialize('refresh_token', tokens?.refresh_token, {
						httpOnly: true,
						secure: false,
						maxAge: 60 * 60 * 24 * 7, // 1 week
						path: '/'
					}),
					cookie.serialize('id_token', tokens?.id_token, {
						httpOnly: true,
						secure: false,
						maxAge: 60 * 60 * 24 * 7, // 1 week
						path: '/'
					})
				].join(', ')
			});

			return new Response(JSON.stringify(tokens), {
				status: 200,
				headers: headers
			});
		}
		// res not ok
		return new Response(JSON.stringify({ message: 'Error processing request' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
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
