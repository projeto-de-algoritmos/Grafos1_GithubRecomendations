# Grafos1_GithubRecomendations

**Número da Lista**: 50<br>
**Conteúdo da Disciplina**: Grafos1<br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 18/0016563  |  Filipe Santana Machado |
| 18/0014412  |  Cainã Valença de Freitas |

## Sobre 
Single-page-application para recomendação de seguidores no Github.

O grafo de follows do github está em estrutura de lista de adjacência
de forme que cada usuário possui uma lista de amigos.

A recomendação é feita através do algoritmo que atribui uma pontuação baseada na
proximidade do usuário com os amigos de seus amigos.

Toda a lógica do algoritmo está em `server/server.js`, os dados são enviados prontos para o frontend.

## Screenshots
![image](https://user-images.githubusercontent.com/40258400/231008800-fc143435-c8f4-48b4-aa91-4b56fbf6c8c5.png)
![image](https://user-images.githubusercontent.com/40258400/235567101-5e4c3201-4012-49fa-a335-239d4bc46974.png)
<img width="1512" alt="Screenshot 2023-05-01 at 23 34 21" src="https://user-images.githubusercontent.com/40258400/235567369-4c63769c-b1fe-413c-9005-e3f4eae99f0a.png">



## Instalação 
**Linguagem**: Javascript<br>
**Framework**: ReactJS<br>

É necessário que exista um arquivo .env na raíz do repositório com as chaves da API do github

[Neste tutorial](https://codevoweb.com/github-oauth-authentication-react-and-node/) existem instruções de como obter as chaves.

```
VITE_GITGUB_CLIENT_ID=xxxxxxxxxxxxx
VITE_GITHUB_SECRET=xxxxxxxxxxxxx
GITGUB_CLIENT_ID=xxxxxxxxxxxxx
GITHUB_SECRET=xxxxxxxxxxxxx
```

Para instalar o projeto basta utilizar Docker.

```sh
docker compose up --build
```

> Nem sempre a instalação do `vite` irá funcionar, caso dê erro, uma possibilidade de workaround é instalar localmente os pacotes sem usar docker e depois inicializar o container.

## Uso 

Para utilizar o projeto basta utilizar Docker.
Execute o container:

```sh
docker compose up
```

Acesse o endereço `localhost:5173` no seu navegador.

Realize login com sua conta do Github.

E veja as recomendações de seguidores.

> Após realizar o login, a página irá carregar os dados do grafo, isso pode levar alguns segundos...

> Foi printado no console os objetos do grafo, caso queira analisar de perto...

## Video

https://github.com/projeto-de-algoritmos/Grafos1_GithubRecomendations/assets/49414401/0ba0dc91-59aa-442f-8387-cb8f70b46141
