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
- tipos de admin: admin_master, admin_type
- Só admins podem criar parceiros e clientes

> '/clients/:id/card'
##### GET: Retorna para o cliente sua imagem qrcode

> '/admin'
##### POST: Cria subs admin (
  Só pode criar outro admin se for um admin do tipo admin_master
)

> '/admin/users'
##### GET: Lista a quantidade de todos usuários (partners e clients) do sistema

> '/admin/status-users'
##### GET: Lista o status dos clientes, ativos e inativos

> '/partners'
##### POST: Cria parceiros com campos obrigatórios (
    email,
    password_entry,
    name,
    company_name,
    rg,
    cpf,
    cnpj,
)

##### GET: Lista todos parceiros

##### PUT: Atualiza parceiro (
    não é obrigatório atualizar todos os campos,
    se o campo old_password for preenchido os campos
    password_entry e confirm_password devem ser preenchidos
    para atualizar a senha.
)

> '/partners-session'
##### POST: Seção dos parceiros (
    email,
    password_entry,
)

> '/partners/data'
##### GET: Lista dados de um parceiro especifico através do name, company_name ou cnpj (
  Só admin pode listar
)

> '/clients'
##### POST: Cria clientes com campos obrigatórios (
    email,
    firstname,
    lastname,
    rg,
    cpf,
)

##### GET: Lista todos clientes

##### PUT: Atualiza cliente (
    não é obrigatório atualizar todos os campos
    (code não pode ser atualizado pelo cliente)
)

> '/clients-session'
##### POST: Seção dos clientes (
    code,
)

> '/clients/data'
##### GET: Lista dados de um cliente especifico através do firstname ou code (
  qualquer usuário, menos os do tipo cliente, pode listar
)
