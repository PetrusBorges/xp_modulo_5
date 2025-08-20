# API de Gerenciamento de Usuários com PostgreSQL e Fastify

Este guia explica como configurar um banco de dados PostgreSQL usando Docker e fornece exemplos para interagir com uma API Fastify que gerencia dados de usuários via Prisma ORM.

## Pré-requisitos

- Docker instalado no seu sistema
- Node.js e npm instalados
- Conhecimento básico de APIs REST e clientes HTTP (ex.: cURL, Postman)

## Configurando o PostgreSQL com Docker

Para executar um banco de dados PostgreSQL em um contêiner Docker, use o seguinte comando:

```bash
docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```

### Explicação do Comando
- `--name pg`: Nomeia o contêiner como "pg" para fácil referência.
- `-e POSTGRES_USER=root`: Define o superusuário do PostgreSQL como "root".
- `-e POSTGRES_PASSWORD=root`: Define a senha do usuário "root" como "root".
- `-p 5432:5432`: Mapeia a porta 5432 do host para a porta 5432 do contêiner (porta padrão do PostgreSQL).
- `-d`: Executa o contêiner em modo desanexado (em segundo plano).
- `postgres`: Usa a imagem oficial do PostgreSQL do Docker.

### Verificando o Contêiner
Para confirmar que o contêiner está em execução, use:
```bash
docker ps
```
Você verá um contêiner chamado "pg" com o status "Up".

### Rodando a Aplicação
Instale as dependências da aplicação com:
```bash
yarn
```

em seguida, use:

```bash
yarn dev
```
Você verá um log no terminar chamando "Server is running on http://localhost:3009".

## Rotas da API e Exemplos

A API é construída com Fastify e Prisma, interagindo com o banco de dados PostgreSQL. Abaixo estão as rotas disponíveis com exemplos de requisições usando cURL. Substitua `<API_BASE_URL>` pelo URL base do seu servidor (ex.: `http://localhost:3009`).

### 1. Criar um Usuário
**Rota**: `POST /create`
**Descrição**: Cria um novo usuário com nome, email e idade.
**Corpo**:
```json
{
  "name": "string",
  "email": "string",
  "age": número
}
```
**Resposta**:
```json
{
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "age": 30,
    "isActive": true
  }
}
```

### 2. Atualizar um Usuário
**Rota**: `PUT /:id`
**Descrição**: Atualiza um usuário pelo ID com campos opcionais (nome, email, idade, isActive).
**Corpo**:
```json
{
  "name": "string",
  "email": "string",
  "age": número,
  "isActive": booleano
}
```
**Resposta**:
```json
{
  "user": {
    "id": "uuid",
    "name": "João Souza",
    "email": "joao.souza@exemplo.com",
    "age": 31,
    "isActive": false
  }
}
```

### 3. Deletar um Usuário
**Rota**: `DELETE /:id`
**Descrição**: Deleta um usuário pelo ID.
**Resposta**:
```json
{
  "user": {
    "id": "uuid",
    "name": "João Souza",
    "email": "joao.souza@exemplo.com",
    "age": 31,
    "isActive": false
  }
}
```

### 4. Listar Todos os Usuários
**Rota**: `GET /`
**Descrição**: Retorna uma lista de todos os usuários.
**Resposta**:
```json
{
  "users": [
    {
      "id": "uuid1",
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "age": 30,
      "isActive": true
    },
    {
      "id": "uuid2",
      "name": "Maria Silva",
      "email": "maria@exemplo.com",
      "age": 25,
      "isActive": true
    }
  ]
}
```

### 5. Contar Usuários
**Rota**: `GET /count`
**Descrição**: Retorna o número total de usuários.
**Resposta**:
```json
{
  "users": 2
}
```

### 6. Buscar Usuário por ID
**Rota**: `GET /id/:id`
**Descrição**: Retorna um usuário pelo ID.
**Resposta**:
```json
{
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "age": 30,
    "isActive": true
  }
}
```

### 7. Buscar Usuário por Nome
**Rota**: `GET /name/:name`
**Descrição**: Retorna o primeiro usuário que corresponde ao nome fornecido.
**Resposta**:
```json
{
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "age": 30,
    "isActive": true
  }
}
```

## Observações
- Certifique-se de que o arquivo .env está configurado para se conectar ao banco de dados PostgreSQL usando o Prisma ORM com a string de conexão: `postgresql://root:root@localhost:5432/xp_modulo_5?schema=public`.
- A API assume um esquema Prisma com um modelo `User` contendo os campos: `id` (UUID), `name` (string), `email` (string), `age` (inteiro) e `isActive` (booleano).

## Parando o Contêiner PostgreSQL
Para parar o contêiner:
```bash
docker stop pg
```
Para remover o contêiner:
```bash
docker rm pg
```
