# Grafos1_GithubRecomendations

**Número da Lista**: X<br>
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

## Instalação 
**Linguagem**: Javascript<br>
**Framework**: ReactJS<br>

Para instalar o projeto basta utilizar Docker.

```sh
docker compose up --build
```

## Uso 

Para utilizar o projeto basta utilizar Docker.
Execute o container:

```sh
    docker compose up
```

Acesse o endereço `localhost:8000` no seu navegador.

Realize login com sua conta do Github.

E veja as recomendações de seguidores.

## Outros 
Quaisquer outras informações sobre seu projeto podem ser descritas abaixo.




