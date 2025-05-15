# SGHSS - Sistema de Gestão de Saúde e Segurança (Projeto Acadêmico)

## Descrição
O SGHSS é um sistema desenvolvido para gerenciar e monitorar atividades relacionadas à saúde e segurança no trabalho. Ele visa facilitar o acompanhamento de processos, relatórios e conformidades legais.

## Funcionalidades
- Cadastro e gerenciamento de colaboradores.
- Controle de treinamentos e certificações.
- Monitoramento de exames médicos periódicos.
- Gestão de riscos e incidentes.
- Geração de relatórios e indicadores.

## Tecnologias Utilizadas
- **Frontend:**  HTML5, CSS3 e JavaScript 
- **Backend:**  Node.js v22.14.0 
- **Banco de Dados:** PostgreSQL v17.4.1

## Como Executar
1. Clone o repositório:
    ```bash
    git clone https://github.com/Francis-Esper/sghss_sistema.git
    ```
2. Acesse o diretório do projeto:
    ```bash
    cd sghss_sistema
    ```

3. Instale o Node v22.14.0 e NPM v11.3.0 ou superior

4. Instale as dependências:
    ```bash
    Instale as dependências / pacotes: npm install
    ```
5. Baixe e instale o banco de dados Postgres versão 17.4.1 ou superior

6. Crie o banco de dados e as tabelas do sistema utilizando os arquivos disponíveis na pasta ./src/migrations:
    criarBancoDados.sql
    criarTabelas.sql

7. Crie na raiz do projeto o arquivo .env, exemplo:
    
    DB_URI={} `string de conexão com o banco de dados: postgresql://usuarioDB:senhaDB@host:porta/database`

    PORT={} `(Porta do servidor node)`

    JWT_SECRET={} `Senha para geração do JSON WEB TOKEN`

    NODE_ENV={} `Exemplo: development`
 

8. Inicie o servidor node:
    ```bash
    Comando para iniciar o servidor: npm start
    ```

## Licença
Este projeto está licenciado sob a [ISC].

---