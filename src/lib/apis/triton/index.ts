const SCOGO_ADMIN_API_K8S_HOST = import.meta.env.VITE_SCOGO_ADMIN_API_K8S_HOST;
const SCOGO_AUTH_API_K8S_HOST = import.meta.env.VITE_SCOGO_AUTH_API_K8S_HOST;

export const getUserByToken = async (token) => {
	try {
		const res = await fetch(`${SCOGO_ADMIN_API_K8S_HOST}/v1/admin/user/legacy`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		if (res.ok) {
			const user = await res.json();
			console.log(user);
			return user;
		}
		return null;
	} catch (error) {
		console.log(error);
	}
};

export const logOutUser = async (session_id, session_token, token) => {
	try {
		await fetch(`${SCOGO_AUTH_API_K8S_HOST}/v1/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				session_id: session_id,
				session_token: session_token
			})
		});
	} catch (error) {
		console.log(error);
	}
};
