# Quadro de Tarefas de Integração

O desenvolvimento da Integração entre o Aplicativo (Frontend / Expo React Native) e a futura API (Backend) foi dividido em fases. Abaixo estão as tarefas listadas por ordem ideal de execução.

## Fase 1: Planejamento e Estruturação do Back-end
- [ ] **TAF01:** Definir stack de tecnologia do backend (Ex: Node.js + Express, NestJS ou Laravel) e Banco de Dados (PostgreSQL / MySQL).
- [ ] **TAF02:** Criar documentação ou Swagger das rotas da API (Modelagem de Dados).
- [ ] **TAF03:** Configurar ambiente e repositório do backend.

## Fase 2: Desenvolvimento da API (Parte do Servidor)
- [ ] **TAF04:** Criar endpoint `POST /api/oracao` para receber e salvar no banco os pedidos de oração.
- [ ] **TAF05:** Criar endpoints de Configurações `GET /api/configuracoes` para informações da igreja (WhatsApp, Telefones, Endereço).
- [ ] **TAF06:** Criar painel administrativo básico web (CMS ou AdminJS/React Admin) para ler as requisições geradas por usuários.
- [ ] **TAF07:** Criar estrutura de dados (Tabelas) para Eventos/Batismos e criar endpoint `GET /api/eventos`.
- [ ] **TAF08:** Criar estrutura e endpoint `GET /api/campanhas`.
- [ ] **TAF09:** Criar estrutura e endpoint `GET /api/estudos`.
- [ ] **TAF10:** Configurar e provisionar armazenamento de imagens (AWS S3) para enviar ao app pelas variáveis do banco.

## Fase 3: Integração no App (Frontend)
- [ ] **TAF11:** Instalar biblioteca de requisições HTTP (Ex: `axios` ou `fetch`) no app Expo.
- [ ] **TAF12:** Refatorar a tela `app/oracao.tsx` para enviar o POST para o backend e tratar os estados de **Loading** e **Sucesso/Erro**.
- [ ] **TAF13:** Refatorar a tela `app/contato.tsx` para carregar as informações vindas da API de configurações localmente (usando React Query ou useEffect).
- [ ] **TAF14:** Refatorar a tela `app/batismo.tsx` para exibir a próxima data de batismo extraída da API.
- [ ] **TAF15:** Refatorar `app/campanhas.tsx`, `app/estudos.tsx` e `app/aniversariantes.tsx` para renderizar os dados através da chamada web e exibir Skeleton Loadings durante as requisições.

## Fase 4: Autenticação (Opcional Futuro)
- [ ] **TAF16:** Criar o fluxo de Auth no backend (JWT).
- [ ] **TAF17:** Adaptar login e cadastro em `profile.tsx`.
- [ ] **TAF18:** Proteger as rotas privadas com contextos no React Native e Tokens (AsyncStorage / SecureStore).
