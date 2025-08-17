// Cookie utility functions
export const setCookie = (name: string, value: string, days: number = 7): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const removeCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Session management
export const isSessionValid = (): boolean => {
  const session = getCookie('umroh_session');
  return session !== null;
};

export const getSessionData = (): any => {
  const session = getCookie('umroh_session');
  if (session) {
    try {
      return JSON.parse(session);
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const clearSession = (): void => {
  removeCookie('umroh_session');
  removeCookie('umroh_activities');
};