const API_URL = "https://taskmanagerapi-production-2ccf.up.railway.app";

export async function isAuthenticated() {

    try {

        const res = await fetch(`${API_URL}/auth/me`, {
            credentials: "include"
        });

        return res.ok;

    } catch {
        return false;
    }

}