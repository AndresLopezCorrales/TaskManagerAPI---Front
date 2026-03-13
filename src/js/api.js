//const API_URL = 'https://taskmanagerapi-production-2ccf.up.railway.app/tasks';

const API_URL = 'https://taskmanagerapi-production-2ccf.up.railway.app';

export async function fetchTasks() {
    const res = await fetch(`${API_URL}/tasks`, {
        credentials: 'include'
    });

    if (!res.ok) throw new Error('Error al cargar tareas');
    return res.json();
}

export async function createTask(title) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
    });

    if (!res.ok) throw new Error('Error al crear tarea');
    return res.json();
}

export async function toggleTaskCompleted(id, currentCompleted) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentCompleted }),
    });

    if (!res.ok) throw new Error('Error al actualizar tarea');
    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!res.ok && res.status !== 204) throw new Error('Error al eliminar tarea');
}