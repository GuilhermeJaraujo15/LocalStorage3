function navigate(view) {
  document.querySelectorAll(".view").forEach(v => {
    v.classList.add("hidden");
  });

  const target = document.getElementById(view);
  if (target) {
    target.classList.remove("hidden");
  }
}

function initApp() {
  const session = getSession();

  if (session) {
    navigate("dashboard");
  } else {
    navigate("login");
  }
}

document.addEventListener("DOMContentLoaded", initApp);

// ---- Instruções: coloque todo este bloco NO FINAL de app.js ----
// (ou crie um arquivo ui.js e o inclua depois de app.js)
document.addEventListener('DOMContentLoaded', () => {
  // elementos principais (conforme seu index.html)
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const goRegister = document.getElementById('goRegister');
  const goLogin = document.getElementById('goLogin');
  const logoutBtn = document.getElementById('logoutBtn');
  const importFile = document.getElementById('importFile');
  const exportBtn = document.getElementById('exportBtn');

  // helpers
  function safeNavigate(view) {
    if (document.getElementById(view)) navigate(view);
  }

  // links de troca de view
  if (goRegister) goRegister.addEventListener('click', (e) => {
    e.preventDefault();
    safeNavigate('register');
  });

  if (goLogin) goLogin.addEventListener('click', (e) => {
    e.preventDefault();
    safeNavigate('login');
  });

  // REGISTER
  if (registerForm) {
    registerForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // pega os inputs na ordem: nome, email, senha (conforme seu HTML)
      const inputs = registerForm.querySelectorAll('input');
      const nome = (inputs[0]?.value || '').trim();
      const email = (inputs[1]?.value || '').trim();
      const senha = (inputs[2]?.value || '');

      try {
        register(nome, email, senha); // from auth.js
        alert('Conta criada com sucesso. Faça login.');
        registerForm.reset();
        safeNavigate('login');
      } catch (err) {
        // register lança Error com mensagem; mostrar ao usuário
        alert(err && err.message ? err.message : 'Erro ao registrar');
      }
    });
  }

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // ordem: email, senha (conforme seu HTML)
      const inputs = loginForm.querySelectorAll('input');
      const email = (inputs[0]?.value || '').trim();
      const senha = (inputs[1]?.value || '');

      try {
        login(email, senha); // from auth.js
        loginForm.reset();
        // mostra logout e vai pro dashboard
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        safeNavigate('dashboard');
        // se dashboard.js fornecer renderContacts, chamar para renderizar a lista
        if (typeof renderContacts === 'function') renderContacts();
      } catch (err) {
        alert(err && err.message ? err.message : 'Erro ao autenticar');
      }
    });
  }

  // LOGOUT
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout(); // from auth.js
      logoutBtn.classList.add('hidden');
      safeNavigate('login');
    });

    // exibir logout se sessão ativa
    if (typeof getSession === 'function' && getSession()) {
      logoutBtn.classList.remove('hidden');
    }
  }

  // EXPORT / IMPORT (se existe no dashboard)
  if (exportBtn && typeof exportContacts === 'function') {
    exportBtn.addEventListener('click', exportContacts);
  }

  if (importFile && typeof importContacts === 'function') {
    importFile.addEventListener('change', (ev) => {
      const file = ev.target.files && ev.target.files[0];
      if (file) importContacts(file);
      importFile.value = '';
    });
  }

  // inicialização original
  if (typeof initApp === 'function') initApp();
});