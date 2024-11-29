# Plano de Teste

Este documento apresenta o plano de testes para a aplicação da API Cinema.

## Objetivos dos Testes
- Validar a funcionalidade da API.
- Garantir a segurança dos endpoints com a autenticação necessária.
- Verificar a performance da API.

## Ambiente de Testes
- Servidor local: http://localhost:3000/api/docs
- Versão 1.0
- Ferramentas: Postman, Newman, Jenkins e Playwright

## Estratégia de Testes

A estratégia de testes será composta pelas seguintes abordagens:

### 1. Testes Manuais
- Serão feitos testes manuais no Postman.

- **Roteirizados:**
  - Seguir o plano de testes à risca.
  
- **Exploratórios:**
  - Navegar pela plataforma para identificar possíveis erros.

### 2. Testes de Carga e Performance
- Avaliar como a API se comporta com muitas requisições ao mesmo tempo.

### 3. Testes Automatizados
- Automatizar os testes para cada rota, garantindo a consistência e eficiência dos testes. Será usado Newman para automatização da collection, Jenkins para integração contínua e Playwright para os testes automatizados.

### 4. Testes Unitários
- Verificar componentes e rotas isoladamente, testando cada rota separadamente para assegurar que funcionam como esperado.

### 5. Testes de Integração
- Avaliar a interação entre diferentes componentes e os fluxos da API. Por exemplo, a relação entre o cadastro e o login, que afeta diretamente operações como listagem, atualização e remoção de produtos e gerenciamento de carrinhos.

### 6. Testes de Usabilidade
- Avaliar a facilidade de uso da API, incluindo:
  - Eficiência no tempo necessário para completar tarefas.
  - Clareza das mensagens de resposta.
  - Consistência e qualidade da documentação da API.

## Análise da API

A API Cinema é uma API REST gratuita que simula um sistema de cinema. Os testes englobam as rotas de **movies** e **tickets**.

- **/movies:** 
  - Criar, atualizar, listar e excluir filmes.
  <img src= "../img/mapausuarios.png">

- **/tickets:** 
  - Criar, atualizar, listar e excluir tickets de entrada para os filmes.
  <img src= "../img/mapacarrinhos.png">

## User Stories

Cada rota contém uma história de usuário, com o objetivo de descrever a funcionalidade que o usuário final deseja.

### US001: [API] Gerenciamento de Filmes

Ator: Qualquer usuário da API de Filmes (para consulta) e Usuário administrador da API de Filmes (para criação, atualização e exclusão)

#### Requisitos Funcionais:

1. Criando um Novo Filme:
- O usuário administrador da API envia uma solicitação POST para o endpoint /movies com os detalhes do filme.
- O sistema valida os campos obrigatórios e a unicidade do título.
- Se as validações passarem, o sistema cria o filme e atribui um ID único.
- O sistema retorna uma resposta de sucesso com o status 201 Created, incluindo o ID do filme.
2. Obtendo a Lista de Filmes:
- O usuário envia uma solicitação GET para o endpoint /movies.
- O sistema retorna uma lista de todos os filmes cadastrados com detalhes.
3. Obtendo Detalhes de um Filme por ID:
- O usuário envia uma solicitação GET para o endpoint /movies/{id}, onde {id} é o ID do filme desejado.
- O sistema verifica a existência do filme e retorna seus detalhes.
- Se o filme não existir, o sistema retorna uma resposta de erro com o status 404 Not Found.
4. Atualizando os Detalhes de um Filme por ID:
- O usuário administrador da API envia uma solicitação PUT para o endpoint /movies/{id}, onde {id} é o ID do filme a ser atualizado.
- O sistema verifica a existência do filme, permite a atualização de campos específicos e valida os dados.
- Se todas as validações passarem, o sistema atualiza os detalhes do filme.
- O sistema retorna uma resposta de sucesso com o status 200 OK e os detalhes atualizados do filme.
5. Excluindo um Filme por ID:
- O usuário administrador da API envia uma solicitação DELETE para o endpoint /movies/{id}, onde {id} é o ID do filme a ser excluído.
- O sistema verifica a existência do filme e o remove permanentemente do banco de dados.
- O sistema retorna uma resposta de sucesso com o status 204 No Content.

#### Requisitos Não Funcionais de Performance:

