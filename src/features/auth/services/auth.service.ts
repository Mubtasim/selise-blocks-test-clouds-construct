import API_CONFIG, { getApiUrl } from 'config/api';
import { clients, HttpError } from '../../../lib/https';
import { useAuthStore } from '../../../state/store/auth';

const url = getApiUrl('/authentication/v1/oauth/token');

export const signin = async (data: { username: string; password: string }) => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('username', data.username);
  formData.append('password', data.password);
  // const url = process.env.REACT_APP_PUBLIC_BACKEND_URL + '/authentication/v1/oauth/token';
  // const url = 'https://dev-api.seliseblocks.com' + '/authentication/v1/oauth/token';

  const res = await fetch(url, {
    method: 'post',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'X-Blocks-Key': process.env.REACT_APP_PUBLIC_X_BLOCKS_KEY || '',
      'X-Blocks-Key': API_CONFIG.blocksKey,
      credentials: 'include',
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new HttpError(res.status, err);
  }
  return res.json();
};

export const signout = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // const url = '/authentication/v1/Authentication/Logout';
    const url = API_CONFIG.baseUrl + '/authentication/v1/Authentication/Logout';
    const res = await clients.post(
      url,
      JSON.stringify({
        refreshToken: useAuthStore.getState().refreshToken,
      })
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getRefreshToken = async () => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', useAuthStore.getState().refreshToken || '');
  // const url = process.env.REACT_APP_PUBLIC_BACKEND_URL + '/authentication/v1/oauth/token';

  const res = await fetch(url, {
    method: 'post',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'X-Blocks-Key': process.env.REACT_APP_PUBLIC_X_BLOCKS_KEY || '',
      'X-Blocks-Key': API_CONFIG.blocksKey,
      credentials: 'include',
    },
  });
  return res.json();
};

export const accountActivation = async (data: { password: string; code: string }) => {
  const payload = {
    ...data,
    // ProjectKey: process.env.REACT_APP_PUBLIC_X_BLOCKS_KEY,
    ProjectKey: API_CONFIG.blocksKey,
    preventPostEvent: true,
  };
  // const url = '/iam/v1/Account/Activate';
  const url = API_CONFIG.baseUrl + '/iam/v1/Account/Activate';
  return clients.post(url, JSON.stringify(payload));
};
