function getToken() {
  if (!localStorage.getItem('persist:root')) {
    return '';
  }
  try {
    const storage = JSON.parse(localStorage.getItem('persist:root') || '{}');
    return JSON.parse(storage.app).token;
  } catch (error) {
    console.error('获取token失败:', error);
    return '';
  }
}

function setAccessToken(token: string) {
  localStorage.setItem('access_token', token);
}

function getAccessToken() {
  return localStorage.getItem('access_token');
}

function removeAccessToken() {
  localStorage.removeItem('access_token');
}

export { getAccessToken, getToken, removeAccessToken, setAccessToken };