- A API deve ser capaz de processar pelo menos 100 solicitações de criação de filmes por segundo.
- O tempo médio de resposta para a criação de um novo filme não deve exceder 200 milissegundos.
- A API deve ser capaz de responder a solicitações GET de listagem de filmes em menos de 100 milissegundos.
- A lista de filmes deve ser paginada, com no máximo 20 filmes por página.
- A API deve ser capaz de responder a solicitações GET de detalhes de um filme em menos de 50 milissegundos.
- A API deve ser capaz de processar pelo menos 50 solicitações de atualização de filmes por segundo.
- O tempo médio de resposta para a atualização dos detalhes de um filme não deve exceder 300 milissegundos.
- A API deve ser capaz de processar pelo menos 30 solicitações de exclusão de filmes por segundo.
- O tempo médio de resposta para a exclusão de um filme não deve exceder 400 milissegundos.

### US002: [API] Reservando ingressos

Ator: Qualquer usuário da API de Ingressos

Cenário: O usuário deseja reservar ingressos para assistir a um filme em um cinema.

#### Requisitos Funcionais:

- O usuário envia uma solicitação POST para o endpoint /tickets com os seguintes detalhes do ingresso:
- ID do Filme (movieId) - Identifica o filme para o qual o ingresso está sendo reservado.
- ID do Usuário (userId) - Identifica o usuário que está fazendo a reserva.
- Número do Assento (seatNumber) - O número do assento que o usuário deseja reservar.
- Preço do Ingresso (price) - O preço do ingresso para o filme.
- Data de Apresentação (showtime) - A data e hora da apresentação do filme.
- O sistema valida se todos os campos obrigatórios estão preenchidos corretamente.
- O sistema verifica se o número do assento está dentro do intervalo de 0 a 99.
- O sistema verifica se o preço do ingresso está dentro do intervalo de 0 a 60.
- Se todas as validações passarem, o sistema cria uma reserva de ingresso com os detalhes fornecidos.
- O sistema atribui um ID único à reserva de ingresso.
- O sistema retorna uma resposta de sucesso com o status 201 Created, incluindo o ID da reserva de ingresso.

#### Requisitos Não Funcionais de Performance:

- A API deve ser capaz de processar pelo menos 50 solicitações de reserva de ingressos por segundo.
- O tempo médio de resposta para a reserva de um ingresso não deve exceder 300 milissegundos.


## Testes da API Cinema

### Tabela de Cenários de Testes Unitários

| Rota      | Cenário                                       | Ação                       | Saída Esperada                                     |
|-----------|-----------------------------------------------|----------------------------|----------------------------------------------------|
| /tickets  | Reservar ingresso com sucesso                 | POST /tickets              | Status 201 - Ingresso reservado com sucesso        |
| /tickets  | Reservar ingresso com campos inválidos        | POST /tickets              | Status 400 - Erro de validação                    |
| /tickets  | Reservar ingresso com preço fora do intervalo | POST /tickets              | Status 400 - Erro de validação                    |
| /tickets  | Reservar ingresso com assento fora do intervalo | POST /tickets            | Status 400 - Erro de validação                    |
| /tickets  | Reservar ingresso sem informar todos os campos obrigatórios | POST /tickets | Status 400 - Erro de validação                    |
| /movies   | Criar novo filme com sucesso                  | POST /movies               | Status 201 - Filme criado com sucesso             |
| /movies   | Criar filme com título já existente           | POST /movies               | Status 400 - Erro de validação                    |
| /movies   | Listar todos os filmes                        | GET /movies                | Status 200 - Lista de filmes retornada            |
| /movies   | Buscar filme por ID existente                 | GET /movies/{id}           | Status 200 - Detalhes do filme retornados         |
| /movies   | Buscar filme por ID inexistente               | GET /movies/{id}           | Status 404 - Filme não encontrado                 |
| /movies   | Atualizar filme corretamente                  | PUT /movies/{id}           | Status 200 - Detalhes do filme atualizados        |
| /movies   | Atualizar filme com dados inválidos           | PUT /movies/{id}           | Status 400 - Erro de validação                    |
| /movies   | Excluir filme existente                       | DELETE /movies/{id}        | Status 204 - Filme removido                       |
| /movies   | Excluir filme inexistente                     | DELETE /movies/{id}        | Status 404 - Filme não encontrado                 |



### Rota Usuários

#### Cadastro de Usuário (POST)
**Objetivo:**
  - Cadastrar no sistema usuários com dados válidos.

**Cenário: Cadastro de usuário com sucesso**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de cadastro de usuário com dados válidos
Então o usuário deve ser criado com sucesso e receber status 201
```

**Cenário: Cadastro de usuário com dados inválidos**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de cadastro de usuário com dados inválidos
Então o sistema deve retornar erro e status 400
```

