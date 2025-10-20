// Elementos do DOM
const generatedNumberElement = document.getElementById('generated-number');
const romanInput = document.getElementById('roman-input');
const inputError = document.getElementById('input-error');
const convertBtn = document.getElementById('convert-btn');
const returnBtn = document.getElementById('return-btn');
const resultContent = document.getElementById('result-content');
const themeAudio = document.getElementById('theme-audio');
const playAudioBtn = document.getElementById('play-audio');
const pauseAudioBtn = document.getElementById('pause-audio');

// Variável para armazenar o número gerado
let currentNumber = 0;

// Controles de áudio
playAudioBtn.addEventListener('click', () => {
  themeAudio.play();
});

pauseAudioBtn.addEventListener('click', () => {
  themeAudio.pause();
});

// Função para gerar número aleatório de até 6 dígitos (máximo 500.000)
function generateRandomNumber() {
  currentNumber = Math.floor(Math.random() * 500000) + 1;
  generatedNumberElement.textContent = currentNumber;
}

// Função para converter número decimal para romano (até 500.000)
function decimalToRoman(num) {
  if (num <= 0 || num > 500000) return '';

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

  let result = '';
  let steps = [];
  let remaining = num;

  for (let i = 0; i < romanNumerals.length; i++) {
    const { value, symbol } = romanNumerals[i];

    while (remaining >= value) {
      result += symbol;
      steps.push({
        remaining: remaining,
        value: value,
        symbol: symbol,
        newRemaining: remaining - value
      });
      remaining -= value;
    }
  }

  return { result, steps };
}

// Função para validar entrada de algarismos romanos
function validateRomanInput(input) {
  const romanPattern = /^[MDCLXVI]+$/i;
  return romanPattern.test(input);
}

// Função para normalizar algarismos romanos (remover acentos de barra)
function normalizeRoman(roman) {
  return roman.toUpperCase().replace(/[̅]/g, '');
}

// Event listener para validação em tempo real
romanInput.addEventListener('input', e => {
  const value = e.target.value;

  if (value && !validateRomanInput(value)) {
    inputError.textContent = '⚠️ Apenas algarismos romanos são permitidos (I, V, X, L, C, D, M)';
    e.target.style.borderColor = '#ff4655';
  } else {
    inputError.textContent = '';
    e.target.style.borderColor = 'rgba(255, 70, 85, 0.3)';
  }
});

// Função para exibir resultado com cálculo detalhado
function displayResult(isCorrect, userInput, correctAnswer, steps) {
  let html = '';

  if (isCorrect) {
    html = `
      <p class="success">✓ PARABÉNS! Makima está impressionada com sua precisão.</p>
      <p style="margin-top: 1rem;">Você demonstrou lealdade e competência ao converter corretamente o número <strong>${currentNumber}</strong> para <strong>${userInput}</strong>.</p>
    `;
  } else {
    html = `
      <p class="failure">✗ INÚTIL! Você falhou no ritual de Makima.</p>
      <p style="margin-top: 1rem;">Sua resposta <strong>${userInput}</strong> está incorreta. Você será sacrificado...</p>
    `;
  }

  // Adicionar cálculo detalhado
  html += `
    <div class="calculation">
      <h3 style="color: #8a2be2; margin-bottom: 1rem;">Cálculo Detalhado da Conversão:</h3>
      <p><strong>Número Decimal:</strong> ${currentNumber}</p>
  `;

  if (steps.length > 0) {
    html += `<p style="margin-top: 0.5rem;"><strong>Processo de Conversão:</strong></p>`;

    steps.forEach((step, index) => {
      html += `
        <div class="calculation-step">
          ${index + 1}. ${step.remaining} - ${step.value} = ${step.newRemaining} → +${step.symbol}
        </div>
      `;
    });
  }

  html += `</div>`;

  // Saída final
  html += `
    <div class="final-output">
      <div style="margin-bottom: 0.5rem;">Saída Esperada:</div>
      <div style="font-size: 1.5rem;">${correctAnswer}</div>
    </div>
  `;

  resultContent.innerHTML = html;
}

// Botão Converter
convertBtn.addEventListener('click', () => {
  const userInput = romanInput.value.trim().toUpperCase();

  if (!userInput) {
    inputError.textContent = '⚠️ Por favor, insira um algarismo romano';
    return;
  }

  if (!validateRomanInput(userInput)) {
    inputError.textContent = '⚠️ Entrada inválida! Use apenas algarismos romanos';
    return;
  }

  // Obter conversão correta
  const { result: correctAnswer, steps } = decimalToRoman(currentNumber);

  // Normalizar ambas as respostas para comparação
  const normalizedUser = normalizeRoman(userInput);
  const normalizedCorrect = normalizeRoman(correctAnswer);

  // Verificar se está correto
  const isCorrect = normalizedUser === normalizedCorrect;

  // Exibir resultado
  displayResult(isCorrect, userInput, correctAnswer, steps);

  // Limpar mensagem de erro
  inputError.textContent = '';
});

// Botão Retornar (Gerar novo número)
returnBtn.addEventListener('click', () => {
  // Gerar novo número
  generateRandomNumber();

  // Limpar input
  romanInput.value = '';
  romanInput.style.borderColor = 'rgba(255, 70, 85, 0.3)';

  // Limpar mensagens de erro
  inputError.textContent = '';

  // Resetar resultado
  resultContent.innerHTML = '<p class="awaiting">Aguardando sua resposta...</p>';
});

// Permitir Enter para converter
romanInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    convertBtn.click();
  }
});

// Inicializar com um número ao carregar a página
window.addEventListener('load', () => {
  generateRandomNumber();
});
