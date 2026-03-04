function hashSenha(senha) {
  let hash = senha;
  for (let i = 0; i < 5; i++) {
    hash = btoa(hash);
  }
  return hash;
}

function register(nome, email, senha) {
  if (!nome || !email || !senha) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("E-mail inválido.");
  }

  if (senha.length < 6) {
    throw new Error("Senha deve ter no mínimo 6 caracteres.");
  }

  const users = storageService.get("app_users") || [];

  const emailExiste = users.find(u => u.email === email);
  if (emailExiste) {
    throw new Error("E-mail já cadastrado.");
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
  const users = storageService.get("app_users") || [];

  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (hashSenha(senha) !== user.senhaHash) {
    throw new Error("Senha incorreta.");
  }

  storageService.set("app_session", { userId: user.id });
}

function getSession() {
  return storageService.get("app_session");
}

function logout() {
  storageService.remove("app_session");
}