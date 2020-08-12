# Execução

1. Rode 'yarn' para instalar as dependências
2. Crie um banco de dados local
  - docker run --name <name> -e POSTGRES_PASSWORD=<password> -p 5432:5432 -d postgres
3. Rode 'yarn sequelize db:migrate' para criar as tabelas no banco
4. Rode 'yarn dev' para rodas o server

# Documentação Rotas

##### Observação
- ainda não gera nem verifica o código do cliente
- ainda não filtra cliente por parâmetros (verificar se o frontend pode fazer essa tarefa)

> '/partners'
- POST: Cria parceiros com campos obrigatórios (
    email,
    password_entry,
    name,
    company_name,
    rg,
    cpf,
    cnpj,
)

- GET: Lista todos parceiros

- PUT: Atualiza parceiro (
    não é obrigatório atualizar todos os campos,
    se o campo old_password for preenchido os campos
    password_entry e confirm_password devem ser preenchidos
    para atualizar a senha.
)

> '/partners-session'
- POST: Seção dos parceiros (
    email,
    password_entry,
)

> '/clients'
- POST: Cria clientes com campos obrigatórios (
    email,
    firstname,
    lastname,
    rg,
    cpf,
)

- GET: Lista todos clientes

- PUT: Atualiza cliente (
    não é obrigatório atualizar todos os campos,
    se o campo old_password for preenchido os campos
    password_entry e confirm_password devem ser preenchidos
    para atualizar a senha.
)

> '/clients-session'
- POST: Seção dos clientes (
    code,
)
