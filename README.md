## MachineInsight.UI

 **MachineInsight.UI**, desenvolvida em Angular para monitoramento e gerenciamento de máquinas pesadas em tempo real.

---

### 🔍 Estrutura do Projeto

- **src/**: Código-fonte da aplicação.
  - **app/**
    - **dashboard/**: Módulo do Dashboard com mapa interativo.
    - **manage/**: Módulo de Gerenciamento de Máquinas (lista e formulários).
    - **machines/**: Módulo de Detalhes da Máquina.
    - **core/**: Serviços e utilitários:
      - **http/**: Comunicação HTTP com API externa.
      - **signalr/**: Comunicação em tempo real via SignalR.
      - **utils/**: Helpers, incluindo mapeamento de cores de status.

---

### 🚀 Recursos Principais

1. **Dashboard** (`/dashboard`)
   - Mapa interativo com marcadores para cada máquina.
   - Atualização de status em tempo real via SignalR.
   - Busca por nome e indice de cores para diferentes status.

2. **Gerenciamento de Máquinas** (`/manage`)
   - Tabela com listagem completa de máquinas.
   - Filtros por status, pesquisa e paginação.
   - Criação e edição de máquinas.

### 🛠️ Pré-requisitos

- Node.js >= 18
- npm >= 8
- Angular CLI >= 16

---

### 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/darlenecoelho/MachineInsight.UI.git
   cd MachineInsight.UI
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

---

###  Execução
- Certifique-se de rodar o back-end antes de iniciar o front-end.
**Modo desenvolvimento**:
```bash
npm start
# ou
ng serve --host 0.0.0.0 --port 4200
```
Acesse `http://localhost:4200/` no navegador.

---

### 🐳 Docker

**Usando Docker Compose**:

> **Execute estes comandos dentro da pasta `MachineInsight.UI`:**
```bash
docker-compose build
docker-compose up --build
```
Expõe a porta **4200**.

**Usando Dockerfile**::
```bash
docker build -t machineinsight-ui .
docker run -d -p 4200:4200 machineinsight-ui
```
