import { toast } from 'svelte-sonner';

const SCOGO_ADMIN_API_K8S_HOST = import.meta.env.VITE_SCOGO_ADMIN_API_K8S_HOST;
const SCOGO_USERS_API_K8S_HOST = import.meta.env.VITE_SCOGO_USERS_API_K8S_HOST;
// const SCOGO_ADMIN_API_K8S_HOST_TEMP = import.meta.env.VITE_SCOGO_ADMIN_API_K8S_HOST_TEMP;
const SCOGO_DRIVE_API_K8S_HOST = import.meta.env.VITE_SCOGO_DRIVE_API_K8S_HOST;
const SCOGO_AUTH_API_K8S_HOST = import.meta.env.VITE_SCOGO_AUTH_API_K8S_HOST;
const SCOGO_CHAT_API_K8S_HOST = import.meta.env.VITE_SCOGO_CHAT_API_K8S_HOST;
const tokendev4 =
	'lVs0sJolh2zxNPrASFQG7z5uMqyDNt9_wd2JbWsKPhyxmGYCfqvMPganU3NntrFtdEk0Jq-i7LCwCwyfhtsIvo5h5bieW_41QgGisudFYQNeFnV8Zoie8u__EkQ';

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

export const onBoardOrg = async (token, body) => {
	try {
		const res = await fetch(`${SCOGO_USERS_API_K8S_HOST}/v1/org/triton/onboard`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		});
		if (res.ok) {
			return true;
		}
		toast.error('Error : Unable to onboard organization');
	} catch (error) {
		console.log(error);
	}
};

export const getTeams = async (token, q?, skip = 0) => {
	try {
		const res = await fetch(
			`${SCOGO_USERS_API_K8S_HOST}/v1/teams?limit=6&skip=${skip}&q=${q ? q : ''}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
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

export const createTeam = async (token, teamBody) => {
	try {
		const res = await fetch(`${SCOGO_USERS_API_K8S_HOST}/v1/teams`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
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

export const editTeam = async (token, id, teamBody) => {
	try {
		const res = await fetch(`${SCOGO_USERS_API_K8S_HOST}/v1/teams/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
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

export const deleteTeam = async (token, id) => {
	try {
		const res = await fetch(`${SCOGO_USERS_API_K8S_HOST}/v1/teams/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
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

export const getTeamMembers = async (token, id) => {
	try {
		const res = await fetch(`${SCOGO_USERS_API_K8S_HOST}/v1/teams/${id}/members`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		if (res.ok) {
			const data = await res.json();
			return data;
		}
		toast.error('Error : Unable to get members of team');
		return [];
	} catch (error) {
		console.log(error);
	}
};

export const removeMembersFromTeam = async (token, id, members) => {
	try {
		const res = await fetch(`${SCOGO_USERS_API_K8S_HOST}/v1/teams/${id}/remove`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
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

export const addMembersToTeam = async (token, id, users) => {
	try {
		const res = await fetch(`${SCOGO_USERS_API_K8S_HOST}/v1/teams/${id}/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
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

export const getUsers = async (token) => {
	try {
		const res = await fetch(`${SCOGO_USERS_API_K8S_HOST}/v1/users`, {
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
		toast.error('Error : Unable to get users');
	} catch (error) {
		console.log(error);
	}
};

export const inviteUser = async (token, body) => {
	try {
		const res = await fetch(`${SCOGO_USERS_API_K8S_HOST}/v1/users/invite/link`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		});
		if (res.ok) {
			console.log(await res.json());
			return true;
		}
		toast.error('Error: Unable to invite user');
	} catch (error) {
		console.log(error);
	}
};

export const getDriveList = async (token) => {
	try {
		const res = await fetch(`${SCOGO_DRIVE_API_K8S_HOST}/v1/my-drive/resources`, {
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

export const getFilesByParent = async (
	token,
	parent,
	sortBy = 'created_at',
	sortOrder = 'desc',
	limit = 50
) => {
	try {
		const res = await fetch(
			`${SCOGO_DRIVE_API_K8S_HOST}/v1/my-drive/resources?limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&parent=${parent}`,
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

export const createAssetOnDrive = async (token, body) => {
	try {
		const res = await fetch(`${SCOGO_DRIVE_API_K8S_HOST}/v1/my-drive/resources`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		});
		if (res.ok) {
			const { data } = await res.json();
			return data;
		}
		toast.error('Error : Unable to create asset');
	} catch (error) {
		console.log(error);
	}
};

export const deleteAssetOnDrive = async (token, id) => {
	try {
		const res = await fetch(`${SCOGO_DRIVE_API_K8S_HOST}/v1/my-drive/resources/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		if (res.ok) {
			const data = await res.json();
			return data;
		}
		toast.error('Error : Unable to delete asset');
	} catch (error) {
		console.log(error);
	}
};

export const editAssetOnDrive = async (token, id, body) => {
	try {
		const res = await fetch(`${SCOGO_DRIVE_API_K8S_HOST}/v1/my-drive/resources/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		});
		if (res.ok) {
			const data = await res.json();
			return data;
		}
		toast.error('Error : Unable to edit asset');
	} catch (error) {
		console.log(error);
	}
};

export const getSignedUrl = async (token, body) => {
	try {
		const res = await fetch(`${SCOGO_DRIVE_API_K8S_HOST}/v1/my-drive/resources/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		});
		if (res.ok) {
			const data = await res.json();
			return data;
		}
		toast.error('Error : Unable to Upload asset');
	} catch (error) {
		console.log(error);
	}
};

export const getAllAiChats = async (token) => {
	try {
		const res = await fetch(`${SCOGO_CHAT_API_K8S_HOST}/v1/chat`, {
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
		toast.error('Error : Unable to get chats');
	} catch (error) {
		console.log(error);
	}
};

export const getMessageOfChatMapping = async (token, id) => {
	try {
		const res = await fetch(`${SCOGO_CHAT_API_K8S_HOST}/v1/chat/${id}/messages`, {
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
		toast.error('Error : Unable to get chat messages');
	} catch (error) {
		console.log(error);
	}
};

export const sendMessageInChatMapping = async (token, id, body) => {
	try {
		const res = await fetch(`${SCOGO_CHAT_API_K8S_HOST}/v1/chat/${id}/messages`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		});
		if (res.ok) {
			const data = await res.json();
			return data;
		}
		toast.error('Error : Unable to send message');
	} catch (error) {
		console.log(error);
	}
};

export const getMessagesByChatId = async (token, id) => {
	try {
		const res = await fetch(`${SCOGO_CHAT_API_K8S_HOST}/v1/chat/${id}/messages`, {
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
		toast.error('Error : Unable to get messages');
	} catch (error) {
		console.log(error);
	}
};