**Cenário: Cadastro de usuário com email repetido**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de cadastro de usuário com email repetido
Então o sistema deve retornar erro e status 400
```

**Cenário: Cadastro de usuário com provedor inválido**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de cadastro de usuário com provedor gmail ou hotmail
Então o sistema deve retornar erro e status 400
```

**Cenário: Cadastro de usuário com senha inválida**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de cadastro de usuário com senha menor que 5 ou maior que 10 caracteres
Então o sistema deve retornar erro e status 400
```

#### Listagem de Usuário (GET)
**Objetivo:**
  - Listar os usuários do sistema.

**Cenário: Listar todos os usuários**
```gherkin
Quando enviar um pedido para listar usuários
Então o sistema deve retornar todos os usuários cadastrados com status 200
```
**Cenário: Listar usuário com ID existente**
```gherkin
Dado que o ID do usuário informado existe no sistema
Quando enviar um pedido para listar este usuário por ID
Então o sistema deve retornar o usuário com o ID especificado e status 200
```
**Cenário: Listar usuário com ID inexistente**
```gherkin
Dado que o ID do usuário informado não existe no sistema
Quando enviar um pedido para listar este usuário por ID
Então o sistema deve retornar erro e status 400
```

#### Atualização de Usuário (PUT)
**Objetivo:**
  - Atualizar as informações de um usuário.

**Cenário: Atualizar usuário corretamente**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de atualização com dados válidos
Então o usuário deve ser atualizado com sucesso e receber status 200
```
**Cenário: Atualizar usuário incorretamente**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de atualização com dados inválidos
Então o sistema deve retornar erro e status 403
```

#### Deletar Usuário (DELETE)
**Objetivo:**
  - Remover um usuário do sistema.

**Cenário: Deletar usuário corretamente**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido para deletar um usuário existente
Então o usuário deve ser removido com sucesso e receber status 200
```

**Cenário: Deletar usuário com carrinho existente**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido para deletar um usuário com carrinho existente
Então o sistema deve retornar erro e status 400
```

### Rota Login 

Nesta suíte de testes, o foco será logar e autenticar os usuários previamente cadastrados. Primeiramente, é necessário acessar https://compassuol.serverest.dev/ para a realização dos testes.

#### Login de usuários (POST)

**Objetivo:**
  - Entrar no sistema usando usuários com e-mail e senha válidos.

**Cenário: Login de usuário com cadastro válido**
```gherkin
Dado que o usuário está cadastrado corretamente no sistema
Quando enviar um pedido de login de usuário com dados válidos
Então o usuário deve ser autenticado com sucesso e receber status 200, com bearer token válido por 10 minutos
```

**Cenário: Login de usuário com credenciais inválidas**
```gherkin
Quando enviar um pedido de login com credenciais inválidas
Então o sistema deve retornar erro e status 401
```
### Rota Produtos

Nesta suíte de testes, o foco será criar, listar, atualizar e deletar produtos, usando um usuário cadastrado e autenticado. Primeiramente, é necessário acessar https://compassuol.serverest.dev/ para a realização dos testes.

#### Cadastro de Produtos (POST)
**Objetivo:**
  - Com um usuário cadastrado e autenticado, cadastrar produtos no sistema.

**Cenário: Cadastro de produto com sucesso**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de cadastro de produto com dados válidos
Então o produto deve ser criado com sucesso e receber status 201
```
**Cenário: Cadastro de um novo produto com dados inválidos**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de cadastro de produto com dados inválidos
Então o sistema deve retornar erro e status 400
```

#### Listagem de Produtos (GET)
- **Objetivo:**
  - Listar os produtos do sistema.

**Cenário: Listar todos os produtos**
```gherkin
Quando enviar um pedido para listar produtos
Então o sistema deve retornar todos os produtos cadastrados com status 200
```

**Cenário: Listar produto com ID existente**
```gherkin
Quando enviar um pedido para buscar um produto com ID existente
Então o sistema deve retornar o produto com status 200
```

**Cenário: Listar produto com ID inexistente**
```gherkin
Quando enviar um pedido para buscar um produto com ID inexistente
Então o sistema deve retornar erro e status 400
```

#### Atualização de Produto (PUT)
**Objetivo:**
  - Atualizar as informações de um produto.

**Cenário: Atualizar produto corretamente**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de atualização com dados válidos
Então o produto deve ser atualizado com sucesso e receber status 200
```

**Cenário: Atualizar produto incorretamente**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de atualização com dados inválidos
Então o sistema deve retornar erro e status 400
```

#### Deletar Produto (DELETE)
**Objetivo:**
  - Remover um produto da aplicação.

**Cenário: Deletar produto corretamente**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido para deletar um produto existente
Então o produto deve ser removido com sucesso e receber status 200
```

