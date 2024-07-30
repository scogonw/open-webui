import { toast } from 'svelte-sonner';

const SCOGO_ADMIN_API_K8S_HOST = import.meta.env.VITE_SCOGO_ADMIN_API_K8S_HOST;
const SCOGO_ADMIN_API_K8S_HOST_TEMP = import.meta.env.VITE_SCOGO_ADMIN_API_K8S_HOST_TEMP;
const SCOGO_DRIVE_API_K8S_HOST_TEMP = import.meta.env.VITE_SCOGO_DRIVE_API_K8S_HOST_TEMP;
const SCOGO_AUTH_API_K8S_HOST = import.meta.env.VITE_SCOGO_AUTH_API_K8S_HOST;
const tokendev4 =
	'G9t0aUpfC7cEkYttjuo3AkgMMFOIHXfaeQsVF_LNmnvxiTzDU-IzR9r-q4Jq4-Sx5ScHw03TC4J5Eh9JlfHl1nrZz1pOh0-BrHmqgIKlPmRwbgdrk42bmdwgTGo';

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
			const newTeam = await res.json();
			return newTeam;
		}
		toast.error('Error : Unable to create team');
	} catch (error) {
		console.log(error);
	}
};

export const editTeam = async (id, teamBody) => {
	try {
		const res = await fetch(`${SCOGO_ADMIN_API_K8S_HOST_TEMP}/v1/teams/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokendev4}`
			},
			body: JSON.stringify(teamBody)
		});
		if (res.ok) {
			const editedTeam = await res.json();
			return editedTeam;
		}
		toast.error('Error : Unable to edit team');
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

export const getDriveList = async (token) => {
	try {
		const res = await fetch(`${SCOGO_DRIVE_API_K8S_HOST_TEMP}/v1/my-drive/resources`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		if (res.ok) {
			const { data } = await res.json();
			return data;
		}
		toast.error('Error : Unable to get drive');
	} catch (error) {
		console.log(error);
	}
};

export const getFilesByParent = async (token, parent) => {
	try {
		const res = await fetch(
			`${SCOGO_DRIVE_API_K8S_HOST_TEMP}/v1/my-drive/resources?parent=${parent}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);
		if (res.ok) {
			const { data } = await res.json();
			return data;
		}
		toast.error('Error : Unable to get drive');
	} catch (error) {
		console.log(error);
	}
};

export const createFolder = async (token, body) => {
	try {
		const res = await fetch(`${SCOGO_DRIVE_API_K8S_HOST_TEMP}/v1/my-drive/resources`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		});
		console.log(res);
		if (res.ok) {
			const { data } = await res.json();
			return data;
		}
		toast.error('Error : Unable to create folder');
	} catch (error) {
		console.log(error);
	}
};
