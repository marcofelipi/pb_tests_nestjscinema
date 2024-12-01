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
| /tickets  | Listar todos os ingressos reservados          | GET /tickets               | Status 200 - Lista de ingressos retornada         |
| /tickets  | Buscar ingresso por ID existente              | GET /tickets/{id}          | Status 200 - Detalhes do ingresso retornados      |
| /tickets  | Buscar ingresso por ID inexistente            | GET /tickets/{id}          | Status 404 - Ingresso não encontrado              |
| /tickets  | Atualizar ingresso com sucesso                | PUT /tickets/{id}          | Status 200 - Ingresso atualizado com sucesso      |
| /tickets  | Atualizar ingresso com dados inválidos        | PUT /tickets/{id}          | Status 400 - Erro de validação                    |
| /tickets  | Excluir ingresso existente                    | DELETE /tickets/{id}       | Status 204 - Ingresso removido                    |
| /tickets  | Excluir ingresso inexistente                  | DELETE /tickets/{id}       | Status 404 - Ingresso não encontrado              |
| /movies   | Criar novo filme com sucesso                  | POST /movies               | Status 201 - Filme criado com sucesso             |
| /movies   | Criar filme com título já existente           | POST /movies               | Status 400 - Erro de validação                    |
| /movies   | Listar todos os filmes                        | GET /movies                | Status 200 - Lista de filmes retornada            |
| /movies   | Buscar filme por ID existente                 | GET /movies/{id}           | Status 200 - Detalhes do filme retornados         |
| /movies   | Buscar filme por ID inexistente               | GET /movies/{id}           | Status 404 - Filme não encontrado                 |
| /movies   | Atualizar filme corretamente                  | PUT /movies/{id}           | Status 200 - Detalhes do filme atualizados        |
| /movies   | Atualizar filme com dados inválidos           | PUT /movies/{id}           | Status 400 - Erro de validação                    |
| /movies   | Excluir filme existente                       | DELETE /movies/{id}        | Status 204 - Filme removido                       |
| /movies   | Excluir filme inexistente                     | DELETE /movies/{id}        | Status 404 - Filme não encontrado                 |


### Rota Movies

Nesta suíte de testes, o foco será criar, listar, atualizar e deletar filmes na API.

![Mapa mental da rota Movies](/img/mapa_movies.png)

#### Cadastro de filmes (POST)
**Objetivo:**
  - Cadastrar no sistema filmes com dados válidos.

**Cenário: Criar novo filme com sucesso**
```gherkin
Dado que o usuário está autenticado
Quando enviar um pedido de cadastro de usuário com dados válidos
Então o usuário deve ser criado com sucesso e receber status 201
```

**Cenário: Criar filme com título já existente**
```gherkin
Dado que o usuário está autenticado
Quando enviar um pedido de cadastro de filme com título repetido
Então o sistema deve retornar erro e status 400
```

**Cenário: Criar filme com dados inválidos**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição POST para a rota de filmes com dados inválidos  
Então o sistema deve retornar um erro e status 400  
```

#### Listagem de Filme (GET)
**Objetivo:**
  - Listar os filmes do sistema.

**Cenário: Listar todos os filmes**
```gherkin
Quando enviar uma requisição GET para a rota de filmes  
Então o sistema deve retornar todos os filmes cadastrados com status 200  
```

**Cenário: Listar filme com ID existente**
```gherkin
Dado que o ID do filme informado existe no sistema  
Quando enviar uma requisição GET para a rota de filmes com este ID  
Então o sistema deve retornar o filme correspondente com status 200  
```

**Cenário: Listar filme com ID inexistente**
```gherkin
Dado que o ID do filme informado não existe no sistema
Quando enviar um pedido para listar este filme por ID
Então o sistema deve retornar erro e status 400
```

#### Atualização de Filmes (PUT)
**Objetivo:**
  - Atualizar as informações de um filme.

**Cenário: Atualizar filme corretamente**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição PUT para a rota de filmes com dados válidos  
Então o sistema deve atualizar o filme e retornar status 200  
```
**Cenário: Atualizar filme com dados inválidos**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição PUT para a rota de filmes com dados inválidos  
Então o sistema deve retornar um erro e status 400  
```

#### Deletar Filme (DELETE)
**Objetivo:**
  - Remover um filme do sistema.

**Cenário: Deletar filme corretamente**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido para deletar um filme existente
Então o filme deve ser removido com sucesso e receber status 200
```

