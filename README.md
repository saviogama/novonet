# novonet

# Execução

1. Rode 'yarn' para instalar as dependências
2. Crie um banco de dados local
  - docker run --name=database -e POSTGRES_PASSWORD=workana -p 5432:5432 -d postgres
  - use uma interface de banco de dados (exemplo: Postbird)
  - use a senha 'workana' para acessar a interface
  - crie uma tabela 'novonet'
3. Rode 'yarn sequelize db:migrate' para criar as tabelas no banco
4. Rode 'yarn dev' para rodas o server

# Documentação Rotas

### Observação:
- tipos de admin: admin_type
- Só admins podem criar parceiros e clientes

> '/access-admin'
##### POST: Cria admin 

> '/access-admin-session'
##### POST: Sessão admins

> '/admin/users'
### so admin
##### GET: Lista a quantidade de todos usuários (partners e clients) do sistema

> '/admin/status-users'
### so admin
##### GET: Lista o status dos clientes, ativos e inativos

> '/partners'
### so admin
##### GET: Lista todos parceiros

> '/clients'
### so admin
##### GET: Lista todos clients

> '/partners'
### so admin
##### POST: Cria parceiros com campos obrigatórios (
    email,
    password_entry,
    name,
    company_name,
    rg,
    cpf,
    cnpj,
)

> '/clients'
### so admin
##### POST: Cria clientes com campos obrigatórios (
    email,
    firstname,
    lastname,
    rg,
    cpf,
)

> '/partners/:id'
### so admin
##### PUT: Atualiza parceiro (
    não é obrigatório atualizar todos os campos,
    se o campo old_password for preenchido os campos
    password_entry e confirm_password devem ser preenchidos
    para atualizar a senha.
)

> '/partners/:id'
### so admin
##### DELETE: Deleta parceiro

> '/partners-session'
##### POST: Seção dos parceiros (
    email,
    password_entry,
)

> '/clients/:id'
### so admin
##### PUT: Atualiza cliente (
    não é obrigatório atualizar todos os campos
    (code não pode ser atualizado pelo cliente)
)

> '/clients/:id'
### so admin
##### DELETE: Deleta cliente

> '/clients-session'
##### POST: Seção dos clientes (
    code
)

> '/clients/data'
### so partners
##### GET: Lista dados de um cliente especifico através do code

> '/clients/:id/card'
### so clients
##### GET: Retorna para o cliente sua imagem qrcode

> '/partners/:id'
###### GET: Retorna para partner, através do id do body, seus dados

> '/clients/:id'
###### GET: Retorna para client, através do id do body, seus dados