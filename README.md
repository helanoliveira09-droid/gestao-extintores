# 🧯 Sistema de Gestão de Extintores

Sistema completo (frontend + backend + banco de dados) para controle de extintores,
inspeções e manutenções, pronto para rodar em produção na nuvem com **Render** (servidor)
e **MongoDB Atlas** (banco de dados).

## Estrutura do projeto

```
gestao-extintores/
├── render.yaml              # Blueprint de deploy automático no Render
├── .gitignore
└── backend/
    ├── server.js             # Servidor Express (API + serve o frontend)
    ├── package.json
    ├── .env.example           # Modelo das variáveis de ambiente
    ├── models/                # Schemas do MongoDB (Mongoose)
    │   ├── Extintor.js
    │   ├── Inspecao.js
    │   └── Manutencao.js
    ├── routes/
    │   └── api.js             # Rotas REST (/api/extintores, /api/inspecoes, /api/manutencoes)
    └── public/
        └── index.html         # Frontend (antigo Gest.html, adaptado para consumir a API)
```

O frontend deixou de usar `localStorage` e agora salva tudo via chamadas `fetch` para a
API REST do backend, que por sua vez persiste os dados no MongoDB. Assim os dados ficam
disponíveis em qualquer dispositivo/navegador, e não somente no navegador local.

## Rotas da API

| Método | Rota                     | Descrição                          |
|--------|---------------------------|-------------------------------------|
| GET    | /api/extintores           | Lista todos os extintores           |
| POST   | /api/extintores           | Cria um extintor                    |
| PUT    | /api/extintores/:id       | Atualiza um extintor                |
| DELETE | /api/extintores/:id       | Remove um extintor                  |
| GET    | /api/inspecoes            | Lista todas as inspeções            |
| POST   | /api/inspecoes            | Cria uma inspeção                   |
| DELETE | /api/inspecoes/:id        | Remove uma inspeção                 |
| GET    | /api/manutencoes          | Lista todas as manutenções          |
| POST   | /api/manutencoes          | Cria uma manutenção                 |
| PATCH  | /api/manutencoes/:id      | Atualiza status/data de retorno     |
| DELETE | /api/manutencoes/:id      | Remove uma manutenção               |
| GET    | /api/health                | Healthcheck (status do servidor/DB) |

---

## 1. Subir o código para o GitHub

```bash
cd gestao-extintores
git init
git add .
git commit -m "Sistema de gestão de extintores - fullstack"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

## 2. Criar o banco de dados no MongoDB Atlas (nuvem, gratuito)

1. Acesse https://www.mongodb.com/cloud/atlas/register e crie uma conta gratuita.
2. Crie um **Cluster** gratuito (M0).
3. Em **Database Access**, crie um usuário com senha (anote usuário e senha).
4. Em **Network Access**, clique em **Add IP Address** e adicione `0.0.0.0/0`
   (permite acesso de qualquer IP — necessário para o Render conseguir conectar).
5. Em **Database > Connect > Drivers**, copie a *connection string*, algo como:
   ```
   mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Adicione o nome do banco antes do `?`, por exemplo:
   ```
   mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/gestao-extintores?retryWrites=true&w=majority
   ```
   Essa é a URL que você vai usar na variável `MONGODB_URI`.

## 3. Deploy no Render (servidor em nuvem)

### Opção A — Deploy automático via Blueprint (`render.yaml`)

1. Acesse https://render.com e faça login (pode usar sua conta do GitHub).
2. Clique em **New > Blueprint**.
3. Selecione o repositório que você acabou de subir para o GitHub.
4. O Render vai detectar o arquivo `render.yaml` na raiz e configurar o serviço
   automaticamente (`rootDir: backend`, build e start commands).
5. Quando pedir a variável `MONGODB_URI`, cole a connection string do MongoDB Atlas
   (passo anterior).
6. Clique em **Apply** — o Render vai instalar as dependências e iniciar o servidor.

### Opção B — Deploy manual (Web Service)

1. No Render, clique em **New > Web Service**.
2. Conecte o repositório do GitHub.
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Em **Environment Variables**, adicione:
   - `MONGODB_URI` = a connection string do MongoDB Atlas
5. Clique em **Create Web Service**.

Após o deploy, o Render fornece uma URL pública, por exemplo:
`https://gestao-extintores.onrender.com`

Abra essa URL no navegador — o próprio servidor Express já serve o frontend
(`backend/public/index.html`) e a API, tudo junto, sem necessidade de configurar CORS
entre domínios diferentes.

> **Nota sobre o plano gratuito do Render:** serviços gratuitos "dormem" após um
> período de inatividade e podem levar alguns segundos para responder na primeira
> requisição após ficarem inativos. Isso é normal e não indica erro.

## 4. Rodar localmente (opcional, para desenvolvimento/testes)

```bash
cd backend
cp .env.example .env
# edite o .env e cole sua MONGODB_URI do Atlas (ou de um MongoDB local)
npm install
npm start
```

Acesse `http://localhost:3000` no navegador.

---

## Tecnologias utilizadas

- **Frontend**: HTML, CSS e JavaScript puro (Chart.js para os gráficos do dashboard)
- **Backend**: Node.js + Express
- **Banco de dados**: MongoDB (Mongoose como ODM)
- **Hospedagem**: Render (servidor) + MongoDB Atlas (banco de dados em nuvem)