**Cenário: Deletar usuário com ID inexistente**
```gherkin
Dado que o usuário está autenticado como administrador
Quando enviar um pedido para deletar um filme com ID inexistente
Então o sistema deve retornar erro e status 400
```

### Rota Tickets

Nesta suíte de testes, o foco será criar, listar, atualizar e deletar tickets na API.

![Mapa mental da rota Tickets](/img/mapa_tickets.png)

#### Cadastro de Tickets (POST)

**Objetivo:**
  - Cadastrar novos tickets no sistema.

**Cenário: Reservar ingresso com sucesso**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição POST para a rota /tickets com dados válidos  
Então o sistema deve reservar o ingresso e retornar status 201  
```

**Cenário: Reservar ingresso com campos inválidos**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição POST para a rota /tickets com campos inválidos  
Então o sistema deve retornar um erro de validação com status 400  
```

**Cenário: Cenário: Reservar ingresso com preço fora do intervalo**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição POST para a rota /tickets com preço fora do intervalo permitido  
Então o sistema deve retornar um erro de validação com status 400  
```

**Cenário: Reservar ingresso com assento fora do intervalo**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição POST para a rota /tickets com assento fora do intervalo permitido  
Então o sistema deve retornar um erro de validação com status 400  
```

**Cenário: Reservar ingresso sem informar todos os campos obrigatórios**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição POST para a rota /tickets sem todos os campos obrigatórios  
Então o sistema deve retornar um erro de validação com status 400
```
#### Listagem de Tickets (GET)

**Objetivo:**
  - Listar os tickets existentes no sistema.

**Cenário: Listar todos os ingressos**
```gherkin
Quando enviar uma requisição GET para a rota /tickets
Então o sistema deve retornar todos os ingressos reservados com status 200  
```

**Cenário: Listar ingresso com ID válido**
```gherkin
Dado que o usuário está autenticado
E o ticket ID existe no sistema 
Quando enviar uma requisição GET para a rota /tickets
Então o sistema deve retornar o ingresso do ID com status 200
```

**Cenário: Listar ingresso com ID inválido**
```gherkin
Dado que o usuário está autenticado
E o ticket ID não existe no sistema 
Quando enviar uma requisição GET para a rota /tickets
Então o sistema deve retornar erro status 400
```
#### Atualização de Tickets (PUT)

**Objetivo:**
  - Atualizar tickets existentes no sistema.

**Cenário: Atualizar ingresso existente**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição PUT para a rota de ingressos com dados válidos  
Então o sistema deve atualizar o ingresso e retornar status 200   
```

**Cenário: Atualizar ingresso inexistente**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição PUT para a rota de ingressos com dados de um ticket inexistente  
Então deve retornar erro 400
```

**Cenário: Atualizar ingresso com dados inválidos**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição PUT para a rota de ingressos com dados inválidos  
Então o sistema deve retornar um erro e status 400  
```

#### Remoção de Tickets (DELETE)

**Objetivo:**
  - Remover um ingresso reservado do sistema.

**Cenário: Deletar ingresso existente**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição DELETE para a rota de ingressos com um ID válido  
Então o sistema deve remover o ingresso e retornar status 200  
```

**Cenário: Deletar ingresso inexistente**
```gherkin
Dado que o usuário está autenticado  
Quando enviar uma requisição DELETE para a rota de ingressos com um ID inexistente  
Então o sistema deve retornar um erro e status 404  
```
### Testes de Performance

![alt text](/img/mapa_performance.png)

### Testes de fluxos

![alt text](image.png)

**Fluxo: Cria filme e gera ticket**
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

