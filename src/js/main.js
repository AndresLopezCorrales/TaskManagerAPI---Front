import { fetchTasks, createTask } from './api.js';
import { renderTasks } from './render.js';
import { showToast } from './toast.js';

export async function loadTasks() {
    try {
        const tasks = await fetchTasks();
        renderTasks(tasks);
    } catch {
        showToast('No se pudo conectar con la API', 'error');
        renderTasks([]);
    }
}

async function addTask() {
    const input = document.getElementById('task-input');
    const btn = document.getElementById('btn-add');
    const title = input.value.trim();

    if (!title) {
        input.focus();
        showToast('Escribe el título de la tarea', 'error');
        return;
    }

    btn.disabled = true;

    try {
        await createTask(title);
        input.value = '';
        showToast('✓ Tarea agregada', 'success');
        await loadTasks();
    } catch {
        showToast('No se pudo crear la tarea', 'error');
    } finally {
        btn.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    document.getElementById('btn-add').addEventListener('click', addTask);

    document.getElementById('task-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') addTask();
    });
});
