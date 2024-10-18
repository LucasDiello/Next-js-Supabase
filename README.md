# Projeto em desenvolvimento - Restaurador de Imagem

Estou desenvolvendo uma aplicação de restaurar imagem utilizando Next.js. Este projeto visa criar uma plataforma onde o usuário pode transformar sua foto comum em algo futurístico utilizando uma api de inteligência artificial, e supabase para manipulação dos dados.

![GitHub last commit](https://img.shields.io/github/last-commit/LucasDiello/Next-js-Supabase)

## Preview:

<div class=display:grid>
  <img src="/public/replicate1.png" alt="Imagem 1" width=400  />
  <img src="/public/replicate2.png" alt="Imagem 1" width=400  />
  <img src="/public/replicate3.png" alt="Imagem 1" width=400  />
  <img src="/public/replicate4.png" alt="Imagem 1" width=400  />
</div>

## Tecnologias e Bibliotecas

## Tecnologias Utilizadas

![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#)

[![Static Badge](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff)](#)
![Static Badge](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)
![Static Badge](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)
[![Static Badge](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)](#)

- Frontend:
  - Next.js - Framework React para renderização do lado do servidor.
  - TypeScript - Para adição de tipos estáticos ao JavaScript.
  - React - Biblioteca JavaScript para construção de interfaces de usuário.
  - Tailwind CSS - Framework de CSS para estilização rápida e responsiva.
  - Shadcn/ui - Biblioteca com componentes prontos para 

- Backend:
  - Supabase - Plataforma open-source que oferece uma variedade de serviços que fornece banco de dados PostgreSQL e autenticação integrada.

- Implantação:
  - Vercel - Plataforma de hospedagem para implantação contínua de aplicativos.

## Pré-requisitos

Antes de começar, você precisará criar uma conta no Supabase para obter as credenciais necessárias:

1. Criar uma Conta no Supabase:
   - Acesse Supabase (https://supabase.io/) e crie uma conta.
   - Crie um novo projeto no dashboard do Supabase.
   - No seu projeto, vá para Settings > API.
   - Copie o URL da API e a Chave Pública do API.

2. Configurar Variáveis de Ambiente:
   - Crie o arquivo .env
   - Configure as variáveis de ambiente no arquivo .env com as informações do Supabase:

     ```
     
     NEXT_PUBLIC_SUPABASE_URL=seu_url_do_supabase_aqui
     NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica_do_supabase_aqui
     NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER = sua pasta do storage
     NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_RESTORED = sua pasta restored do storage
     NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_PROCESSING = sua pasta processing do storage
     NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_FAVORITES = sua pasta favorites do storage
     NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_COLLECTIONS = sua pasta collections do storage
     
     ```

   - Assegure-se de substituir seu_url_do_supabase_aqui pelo URL da API do seu projeto Supabase e sua_chave_publica_do_supabase_aqui pela chave pública fornecida pelo Supabase.

## Guia para inicializar!

Para começar a utilizar o projeto, siga os passos abaixo:

### Clonando o repositório

```bash
git clone git@github.com:LucasDiello/Next-js-Supabase.git
```


### Entre na pasta do projeto e instale os pacotes:

```bash
npm install
```

### Inicialize a aplicação:

```bash
npm run dev
```
