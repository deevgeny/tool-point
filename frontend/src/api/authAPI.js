import React from 'react';

export async function login({email, password, navigate, setError}) {
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
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      navigate('/', {replace: true});
    } else {
      setError({status: response.status, message: response.statusText})
    }
  } catch (error) {
    setError({status: 'saf', message: error.message})
  }
}


