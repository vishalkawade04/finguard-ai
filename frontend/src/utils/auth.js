const TOKEN_KEY = 'token';

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(TOKEN_KEY);
};

const decodePayload = (token) => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    const json = decodeURIComponent(
      decoded
        .split('')
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const getTokenPayload = (token) => {
  if (!token) return null;
  return decodePayload(token);
};

export const isTokenExpired = (token) => {
  const payload = getTokenPayload(token);
  // If payload is missing or malformed, treat token as expired for safety
  if (!payload || typeof payload.exp !== 'number') return true;
  return Date.now() >= payload.exp * 1000;
};

export const isAuthValid = () => {
  const token = getToken();
  return Boolean(token) && !isTokenExpired(token);
};

export const logout = (redirect = true) => {
  removeToken();
  if (redirect && typeof window !== 'undefined') {
    window.location.replace('/login');
  }
};
