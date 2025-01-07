# <img src="docs/PadroesDeProjeto/image/HostHub.png" alt="HostHub" width="60px" style="vertical-align: middle;"> HostHub

**Código da Disciplina**: FGA0208<br>
**Número do Grupo**: 08<br>
**Entrega**: 03<br>

## Alunos

|Matrícula | Aluno |
| -- | -- |
| 211061350  | Alexandre de Santana Beck           |
| 180098080  | Arthur Carneiro Trindade            |
| 200054333  | Arthur Gabriel Lima Gomes           |
| 200015753  | Caio Berg Carlos Leite              |
| 202063201  | Ester Flores Lino da Silva          |
| 202023663  | Gabriel Basto Bertolazi             |
| 190087501  | Gabriel Marcolino Rodrigues         |
| 190028475  | Gabriela Tiago de Araujo            |
| 190091720  | Lucas Macedo Barboza                |
| 202023968  | Miguel Moreira da Silva de Oliveira |
| 200062620  | Pedro Augusto Dourado Izarias       |
| 211029540  | Pedro Sena Barbosa Holtz Yen        |
| 190134810  | Shaine Aparecida Cardoso de Oliveira|
| 200028154  | Thiago Ribeiro Freitas              |

## Sobre 

O projeto **HostHub** é uma iniciativa do Grupo 8 da disciplina de Arquitetura e Desenho de Software da Universidade de Brasília (UnB). Este projeto visa desenvolver uma plataforma online para a divulgação de anúncios de imóveis, facilitando a conexão entre proprietários e potenciais locatários.

O repositório do projeto está disponível no GitHub: [HostHub](https://github.com/UnBArqDsw2024-2/2024.2_G8_Aluguel_Entrega_03) . Nele, você encontrará a estrutura do projeto, incluindo diretórios para o back-end (`back`), front-end (`front`) e documentação (`docs`).

A documentação do projeto é gerada utilizando o [Docsify](https://docsify.js.org/), uma ferramenta que permite a criação de sites de documentação dinâmicos a partir de arquivos Markdown.

Para mais detalhes sobre o projeto, incluindo o código-fonte e instruções de contribuição, visite o repositório oficial: [Repoitório do HostHub](https://github.com/UnBArqDsw2024-2/2024.2_G8_Aluguel_Entrega_03)

## Screenshots da Terceira Entrega

### Tela home
![Tela home](docs/PadroesDeProjeto/image/front/home.png)

### Tela de cadastrar anúncio
![Tela de cadastrar anúncio](docs/PadroesDeProjeto/image/front/cadastrar-anuncio.png)

### Tela de cadastrar usuário
![Tela de cadastrar usuário](docs/PadroesDeProjeto/image/front/cadastro.png)

### Tela de recuperar senha
![Tela de recuperar senha](docs/PadroesDeProjeto/image/front/esqueceu-senha.png)

### Tela de login
![Tela de login](docs/PadroesDeProjeto/image/front/login.png)

### Protótipo de login
![Protótipo de login](docs/PadroesDeProjeto/image/front/prototipoLogin.png)

### Protótipo de cadastro de anúncio
![Protótipo de cadastro de anúncio](docs/PadroesDeProjeto/image/front/prototipoAnuncio.png)

### Protótipo de cadastro de usuário
![Protótipo de cadastro de usuário](docs/PadroesDeProjeto/image/front/prototipoCadastro.png)

### Protótipo de edição de perfil
![Protótipo de edição de perfil](docs/PadroesDeProjeto/image/front/prototipoEditarPerfil.png)

### Protótipo de gerência de anúncio
![Protótipo de gerência de anúncio](docs/PadroesDeProjeto/image/front/prototipoGerenciarAnuncio.png)

### Protótipo da tela home
![Protótipo da tela home](docs/PadroesDeProjeto/image/front/prototipoHome.png)

### Protótipo da tela de mudar senha
![Protótipo da tela de mudar senha](docs/PadroesDeProjeto/image/front/prototipoSenha.png)


## Há algo a ser executado?

(X) SIM

( ) NÃO

## É possível acessar o [deploy](https://front-arquitetura.vercel.app/home) ou rodar o projeto localmente:


## Configurando o Ambiente

Este projeto utiliza **PostgreSQL**, **Docker**, **TypeScript** e **Angular**. Abaixo estão as instruções detalhadas para configurar e rodar o ambiente de desenvolvimento e produção.

---

## **1. Configuração do Backend**

### **Passo 1: Clonar o Repositório**

```bash
git clone <link do repositório>
```

### **Passo 2: Configurar o arquivo `.env`**

Crie o arquivo `.env` na raiz do backend com as seguintes variáveis:

```bash
POSTGRES_PRISMA_URL="postgresql://nest_user:nest_password@localhost:5432/nest_database"
POSTGRES_URL_NON_POOLING="postgresql://nest_user:nest_password@localhost:5432/nest_database"
```

### **Passo 3: Executar o Docker Compose**

Inicie o banco de dados com Docker Compose:

```bash
docker compose up -d
```

### **Passo 4: Aplicar Migrations**

Antes de rodar o projeto, aplique as migrations do Prisma com o comando:

```bash
npx prisma migrate dev
```

### **Passo 5: Rodar o Backend**

Execute o seguinte comando para iniciar o servidor do backend:

```bash
npm run start:dev
```

---

## **2. Configuração do Frontend**

### **Passo 1: Instalar Dependências**

Navegue até o diretório do frontend e instale as dependências:

```bash
npm install
```

### **Passo 2: Rodar o Servidor de Desenvolvimento**

Para rodar o frontend localmente, execute o comando:

```bash
npm start
```

O projeto estará acessível no endereço padrão:

```bash
http://localhost:4200/
```

## Histórico de Versão

| Versão |    Data    |         Descrição          |  Autor(es)  |
| :----: | :--------: | :------------------------: | :---------: |
| `1.0`  | 06/01/2025 | Criação do documento e adição dos participantes e sobre | [Pedro Izarias](https://github.com/Izarias) |
| `1.1`  | 06/01/2025 | Incluído orientações sobre como configurar o ambiente | [Ester Lino](https://github.com/esteerlino) |
| `1.2`  | 06/01/2025 | Adição das imagens do projeto | [Pedro Izarias](https://github.com/Izarias), [Pedro Sena](https://github.com/pedroyen21) |
