# README: Sistema de Gestão de Ocorrências (Hackathon Via Appia & SENAC)

**Desenvolvedor:** João Pedro Silva de Lima

---

## 1. Visão Geral

Projeto *full-stack* desenvolvido para o Hackathon entre Via Appia e SENAC, focado na gestão eficiente de ocorrências técnicas. O sistema compreende um ecossistema conteinerizado composto por um backend em **Spring Boot**, banco de dados **PostgreSQL** e frontend em **Angular**.

---

## 2. Instruções de Execução

### Pré-requisitos

* Docker Engine e Docker Compose (versão 2 ou superior) instalados. *(Para usuários Windows, recomenda-se o **Docker Desktop** com a integração WSL 2 ativada).*
* Portas 5433 (PostgreSQL), 8080 (Backend) e 80 (Nginx/Frontend) disponíveis no *host*.

### Configuração do Ambiente e Observações Importantes

O sistema requer ajustes manuais caso deseje alterar as portas ou as configurações padrão de banco de dados:

1. **Variáveis de Ambiente**: Utilize o arquivo `.env.example` como base e crie um arquivo `.env` na raiz do projeto.

* **Configuração de Banco**: O projeto instanciará automaticamente um banco de dados denominado `incidents`. Caso opte por utilizar outro banco ou nome, é obrigatória a alteração da variável `DB_POSTGRES_URL` e a atualização do arquivo `docker-compose.yml`.

2. **Mapeamento de Portas**: O sistema está pré-configurado para rodar nas portas:

* **PostgreSQL**: 5433
* **Spring Boot**: 8080
* **Angular (Nginx)**: 80
* *Nota*: Caso altere estas portas, atualize as variáveis de ambiente correspondentes na pasta `/src/environments` do projeto Angular.

3. **Configuração de CORS**: Caso a porta de execução do Nginx seja alterada, é imprescindível configurar a classe de controle de CORS no backend, localizada em:

* `./backend/src/main/java/com/viaappia/api/config/CorsConfig.java`.
* Certifique-se de que a nova porta esteja liberada, uma vez que, por padrão, o projeto libera apenas as portas 80 e 4200.

### Comando de Execução

Na raiz do projeto, abra o terminal e execute o comando correspondente ao seu sistema operacional para orquestrar e iniciar os containers:

**Para Linux / macOS:**

```bash
sudo docker compose up --build -d

```

**Para Windows:**
*(Abra o PowerShell, Prompt de Comando ou o terminal da sua IDE)*

```cmd
docker compose up --build -d

```

Após a inicialização, o sistema estará acessível em:

* **Aplicação**: `http://localhost/`
* **API (Swagger UI)**: `http://localhost:8080/swagger-ui.html`

---

## 3. Credenciais de Acesso (Seed)

O sistema conta com usuários de teste pré-configurados (senha para todos: `123456`):

| E-mail | Função |
| --- | --- |
| `admin@projeto.com` | Administrador |
| `suporte@projeto.com` | Leitor |
| `leitor@projeto.com` | Leitor |

---

## 4. Especificações Técnicas e Funcionalidades

### Backend

* **Autenticação**: Baseada em JWT com autorização via `Role` (RBAC).
* **Cache**: Implementado via Caffeine para otimização de consultas frequentes.
* **Performance**: Índices primários em `ID` e índices **GIN** para otimização da busca dinâmica de texto.
* **Rotas Disponibilizadas**: API completa conforme requisitos (listagem paginada, filtros, CRUD de ocorrências, gestão de comentários e estatísticas).

### Frontend

* **Arquitetura**: Componentização modular com Angular.
* **Interface**: Otimizada para desktop (responsividade limitada).
* **Validação**: Implementação de *Reactive Forms* sincronizados com as restrições do backend.

---

## 5. Problemas Conhecidos (Known Bugs)

* **Race Condition no StatsComponent**: O carregamento do componente de estatísticas na rota `/workspace` pode travar em estado de carregamento. Sugere-se a implementação de um `Resolver` para garantir a resolução do dado antes da renderização.
* **Tratamento de Exceções**: Requisições proibidas (403 - Forbidden) retornam ocasionalmente erro 500 no cliente, possivelmente devido à interrupção silenciosa de filtros de segurança.
* **Compatibilidade**: Layout testado exclusivamente para resoluções de desktop. Telas com resoluções maiores a 1800px e mobile podem não apresentar bom resultado.
* **Gestão de Usuários**: Não foi adicionada nenhuma rota para cadastro de novos usuários no sistema.

---

## 6. Nota sobre Execução em Ambiente Windows

Fui informado pela banca avaliadora sobre um problema na execução do projeto em ambiente Windows. Em testes locais realizados com o Docker devidamente instalado e renomeando corretamente as variáveis de ambiente, consegui executar o projeto normalmente sem apresentar o mesmo erro.

A única alteração realizada nos arquivos do repositório foi garantir e manter o padrão de quebra de linha dos arquivos `.env` e `.env.example` como **LF** (Line Feed). Essa medida evita que caracteres indesejados (como `\r` do CRLF) sejam interpretados de forma incorreta pelas variáveis de ambiente durante o porte e execução em diferentes sistemas operacionais.
