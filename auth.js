function hashSenha(senha) {
  let hash = senha;
  for (let i = 0; i < 5; i++) {
    hash = btoa(hash);
  }
  return hash;
}

function register(nome, email, senha) {
  const t = key => window.i18n ? window.i18n.t(key) : key;
  if (!nome || !email || !senha) {
    throw new Error(t("requiredFields"));
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error(t("invalidEmail"));
  }

  if (senha.length < 6) {
    throw new Error(t("passwordLength"));
  }

  const users = storageService.get("app_users") || [];

  const emailExiste = users.find(u => u.email === email);
  if (emailExiste) {
    throw new Error(t("emailExists"));
  }

  const novoUsuario = {
    id: "user_" + Date.now(),
    nome,
    email,
    senhaHash: hashSenha(senha)
  };

  users.push(novoUsuario);
  storageService.set("app_users", users);
}

function login(email, senha) {
  const t = key => window.i18n ? window.i18n.t(key) : key;
  const users = storageService.get("app_users") || [];

  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error(t("userNotFound"));
  }

  if (hashSenha(senha) !== user.senhaHash) {
    throw new Error(t("wrongPassword"));
  }

  storageService.set("app_session", { userId: user.id });
}

function getSession() {
  return storageService.get("app_session");
}

function logout() {
  storageService.remove("app_session");
}
