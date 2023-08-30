import * as jose from 'jose';

export async function login({email, password}) {
  const url = process.env.REACT_APP_URL || 'http://127.0.0.1:8000';
  const path = '/api/v1/jwt/create'
  const request = new Request(url + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email, password})
  })
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const data = await response.json()
      const token = jose.decodeJwt(data.access)
      console.log(token)
      console.log(Date.now() / 1000)
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
    }
    return { status: response.status, statusText: response.statusText };
  } catch (error) {
    // Hint: error.name error.message
    return {status: 500, statusText: error.message };
  }
}


export function logout() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}


export async function refresh() {

}


export async function register() {

}