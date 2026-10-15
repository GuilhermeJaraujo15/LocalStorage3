# User Management Application (LocalStorage)

[English](#english) | [Português](#português)

---

## English

A practice exercise on a feature of the JavaScript language called LocalStorage, which involves saving small amounts of data directly in the browser. In this small project, it is applied to a login page.

Project link: https://github.io

### Project Objective
Develop a Single-Page Application (SPA) that allows user registration and login. After logging in, the user is directed to a dashboard where they can view and manage a contact list. The application must be secure, well-structured, and demonstrate development best practices.

### Core Features

1. Mock Authentication System:
   - Registration page for new users (name, email, password).
   - Login page.
   - Client-side password hashing (used a simple technique for educational purposes).
   - Session management: a session "token" is stored to keep the user logged in.
   - Route protection: the dashboard can only be accessed by authenticated users.

2. Contacts Dashboard:
   - Full CRUD operations for a contact list (name, phone, email) associated with the logged-in user.
   - Each user's data (including their contacts) is stored separately.

3. Robust Architecture:
   - Use of a storageService to abstract all interactions with localStorage.
   - Data validation on all inputs.
   - Output sanitization to prevent XSS attacks.

4. Extra Features:
   - "Logout" button.
   - Export/Import of contact data in JSON format.

### Project Structure
The project is divided into multiple files for better organization:

- index.html: The SPA entry point, which loads the different pages (views).
- style.css: Main stylesheet.
- auth.js: Authentication logic (registration, login, logout, session management).
- dashboard.js: Dashboard logic (contacts CRUD management).
- storageService.js: The localStorage abstraction service.
- app.js: The main orchestrator, controlling navigation and app initialization.

---

## Português

Treino da vertente da linguagem JavaScript denominada LocalStorage, que diz respeito ao salvamento de pequenos dados no navegador. Neste pequeno projeto, o conceito é aplicado a uma página de Login.

Link do projeto: https://github.io

### Objetivo do Projeto
Desenvolver uma Single-Page Application (SPA) que permita o registro e o login de usuários. Após o login, o usuário é direcionado para um dashboard onde pode ver e gerenciar uma lista de contatos. A aplicação deve ser segura, bem estruturada e demonstrar as melhores práticas aprendidas.

### Funcionalidades Principais

1. Sistema de Autenticação Simulado:
   - Página de registro para novos usuários (nome, e-mail, senha).
   - Página de login.
   - As senhas devem ser "hasheadas" (usaremos uma técnica de hash simples do lado do cliente para fins didáticos).
   - Gerenciamento de sessão: um "token" de sessão será armazenado para manter o usuário logado.
   - Proteção de rotas: o dashboard só pode ser acessado por usuários autenticados.

2. Dashboard de Contatos:
   - CRUD completo para uma lista de contatos (nome, telefone, e-mail) associada ao usuário logado.
   - Os dados de cada usuário (incluindo seus contatos) devem ser armazenados separadamente.

3. Arquitetura Robusta:
   - Uso de um storageService para abstrair todas as interações com o localStorage.
   - Validação de dados em todas as entradas.
   - Sanitização de saídas para prevenir ataques XSS.

4. Funcionalidades Extras:
   - Botão de "Logout".
   - Exportação/Importação de dados de contatos em formato JSON.

### Estrutura do Projeto
O projeto será dividido em múltiplos arquivos para uma melhor organização:

- index.html: O ponto de entrada da SPA, que carregará as diferentes "páginas" (views).
- style.css: Folha de estilos.
- auth.js: Lógica de autenticação (registro, login, logout, gerenciamento de sessão).
- dashboard.js: Lógica do dashboard (CRUD de contatos).
- storageService.js: Nosso serviço de abordagem e abstração do localStorage.
- app.js: O orquestrador principal, que controla a navegação e a inicialização.
