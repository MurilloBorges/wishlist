# wishlist

Eu como cliente quero poder visualizar a minha lista de produtos favoritos, podendo remover ou adicionar um produto a lista de favoritos.

# Documentação dos endpoints

> [Documentação da API](https://documenter.getpostman.com/view/10879200/TzshHkH5 'Clique aqui para ver a documentação!')

# Requisitos para a execução do projeto

- Ter o NodeJS instalado de preferência a última versão ou superior a v12.16.1;

  > [Instalando o Node](https://nodejs.org/pt-br/download/package-manager/ 'Clique aqui para aprender a instalar o Node!')

- Ter o gerenciador de dependências yarn instalado (npm também funciona, porém recomendo fortemente o yarn)
  > [Instalando o yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable 'Clique aqui para aprender a instalar o yarn!')

# Executando o projeto

> Criar o arquivo .env e copiar as variáveis do .env.example

- Executando por yarn

  > yarn install

  > yarn dev

- Executando por node

  > yarn install

  > yarn build

  > node ./dist/server.js

- Executando por docker

  > Adicionar as variáveis de ambiente no dockerfile ou de outra forma como preferir

  > docker build -t wishlist . --no-cache

  > docker run -d wishlist

  > para visualizar os logs do container, execute:

  > docker ps -a -> irá listar os containers, pegue o id do container que roda a imagem wishlist

  > docker logs {idcontainer} -> irá listar o log
