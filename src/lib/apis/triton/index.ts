import { toast } from 'svelte-sonner';

const SCOGO_ADMIN_API_K8S_HOST = import.meta.env.VITE_SCOGO_ADMIN_API_K8S_HOST;
const SCOGO_ADMIN_API_K8S_HOST_TEMP = import.meta.env.VITE_SCOGO_ADMIN_API_K8S_HOST_TEMP;
const SCOGO_AUTH_API_K8S_HOST = import.meta.env.VITE_SCOGO_AUTH_API_K8S_HOST;
const tokendev4 =
	'kyDOIITp3UB_fN65siY4u1FAcgTOx8J9yC6TZnaFWR5d3Ex2FvWCPQEkUYVY1BoilI_FbYQNjPO5aN8oHrDyxfawEhSSLhyljN3E5SZkGwXBPNkOQKBb_jf_-nQ';

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

export const getTeams = async (q?, skip?) => {
	try {
		const res = await fetch(
			`${SCOGO_ADMIN_API_K8S_HOST_TEMP}/v1/teams?limit=6&skip=${skip ? skip : ''}&q=${q ? q : ''}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokendev4}`
				}
			}
		);
		if (res.ok) {
			const { data, metadata } = await res.json();
			return { data, metadata };
		}
		toast.error('Error : Unable to fetch teams');
	} catch (error) {
		console.log(error);
	}
};

export const createTeam = async (teamBody) => {
	try {
		const res = await fetch(`${SCOGO_ADMIN_API_K8S_HOST_TEMP}/v1/teams`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokendev4}`
			},
			body: JSON.stringify(teamBody)
		});
		if (res.ok) {
			const newTeam = res.json();
			return newTeam;
		}
		toast.error('Error : Unable to create team');
	} catch (error) {
		console.log(error);
	}
};

export const deleteTeam = async (id) => {
	try {
		const res = await fetch(`${SCOGO_ADMIN_API_K8S_HOST_TEMP}/v1/teams/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokendev4}`
			}
		});
		if (res.ok) {
			return true;
		}
		toast.error('Error : Unable to delete team');
	} catch (error) {
		console.log(error);
	}
};

export const getTeamMembers = async (id) => {
	try {
		const res = await fetch(`${SCOGO_ADMIN_API_K8S_HOST_TEMP}/v1/teams/${id}/members`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokendev4}`
			}
		});
		if (res.ok) {
			const { data } = await res.json();
			return data;
		}
		toast.error('Error : Unable to get members of team');
		return [];
	} catch (error) {
		console.log(error);
	}
};

export const removeMembersFromTeam = async (id, members) => {
	try {
		const res = await fetch(`${SCOGO_ADMIN_API_K8S_HOST_TEMP}/v1/teams/${id}/remove`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokendev4}`
			},
			body: JSON.stringify({ members: members })
		});
		if (res.ok) {
			console.log(res); ////////change after khusboo  is done
			return true;
		}
		toast.error('Error : Unable to remove member');
	} catch (error) {
		console.log(error);
	}
};

export const addMembersToTeam = async (id, users) => {
	try {
		const res = await fetch(`${SCOGO_ADMIN_API_K8S_HOST_TEMP}/v1/teams/${id}/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokendev4}`
			},
			body: JSON.stringify({ users: users })
		});
		if (res.ok) {
			console.log(res); ////////change after khusboo  is done
			return true;
		}
		toast.error('Error : Unable to add member');
	} catch (error) {
		console.log(error);
	}
};

export const getUsers = async () => {
	try {
		const res = await fetch(`${SCOGO_ADMIN_API_K8S_HOST_TEMP}/v1/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokendev4}`
			}
		});
		if (res.ok) {
			const { data } = await res.json();
			return data;
		}
		toast.error('Error : Unable to get users');
	} catch (error) {
		console.log(error);
	}
};
