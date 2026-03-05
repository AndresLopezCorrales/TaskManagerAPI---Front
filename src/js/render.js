import { toggleTaskCompleted, deleteTask } from './api.js';
import { showToast } from './toast.js';
import { loadTasks } from './main.js';

// Stats
export function renderStats(tasks) {
    const stats = document.getElementById('stats');
    if (tasks.length === 0) { stats.classList.add('hidden'); return; }

    const done = tasks.filter(t => t.completed).length;
    stats.classList.remove('hidden');
    document.getElementById('count-total').textContent = tasks.length;
    document.getElementById('count-pending').textContent = tasks.length - done;
    document.getElementById('count-done').textContent = done;
}

// Task
function buildTaskItem(task) {
    const item = document.createElement('div');
    item.id = `task-${task.id}`;
    item.className = `flex items-start gap-3 border border-violet-900 rounded-xl px-4 py-3 transition duration-200 ${task.completed ? 'bg-violet-950' : 'bg-indigo-950'} hover:bg-indigo-900`;

    // Check button
    const check = document.createElement('button');
    check.type = 'button';
    check.title = task.completed ? 'Marcar pendiente' : 'Marcar completada';
    check.className = `flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition duration-150 ${task.completed ? 'bg-violet-600 border-violet-200' : 'bg-transparent border-violet-400 hover:border-violet-100'}`;
    if (task.completed) {
        check.innerHTML = `<svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }
    check.addEventListener('click', async () => {
        try { await toggleTaskCompleted(task.id, task.completed); await loadTasks(); }
        catch { showToast('No se pudo actualizar la tarea', 'error'); }
    });

    // ID
    const id = document.createElement('span');
    id.className = 'text-xs text-violet-700 min-w-2 text-right select-none flex-shrink-0 mt-0.5';
    id.textContent = `#${task.id}`;

    // Title
    const title = document.createElement('span');
    title.className = `flex-1 block text-sm max-h-16 overflow-y-auto break-words leading-relaxed pr-1 task-scroll ${task.completed ? 'line-through text-violet-800' : 'text-indigo-100'}`;
    title.textContent = task.title;

    // Badge
    const badge = document.createElement('span');
    badge.className = `text-[10px] tracking-widest uppercase px-2 py-0.5 rounded font-medium whitespace-nowrap flex-shrink-0 mt-0.5 border ${task.completed
        ? 'bg-green-950 text-green-400 border-green-800'
        : 'bg-orange-950 text-orange-400 border-orange-800'
        }`;
    badge.textContent = task.completed ? 'hecho' : 'pendiente';

    // Delete button — icono de basura SVG
    const del = document.createElement('button');
    del.type = 'button';
    del.title = 'Eliminar tarea';
    del.className = 'flex-shrink-0 mt-0.5 border border-red-900 rounded-md p-1.5 text-red-700 transition duration-150 hover:bg-red-950 hover:text-red-400 hover:border-red-800';
    del.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>`;
    del.addEventListener('click', async () => {
        item.style.opacity = '0.3';
        try { await deleteTask(task.id); showToast('Tarea eliminada', 'success'); await loadTasks(); }
        catch { showToast('No se pudo eliminar la tarea', 'error'); item.style.opacity = ''; }
    });

    const actions = document.createElement('div');
    actions.className = 'flex items-center gap-2 flex-shrink-0';
    actions.append(badge, del);

    item.append(check, id, title, actions);
    return item;
}

export function renderTasks(tasks) {
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    renderStats(tasks);

    if (tasks.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'flex flex-col items-center justify-center py-16 border border-dashed border-violet-900 rounded-xl text-center';
        empty.innerHTML = `
            <span class="text-4xl mb-4 opacity-30">◻</span>
            <p class="font-bold text-violet-400/50 mb-1" style="font-family:'Syne',sans-serif">Sin tareas por ahora</p>
            <small class="text-xs text-violet-900/60">Agrega tu primera tarea arriba</small>
        `;
        list.appendChild(empty);
        return;
    }

    tasks.forEach(task => list.appendChild(buildTaskItem(task)));
}