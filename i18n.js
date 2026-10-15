(() => {
  const translations = {
    pt: {
      pageTitle: 'Gerenciador de usuários e contatos', loginTitle: 'Entrar', loginButton: 'Entrar',
      registerTitle: 'Criar conta', register: 'Criar conta', createAccount: 'Criar conta',
      noAccount: 'Não tem conta?', hasAccount: 'Já tem conta?', login: 'Entrar',
      email: 'E-mail', password: 'Senha', name: 'Nome', phone: 'Telefone',
      logout: 'Sair', yourContacts: 'Seus contatos', export: 'Exportar', import: 'Importar', add: 'Adicionar',
      accountCreated: 'Conta criada com sucesso. Faça login.', registerError: 'Erro ao registrar',
      authError: 'Erro ao autenticar', requiredFields: 'Todos os campos são obrigatórios.',
      invalidEmail: 'E-mail inválido.', passwordLength: 'A senha deve ter no mínimo 6 caracteres.',
      emailExists: 'E-mail já cadastrado.', userNotFound: 'Usuário não encontrado.', wrongPassword: 'Senha incorreta.',
      contactRequired: 'Nome e e-mail são obrigatórios.', invalidFormat: 'Formato inválido.',
      invalidContact: 'Contato inválido no arquivo.', importSuccess: 'Importação realizada com sucesso!',
      importError: 'Erro ao importar arquivo.', edit: 'Editar', delete: 'Excluir', confirmDelete: 'Excluir este contato?',
      contactEmpty: 'Nenhum contato cadastrado.', requiredField: 'Preencha este campo.',
      invalidEmailField: 'Digite um endereço de e-mail válido.'
    },
    en: {
      pageTitle: 'User and Contact Manager', loginTitle: 'Log in', loginButton: 'Log in',
      registerTitle: 'Create an account', register: 'Sign up', createAccount: 'Create account',
      noAccount: "Don't have an account?", hasAccount: 'Already have an account?', login: 'Log in',
      email: 'Email', password: 'Password', name: 'Name', phone: 'Phone',
      logout: 'Log out', yourContacts: 'Your contacts', export: 'Export', import: 'Import', add: 'Add',
      accountCreated: 'Account created successfully. Please log in.', registerError: 'Registration failed',
      authError: 'Authentication failed', requiredFields: 'All fields are required.',
      invalidEmail: 'Invalid email address.', passwordLength: 'Password must be at least 6 characters long.',
      emailExists: 'This email is already registered.', userNotFound: 'User not found.', wrongPassword: 'Incorrect password.',
      contactRequired: 'Name and email are required.', invalidFormat: 'Invalid file format.',
      invalidContact: 'The file contains an invalid contact.', importSuccess: 'Import completed successfully!',
      importError: 'Could not import the file.', edit: 'Edit', delete: 'Delete', confirmDelete: 'Delete this contact?',
      contactEmpty: 'No contacts yet.', requiredField: 'Please fill out this field.',
      invalidEmailField: 'Please enter a valid email address.'
    }
  };

  const storageKey = 'userManagerLanguage';
  let language = localStorage.getItem(storageKey) === 'en' ? 'en' : 'pt';

  function t(key) {
    return (translations[language] && translations[language][key]) || translations.pt[key] || key;
  }

  function applyLanguage() {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('form[novalidate] input').forEach(updateValidationMessage);
    document.title = t('pageTitle');
    const toggle = document.getElementById('languageToggle');
    if (toggle) {
      toggle.textContent = language === 'pt' ? 'EN' : 'PT';
      toggle.setAttribute('aria-label', language === 'pt' ? 'Switch language to English' : 'Mudar idioma para português');
      toggle.setAttribute('aria-pressed', String(language === 'en'));
    }
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { language } }));
  }

  function updateValidationMessage(input) {
    if (!input.willValidate) return;
    if (input.validity.valueMissing) {
      input.setCustomValidity(t('requiredField'));
    } else if (input.validity.typeMismatch && input.type === 'email') {
      input.setCustomValidity(t('invalidEmailField'));
    } else {
      input.setCustomValidity('');
    }
  }

  function setLanguage(nextLanguage) {
    if (!translations[nextLanguage] || nextLanguage === language) return;
    language = nextLanguage;
    localStorage.setItem(storageKey, language);
    applyLanguage();
  }

  window.i18n = { t, setLanguage, get language() { return language; }, applyLanguage };
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('languageToggle');
    if (toggle) toggle.addEventListener('click', () => setLanguage(language === 'pt' ? 'en' : 'pt'));
    document.querySelectorAll('form[novalidate] input').forEach(input => {
      input.addEventListener('input', () => updateValidationMessage(input));
      input.addEventListener('change', () => updateValidationMessage(input));
    });
    document.addEventListener('submit', event => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || !form.hasAttribute('novalidate')) return;
      const invalidInput = Array.from(form.elements).find(element => {
        if (!(element instanceof HTMLInputElement) || !element.willValidate) return false;
        updateValidationMessage(element);
        return !element.checkValidity();
      });
      if (invalidInput) {
        event.preventDefault();
        event.stopImmediatePropagation();
        invalidInput.reportValidity();
      }
    }, true);
    applyLanguage();
  });
})();
