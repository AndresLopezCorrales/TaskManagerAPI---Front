let toastTimer;

export function showToast(msg, type = '') {
    const toast = document.getElementById('toast');

    toast.classList.remove('hidden', 'toast--success', 'toast--error');

    toast.textContent = msg;

    if (type === 'success') toast.classList.add('toast--success');
    if (type === 'error') toast.classList.add('toast--error');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
}
