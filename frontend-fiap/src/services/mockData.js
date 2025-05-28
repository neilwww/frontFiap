// services/mockData.js
export const mockPosts = [
  {
    id: '1',
    title: 'Introdução à Programação Orientada a Objetos',
    content: `
A Programação Orientada a Objetos (POO) é um paradigma de programação que organiza o código em objetos que representam entidades do mundo real.

## Conceitos Fundamentais

### 1. Classes e Objetos
- **Classe**: Um modelo ou template que define as características e comportamentos
- **Objeto**: Uma instância específica de uma classe

### 2. Encapsulamento
O encapsulamento esconde os detalhes internos de implementação e expõe apenas o que é necessário através de métodos públicos.

### 3. Herança
Permite que uma classe filha herde características de uma classe pai, promovendo reutilização de código.

### 4. Polimorfismo
Capacidade de objetos de diferentes classes responderem ao mesmo método de maneiras distintas.

## Exemplo Prático em JavaScript

\`\`\`javascript
class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  falar() {
    return \`\${this.nome} está falando.\`;
  }
}

class Professor extends Pessoa {
  constructor(nome, idade, disciplina) {
    super(nome, idade);
    this.disciplina = disciplina;
  }

  ensinar() {
    return \`\${this.nome} está ensinando \${this.disciplina}.\`;
  }
}
\`\`\`

A POO nos ajuda a escrever código mais organizado, reutilizável e fácil de manter.
    `,
    description: 'Uma introdução completa aos conceitos fundamentais da Programação Orientada a Objetos.',
    author: 'Prof. Carlos Silva',
    createdAt: '2024-05-20T10:30:00.000Z',
    updatedAt: '2024-05-20T10:30:00.000Z'
  },
  {
    id: '2',
    title: 'React Hooks: Guia Completo para Iniciantes',
    content: `
Os React Hooks revolucionaram a forma como escrevemos componentes React, permitindo usar estado e outras funcionalidades sem escrever classes.

## O que são React Hooks?

Hooks são funções que permitem "conectar-se" ao estado do React e recursos de ciclo de vida a partir de componentes funcionais.

## Hooks Mais Utilizados

### useState
Gerencia estado local em componentes funcionais:

\`\`\`javascript
import { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
\`\`\`

### useEffect
Executa efeitos colaterais em componentes funcionais:

\`\`\`javascript
import { useEffect, useState } from 'react';

function ExemploEffect() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    // Executa após o componente montar
    fetch('/api/dados')
      .then(response => response.json())
      .then(data => setDados(data));
  }, []); // Array vazio = executa apenas uma vez

  return <div>{dados ? JSON.stringify(dados) : 'Carregando...'}</div>;
}
\`\`\`

### useContext
Consome contexto sem usar componentes Consumer:

\`\`\`javascript
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ComponenteFilho() {
  const theme = useContext(ThemeContext);
  
  return (
    <div style={{ background: theme.background }}>
      Tema atual: {theme.name}
    </div>
  );
}
\`\`\`

## Regras dos Hooks

1. **Sempre use Hooks no nível superior** - Nunca dentro de loops, condições ou funções aninhadas
2. **Use Hooks apenas em componentes React** - Ou em outros Hooks customizados

## Hooks Customizados

Você pode criar seus próprios Hooks para reutilizar lógica entre componentes:

\`\`\`javascript
function useContador(valorInicial = 0) {
  const [count, setCount] = useState(valorInicial);

  const incrementar = () => setCount(count + 1);
  const decrementar = () => setCount(count - 1);
  const resetar = () => setCount(valorInicial);

  return { count, incrementar, decrementar, resetar };
}
\`\`\`

Os Hooks tornam o código mais limpo, reutilizável e fácil de testar!
    `,
    description: 'Aprenda a usar React Hooks de forma eficiente com exemplos práticos.',
    author: 'Profa. Ana Rodrigues',
    createdAt: '2024-05-18T14:15:00.000Z',
    updatedAt: '2024-05-19T09:20:00.000Z'
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox: Quando Usar Cada Um',
    content: `
CSS Grid e Flexbox são duas poderosas ferramentas de layout em CSS. Embora às vezes sejam vistos como concorrentes, na verdade são complementares.

## CSS Flexbox

### Quando Usar
- Layouts unidimensionais (linha OU coluna)
- Alinhamento de itens em um container
- Distribuição de espaço entre elementos
- Componentes pequenos e módulos de interface

### Exemplo Prático
\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.item {
  flex: 1; /* Cresce igualmente */
}
\`\`\`

## CSS Grid

### Quando Usar
- Layouts bidimensionais (linhas E colunas)
- Layouts complexos de página
- Sobreposição de elementos
- Designs responsivos avançados

### Exemplo Prático
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  gap: 1rem;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

## Comparação Prática

| Aspecto | Flexbox | CSS Grid |
|---------|---------|----------|
| Dimensão | 1D (linha ou coluna) | 2D (linha e coluna) |
| Uso Ideal | Componentes | Layouts de página |
| Alinhamento | Excelente | Bom |
| Responsividade | Boa | Excelente |
| Suporte Browser | Muito bom | Bom |

## Combinando Ambos

A melhor abordagem é usar Grid para o layout geral da página e Flexbox para componentes internos:

\`\`\`css
/* Layout principal com Grid */
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
}

/* Componente interno com Flexbox */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
\`\`\`

## Dicas Importantes

1. **Use Flexbox para componentes** - Navigation bars, card layouts, botões
2. **Use Grid para layouts principais** - Estrutura da página, seções principais
3. **Combine ambos quando necessário** - Grid para estrutura, Flex para componentes
4. **Considere o suporte ao browser** - Grid tem suporte mais recente

Ambas as ferramentas são poderosas e ter domínio sobre elas é essencial para criar layouts modernos e responsivos!
    `,
    description: 'Entenda as diferenças entre CSS Grid e Flexbox e quando usar cada ferramenta.',
    author: 'Prof. Ricardo Santos',
    createdAt: '2024-05-15T16:45:00.000Z',
    updatedAt: '2024-05-15T16:45:00.000Z'
  },
  {
    id: '4',
    title: 'Introdução ao Git e GitHub',
    content: `
Git é um sistema de controle de versão distribuído que permite rastrear mudanças no código e colaborar com outros desenvolvedores.

## Conceitos Básicos

### O que é Git?
Git é uma ferramenta que mantém um histórico de todas as mudanças feitas em seus arquivos, permitindo:
- Voltar a versões anteriores
- Colaborar com outros desenvolvedores
- Criar ramificações (branches) para diferentes funcionalidades
- Mesclar (merge) mudanças de diferentes contribuidores

### O que é GitHub?
GitHub é uma plataforma online que hospeda repositórios Git, oferecendo:
- Interface web amigável
- Ferramentas de colaboração
- Issues e pull requests
- Actions para CI/CD

## Comandos Essenciais

### Configuração Inicial
\`\`\`bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
\`\`\`

### Criando um Repositório
\`\`\`bash
# Criar novo repositório
git init

# Clonar repositório existente
git clone https://github.com/usuario/repositorio.git
\`\`\`

### Comandos do Dia a Dia
\`\`\`bash
# Ver status dos arquivos
git status

# Adicionar arquivos ao staging
git add arquivo.txt
git add .  # Adiciona todos os arquivos

# Fazer commit
git commit -m "Mensagem descritiva"

# Enviar para o repositório remoto
git push origin main

# Buscar mudanças do repositório remoto
git pull origin main
\`\`\`

### Trabalhando com Branches
\`\`\`bash
# Criar e mudar para nova branch
git checkout -b feature/nova-funcionalidade

# Ver todas as branches
git branch

# Mudar de branch
git checkout main

# Mesclar branch
git merge feature/nova-funcionalidade

# Deletar branch
git branch -d feature/nova-funcionalidade
\`\`\`

## Fluxo de Trabalho Típico

1. **Clone ou Pull**: Obtenha a versão mais recente
2. **Branch**: Crie uma branch para sua funcionalidade
3. **Code**: Desenvolva sua funcionalidade
4. **Add & Commit**: Salve suas mudanças
5. **Push**: Envie para o repositório remoto
6. **Pull Request**: Solicite revisão e merge

## Boas Práticas

### Mensagens de Commit
- Use presente: "Adiciona função de login"
- Seja descritivo mas conciso
- Use convenções como Conventional Commits

### Organização
- Use branches para cada funcionalidade
- Mantenha commits pequenos e focados
- Faça merge frequente da branch principal

### Exemplo de .gitignore
\`\`\`gitignore
# Dependências
node_modules/
vendor/

# Arquivos de build
dist/
build/

# Arquivos de ambiente
.env
.env.local

# Logs
*.log

# Arquivos do sistema
.DS_Store
Thumbs.db
\`\`\`

## Resolvendo Conflitos

Quando há conflitos durante merge:

1. Git marca os conflitos no arquivo
2. Edite manualmente para resolver
3. Adicione o arquivo resolvido: \`git add arquivo.txt\`
4. Complete o merge: \`git commit\`

Git e GitHub são ferramentas essenciais para qualquer desenvolvedor. Pratique regularmente para dominar esses conceitos!
    `,
    description: 'Aprenda os fundamentos do Git e GitHub para controle de versão eficiente.',
    author: 'Prof. Lucas Oliveira',
    createdAt: '2024-05-12T11:20:00.000Z',
    updatedAt: '2024-05-12T11:20:00.000Z'
  },
  {
    id: '5',
    title: 'JavaScript ES6+: Recursos Modernos que Você Deve Conhecer',
    content: `
O JavaScript evoluiu significativamente com o ES6 (ES2015) e versões posteriores. Vamos explorar os recursos mais importantes que todo desenvolvedor deve dominar.

## Arrow Functions

### Sintaxe Mais Limpa
\`\`\`javascript
// Função tradicional
function somar(a, b) {
  return a + b;
}

// Arrow function
const somar = (a, b) => a + b;

// Para uma única linha, return é implícito
const dobrar = x => x * 2;

// Sem parâmetros
const saudar = () => console.log('Olá!');
\`\`\`

### Diferenças Importantes
- Arrow functions não têm seu próprio \`this\`
- Não podem ser usadas como construtores
- Não têm arguments object

## Destructuring

### Arrays
\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];

// Tradicional
const primeiro = numeros[0];
const segundo = numeros[1];

// Destructuring
const [primeiro, segundo, ...resto] = numeros;
console.log(primeiro); // 1
console.log(segundo);  // 2
console.log(resto);    // [3, 4, 5]
\`\`\`

### Objetos
\`\`\`javascript
const pessoa = {
  nome: 'João',
  idade: 30,
  cidade: 'São Paulo'
};

// Destructuring
const { nome, idade, cidade } = pessoa;

// Com renomeação
const { nome: nomeCompleto } = pessoa;

// Com valor padrão
const { profissao = 'Não informado' } = pessoa;
\`\`\`

## Template Literals

\`\`\`javascript
const nome = 'Maria';
const idade = 25;

// Tradicional
const apresentacao = 'Olá, eu sou ' + nome + ' e tenho ' + idade + ' anos.';

// Template literals
const apresentacao = \`Olá, eu sou \${nome} e tenho \${idade} anos.\`;

// Multiline
const html = \`
  <div>
    <h1>\${nome}</h1>
    <p>Idade: \${idade}</p>
  </div>
\`;
\`\`\`

## Spread Operator

### Arrays
\`\`\`javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combinar arrays
const combinado = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Copiar array
const copia = [...arr1];

// Converter NodeList em Array
const elementos = [...document.querySelectorAll('div')];
\`\`\`

### Objetos
\`\`\`javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Combinar objetos
const combinado = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Copiar e modificar
const modificado = { ...obj1, b: 10 }; // { a: 1, b: 10 }
\`\`\`

## Async/Await

### Promises Mais Legíveis
\`\`\`javascript
// Com Promises tradicionais
function buscarDados() {
  return fetch('/api/dados')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => console.error(error));
}

// Com async/await
async function buscarDados() {
  try {
    const response = await fetch('/api/dados');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Módulos ES6

### Export
\`\`\`javascript
// utils.js
export const PI = 3.14159;

export function calcularArea(raio) {
  return PI * raio * raio;
}

export default class Calculadora {
  somar(a, b) {
    return a + b;
  }
}
\`\`\`

### Import
\`\`\`javascript
// main.js
import Calculadora, { PI, calcularArea } from './utils.js';

// Import tudo
import * as Utils from './utils.js';

// Import dinâmico
const modulo = await import('./utils.js');
\`\`\`

## Classes

\`\`\`javascript
class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  // Método
  falar() {
    return \`\${this.nome} está falando.\`;
  }

  // Getter
  get info() {
    return \`\${this.nome}, \${this.idade} anos\`;
  }

  // Setter
  set novaIdade(idade) {
    if (idade > 0) {
      this.idade = idade;
    }
  }

  // Método estático
  static criarBebe(nome) {
    return new Pessoa(nome, 0);
  }
}

// Herança
class Professor extends Pessoa {
  constructor(nome, idade, disciplina) {
    super(nome, idade);
    this.disciplina = disciplina;
  }

  ensinar() {
    return \`\${this.nome} ensina \${this.disciplina}\`;
  }
}
\`\`\`

## Map, Filter e Reduce

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];

// Map - transforma cada elemento
const dobrados = numeros.map(n => n * 2); // [2, 4, 6, 8, 10]

// Filter - filtra elementos
const pares = numeros.filter(n => n % 2 === 0); // [2, 4]

// Reduce - reduz a um único valor
const soma = numeros.reduce((acc, n) => acc + n, 0); // 15

// Combinando métodos
const resultado = numeros
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((acc, n) => acc + n, 0); // 12
\`\`\`

Esses recursos tornam o JavaScript mais expressivo, legível e poderoso. Pratique-os regularmente para dominar o JavaScript moderno!
    `,
    description: 'Explore os recursos mais importantes do JavaScript moderno (ES6+) com exemplos práticos.',
    author: 'Profa. Fernanda Costa',
    createdAt: '2024-05-10T13:30:00.000Z',
    updatedAt: '2024-05-11T08:15:00.000Z'
  }
];