**Cenário: Deletar produto dentro de carrinho**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido para deletar um produto existente em um carrinho
Então o sistema deve retornar erro e status 400
```

**Cenário: Deletar produto com usuário não autenticado**
```gherkin
Dado que o usuário não está autenticado como administrador
Quando enviar um pedido para deletar um produto
Então o sistema deve retornar erro e status 401
```

### Rota Carrinhos

Nesta suíte de testes, o foco será criar, listar e deletar carrinhos, usando um usuário cadastrado e autenticado. Primeiramente, é necessário acessar https://compassuol.serverest.dev/ para a realização dos testes.

#### Listagem de Carrinhos (GET)
**Objetivo:**
  - Listar os carrinhos do sistema.

**Cenário: Listar todos os carrinhos**
```gherkin
Quando enviar um pedido para listar carrinhos
Então o sistema deve retornar todos os carrinhos cadastrados com status 200
```

**Cenário: Listar um carrinho por ID**
```gherkin
Quando enviar um pedido para listar um carrinho com ID válido
Então o sistema deve retornar o carrinho cadastrado com status 200
```

**Cenário: Listar um carrinho não existente**
```gherkin
Quando enviar um pedido para listar um carrinho com ID inválido
Então o sistema deve retornar erro e status 400
```

#### Cadastro de Carrinhos (POST)
**Objetivo:**
  - Com um usuário cadastrado e autenticado, cadastrar carrinhos no sistema.

**Cenário: Cadastrar carrinho corretamente**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de cadastro de carrinho com dados válidos
Então o carrinho deve ser adicionado com sucesso e status 200
```

**Cenário: Cadastrar carrinho com dados inválidos**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido de cadastro de carrinho com dados inválidos
Então o sistema deve retornar erro e status 400
```

#### Remoção de Carrinhos (DELETE)
**Objetivo:**
  - Remover um carrinho da aplicação, seja por concluir a venda ou por cancelar a venda.

**Cenário: Deletar carrinho concluindo compra**
```gherkin
Dado que o usuário está autenticado
Quando enviar um pedido para deletar um carrinho existente
Então o carrinho deve ser removido com sucesso e receber status 200
```
**Cenário: Deletar carrinho cancelando compra**
```gherkin
Dado que o usuário está autenticado
Quando enviar um pedido para deletar um carrinho não existente
Então deve retornar nenhum registro excluído e receber status 200
```
### Testes de fluxos
![alt text](image.png)
**Fluxo: Compra com sucesso com usuário administrador**
```gherkin
Dado que o usuário está autenticado e é administrador
Quando enviar uma requisição para cadastrar carrinho e concluir compra
Então deve retornar compra concluída e receber status 200
```
**Fluxo: Compra com sucesso com usuário não administrador**
```gherkin
Dado que o usuário está autenticado e não é administrador
Quando enviar uma requisição para cadastrar carrinho e concluir compra
Então deve retornar compra concluída e receber status 200
```
**Fluxo: Compra sem sucesso de usuário não logado**
```gherkin
Dado que o usuário não está autenticado
Quando enviar uma requisição para cadastrar carrinho e concluir compra
Então deve retornar mensagem de erro e receber status 401
```
**Fluxo: Compra sem sucesso com carrinho não existente**
```gherkin
Dado que o usuário está autenticado
Quando enviar uma requisição para cadastrar carrinho e concluir compra
Então deve retornar mensagem de erro e receber status 401
```
**Fluxo: Compra sem sucesso com produto não existente**
```gherkin
Dado que o usuário está autenticado
Quando enviar uma requisição para cadastrar carrinho e concluir compra
Então deve retornar mensagem de erro e receber status 401
```
**Fluxo: Compra sem sucesso com usuário inválido(sem email/sem senha)**
```gherkin
Dado que o usuário é inválido
Quando enviar uma requisição para cadastrar carrinho e concluir compra
Então deve retornar mensagem de erro e receber status 401
```
**Fluxo: Compra sem sucesso com usuário de provedor de e-mail inválido**
```gherkin
Dado que o usuário tem provedor de email gmail ou hotmail
Quando enviar uma requisição para cadastrar carrinho e concluir compra
Então deve retornar mensagem de erro e receber status 401
```

## Relatório de Testes

Os testes serão documentados em quadro no Jira, além de conter evidências nos relatórios gerados pelo Gitlab Pipelines integrado com Newman. Disponíveis em: https://marcoadiasf.atlassian.net/jira/software/projects/TES/boards/68 e https://gitlab.com/marcoadiasfelipi/pb_sprints/-/pipelines/1499076031/builds.

