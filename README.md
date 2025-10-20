# 🔗 O Ritual de Makima: Provações em Algarismos Romanos

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

<p align="center">
  <img src="https://img.shields.io/github/stars/luizfxdev/RomanRitual-Makima?style=social" alt="Stars">
  <img src="https://img.shields.io/github/forks/luizfxdev/RomanRitual-Makima?style=social" alt="Forks">
  <img src="https://img.shields.io/github/watchers/luizfxdev/RomanRitual-Makima?style=social" alt="Watchers">
</p>

---

## 📖 Sobre o Projeto

**O Ritual de Makima** é uma aplicação web interativa inspirada no universo de *Chainsaw Man*, onde o usuário é desafiado a converter números decimais em algarismos romanos sob o julgamento implacável de Makima. 

O projeto combina **gamificação**, **validação em tempo real** e uma **interface visual dark e imersiva** com vídeo de background, áudio temático e animações sofisticadas nos botões.

### 🎯 Objetivo do Desafio

Makima invoca um número aleatório de até **6 dígitos (máximo 500.000)** e o usuário deve inserir o equivalente em **algarismos romanos**. Se acertar, recebe um elogio raro; se errar, é considerado inútil e condenado ao sacrifício.

---

## ✨ Funcionalidades

✅ **Gerador de números aleatórios** até 500.000  
✅ **Validação em tempo real** - aceita apenas letras romanas (I, V, X, L, C, D, M)  
✅ **Cálculo detalhado passo a passo** da conversão decimal → romano  
✅ **Mensagens temáticas** de sucesso/falha baseadas no universo de Makima  
✅ **Vídeo de background** em alta resolução (3840x2160)  
✅ **Áudio temático** com controles play/pause estilizados  
✅ **Botões animados** com efeitos de brilho e movimento  
✅ **Design responsivo** para desktop e mobile  
✅ **Barra de rolagem personalizada** no container de resultados  

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada (Flexbox, animações, backdrop-filter)
- **JavaScript Vanilla** - Lógica de conversão e interatividade
- **Vídeo/Áudio** - Assets multimídia para imersão

---

## 🧮 Lógica Principal

### Algoritmo de Conversão Decimal → Romano

O algoritmo utiliza uma **abordagem gulosa (greedy)**, subtraindo os maiores valores possíveis em ordem decrescente:

```javascript
const romanNumerals = [
    { value: 1000000, symbol: 'M̅' },
    { value: 900000, symbol: 'C̅M̅' },
    { value: 500000, symbol: 'D̅' },
    { value: 400000, symbol: 'C̅D̅' },
    { value: 100000, symbol: 'C̅' },
    { value: 90000, symbol: 'X̅C̅' },
    { value: 50000, symbol: 'L̅' },
    { value: 40000, symbol: 'X̅L̅' },
    { value: 10000, symbol: 'X̅' },
    { value: 9000, symbol: 'MX̅' },
    { value: 5000, symbol: 'V̅' },
    { value: 4000, symbol: 'MV̅' },
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ];
```

**Exemplo de conversão: 2024**

1. 2024 - 1000 = 1024 → +M
2. 1024 - 1000 = 24 → +M
3. 24 - 10 = 14 → +X
4. 14 - 10 = 4 → +X
5. 4 - 4 = 0 → +IV

**Resultado:** `MMXXIV`

### Validação de Entrada

```javascript
const romanPattern = /^[MDCLXVI]+$/i;
```

A regex garante que apenas os 7 caracteres válidos (I, V, X, L, C, D, M) sejam aceitos, bloqueando números e caracteres especiais.

---

## 🚧 Dificuldades Encontradas

### 1️⃣ **Limitação de Algarismos Romanos Clássicos**

**Desafio:** Inicialmente, o projeto suportava números até 10 milhões usando notação com barra superior (M̅, D̅, C̅), mas decidimos simplificar para o sistema clássico (até 1000 por símbolo).

**Solução:** Reduzimos o limite para 500.000 e ajustamos o algoritmo para usar apenas os símbolos básicos (I-M), resultando em strings longas para números grandes (ex: 5000 = MMMMM).

### 2️⃣ **Sincronização do Número Gerado**

**Desafio:** O número não aparecia na tela ao carregar a página.

**Solução:** Mudamos de `window.addEventListener('load')` para garantir que `generateRandomNumber()` fosse chamada corretamente, e adicionamos um valor inicial de `0` no HTML.

### 3️⃣ **Responsividade do Container**

**Desafio:** Manter o container fixo à esquerda em desktop, mas centralizado em mobile sem causar overflow horizontal.

**Solução:** Usamos media queries para reposicionar o container:
```css
@media (max-width: 768px) {
  .container {
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```

### 4️⃣ **Validação de Entrada em Tempo Real**

**Desafio:** Impedir que usuários digitassem números no input.

**Solução:** Implementamos validação `oninput` com regex que bloqueia qualquer caractere não romano e exibe mensagem de erro instantaneamente.

---

## 📂 Estrutura de Pastas

```
RomanRitual-Makima/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── background.mp4
│   └── theme.mp3
└── README.md
```

---

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/luizfxdev/RomanRitual-Makima.git
```

2. Adicione os arquivos de mídia:
   - Coloque seu vídeo em `assets/background.mp4`
   - Coloque seu áudio em `assets/theme.mp3`

3. Abra `index.html` no navegador

---

## 🎨 Preview do Design

- **Cores principais:** Vermelho (#ff4655), Roxo (#8a2be2), Verde (#00ff55)
- **Tipografia:** Segoe UI, fonte monoespaçada para números
- **Efeitos:** Glassmorphism, box-shadow com glow, animações CSS
- **Background:** Vídeo em loop sem opacidade

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- LinkedIn: [luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---

## 🌟 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

<p align="center">
  Feito com 🔗 e ⛓️ inspirado em Chainsaw Man
</p>