// Função para gerar mais posts se necessário
export const generateMorePosts = (count = 5) => {
  const titles = [
    'Python para Iniciantes: Primeiros Passos',
    'Banco de Dados: SQL vs NoSQL',
    'Segurança Web: Principais Vulnerabilidades',
    'Docker: Containerização de Aplicações',
    'APIs RESTful: Melhores Práticas',
    'Testes Automatizados com Jest',
    'Algoritmos de Ordenação Explicados',
    'Estruturas de Dados Fundamentais',
    'Design Patterns em JavaScript',
    'Microserviços: Arquitetura Moderna'
  ];

  const authors = [
    'Prof. João Silva',
    'Profa. Maria Santos',
    'Prof. Pedro Oliveira',
    'Profa. Ana Costa',
    'Prof. Carlos Lima'
  ];

  const posts = [];
  
  for (let i = 0; i < count; i++) {
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    const randomDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    posts.push({
      id: (Date.now() + i).toString(),
      title: randomTitle,
      content: `Este é um post de exemplo sobre ${randomTitle.toLowerCase()}. 

## Introdução

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Conceitos Principais

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Exemplo Prático

\`\`\`javascript
function exemplo() {
  console.log('Este é um exemplo de código');
  return 'Resultado do exemplo';
}
\`\`\`

## Conclusão

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      description: `Uma introdução abrangente sobre ${randomTitle.toLowerCase()} com exemplos práticos.`,
      author: randomAuthor,
      createdAt: randomDate.toISOString(),
      updatedAt: randomDate.toISOString()
    });
  }
  
  return posts;
};