import crypto from 'crypto';

const ZITADEL_BASE_URL = import.meta.env.VITE_ZITADEL_DOMAIN;
const X_ZITADEL_LOGIN_CLIENT = import.meta.env.VITE_X_ZITADEL_LOGIN_CLIENT;
const ZITADEL_CLIENT_ID = import.meta.env.VITE_ZITADEL_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
// const APP_URL = import.meta.env.VITE_APP_URL;

const generatePKCEPair = () => {
	const NUM_OF_BYTES = 22; // Total of 44 characters (1 Bytes = 2 char) (standard states that: 43 chars <= verifier <= 128 chars)
	const HASH_ALG = 'sha256';
	const randomVerifier = crypto.randomBytes(NUM_OF_BYTES).toString('hex');
	const hash = crypto.createHash(HASH_ALG).update(randomVerifier).digest('base64');
	const challenge = hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Clean base64 to make it URL safe
	console.log('generate', randomVerifier, challenge);
	return { verifier: randomVerifier, challenge };
};

export async function GET() {
	try {
		const url = new URL(`${ZITADEL_BASE_URL}/oauth/v2/authorize`);
		console.log(url.toString());
		const { verifier, challenge } = generatePKCEPair();
		console.log(verifier, challenge);
		url.searchParams.append('client_id', `${ZITADEL_CLIENT_ID}`);
		url.searchParams.append('redirect_uri', `${REDIRECT_URI}`);
		url.searchParams.append('response_type', 'code');
		url.searchParams.append(
			'scope',
			'openid email profile offline_access urn:zitadel:iam:user:resourceowner'
		);
		url.searchParams.append('state', 'zitadel');
		url.searchParams.append('code_challenge_method', 'S256');
		url.searchParams.append('code_challenge', challenge);
		console.log(url.toString());
		const headers = new Headers();
		headers.append('x-zitadel-login-client', `${X_ZITADEL_LOGIN_CLIENT}`);
		console.log(headers);
		const res = await fetch(url.toString(), {
			method: 'HEAD',
			headers: headers
		});
		console.log(res);
		const { searchParams: query } = new URL(res.url);
		const authRequestId = query.get('authRequest');
		if (authRequestId) {
			return new Response(JSON.stringify({ authRequestId, verifier }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		} else {
			return new Response(JSON.stringify({ error: 'Error while retrieving authRequestId' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: 'Error while retrieving authRequestId' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
