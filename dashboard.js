function sanitize(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function getContactsKey(userId) {
  return `app_contacts_${userId}`;
}

function loadContacts() {
  const session = getSession();
  if (!session) return [];

  const key = getContactsKey(session.userId);
  return storageService.get(key) || [];
}

function saveContacts(contatos) {
  const session = getSession();
  const key = getContactsKey(session.userId);
  storageService.set(key, contatos);
}

function addContact(nome, email, telefone) {
  if (!nome || !email) {
    throw new Error("Nome e e-mail são obrigatórios.");
  }

  const contatos = loadContacts();

  contatos.push({
    id: "contact_" + Date.now(),
    nome,
    email,
    telefone
  });

  saveContacts(contatos);
}

function updateContact(id, novosDados) {
  const contatos = loadContacts();

  const atualizados = contatos.map(c =>
    c.id === id ? { ...c, ...novosDados } : c
  );

  saveContacts(atualizados);
}

function deleteContact(id) {
  const contatos = loadContacts();
  const filtrados = contatos.filter(c => c.id !== id);
  saveContacts(filtrados);
}

function exportContacts() {
  const contatos = loadContacts();
  const json = JSON.stringify(contatos, null, 2);

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "contatos.json";
  a.click();

  URL.revokeObjectURL(url);
}

function importContacts(file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      const dados = JSON.parse(event.target.result);

      if (!Array.isArray(dados)) {
        throw new Error("Formato inválido.");
      }

      for (const contato of dados) {
        if (!contato.nome || !contato.email) {
          throw new Error("Contato inválido no arquivo.");
        }
      }

      saveContacts(dados);
      alert("Importação realizada com sucesso!");
    } catch (error) {
      alert("Erro ao importar arquivo.");
    }
  };

  reader.readAsText(file);
}