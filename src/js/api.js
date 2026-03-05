const API_URL = 'http://localhost:3000/tasks';

// GET /tasks
export async function fetchTasks() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al cargar tareas');
    return res.json();
}

// POST /tasks
export async function createTask(title) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
    });
    if (!res.ok) throw new Error('Error al crear tarea');
    return res.json();
}

// PATCH /tasks/:id
export async function toggleTaskCompleted(id, currentCompleted) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentCompleted }),
    });
    if (!res.ok) throw new Error('Error al actualizar tarea');
    return res.json();
}

// DELETE /tasks/:id
export async function deleteTask(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error('Error al eliminar tarea');
}
