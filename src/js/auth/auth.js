const API_URL = 'https://taskmanagerapi-production-2ccf.up.railway.app';

export async function register(email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error('No se pudo registrar');
}

export async function login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error('Credenciales incorrectas');
}

export async function logout() {

    await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });

}