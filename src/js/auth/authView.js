import { login, register } from './auth.js';
import { isAuthenticated } from './authCheck.js';

let mode = "login";

const loginTab = document.getElementById("btn-login-tab");
const registerTab = document.getElementById("btn-register-tab");
const submitBtn = document.getElementById("submit-btn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        window.location.reload();
    }
});

document.addEventListener("DOMContentLoaded", async () => {

    const logged = await isAuthenticated();

    if (logged) {
        window.location.href = "../index.html";
    }

});

loginTab.addEventListener("click", () => {

    mode = "login";

    submitBtn.textContent = "Login";

    // activar tab login
    loginTab.classList.add("bg-[#8B5CF6]");
    loginTab.classList.remove("border", "border-[#7C3AED]");

    // desactivar tab register
    registerTab.classList.remove("bg-[#8B5CF6]");
    registerTab.classList.add("border", "border-[#7C3AED]");

});

registerTab.addEventListener("click", () => {

    mode = "register";

    submitBtn.textContent = "Register";

    // activar tab register
    registerTab.classList.add("bg-[#8B5CF6]");
    registerTab.classList.remove("border", "border-[#7C3AED]");

    // desactivar tab login
    loginTab.classList.remove("bg-[#8B5CF6]");
    loginTab.classList.add("border", "border-[#7C3AED]");

});

submitBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert("Completa todos los campos");
        return;
    }

    try {

        if (mode === "register") {

            await register(email, password);

            alert("Usuario creado, ahora inicia sesión");

            mode = "login";
            submitBtn.textContent = "Login";

            return;
        }

        if (mode === "login") {

            await login(email, password);

            window.location.href = "../index.html";

        }

    } catch (err) {

        alert("Error en autenticación");

    }

});