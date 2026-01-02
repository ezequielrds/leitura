// Dados carregados dos JSONs
let dbSyllables = [];
let dbPhrases = [];
let dbLetters = [];
let dbColors = [];
let gameMode = 'syllables'; // 'syllables' | 'phrases' | 'letters' | 'numbers' | 'colors'
let numbersRange = { min: 0, max: 10 }; // intervalo para números

// Regex patterns for validation
const SYLLABLE_PATTERN = /[a-zA-ZáàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]+-[a-zA-Z]/;
const LETTER_PATTERN = /^[a-zA-ZáàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]$/;
const NUMBER_PATTERN = /^-?\d+$/;

const el = {
  word: document.getElementById('word'),
  helpBtn: document.getElementById('helpBtn'),
  speakBtn: document.getElementById('speakBtn'),
  correctBtn: document.getElementById('correctBtn'),
  nextBtn: document.getElementById('nextBtn'),
  message: document.getElementById('message'),
  wordsInput: document.getElementById('wordsInput'),
  loadBtn: document.getElementById('loadBtn'),
  shuffleBtn: document.getElementById('shuffleBtn'),
  resetBtn: document.getElementById('resetBtn'),
  resetRecordBtn: document.getElementById('resetRecordBtn'),
  streakDisplay: document.getElementById('streakDisplay'),
  highScore: document.getElementById('highScore'),
  progressFill: document.getElementById('progressFill'),
  progressText: document.getElementById('progressText'),
  mascot: document.getElementById('mascot'),
  achievementPopup: document.getElementById('achievementPopup'),
  levelDisplay: document.getElementById('levelDisplay'),
  wordDifficulty: document.getElementById('wordDifficulty'),
  modeSelection: document.getElementById('modeSelection'),
  modeSyllablesBtn: document.getElementById('modeSyllablesBtn'),
  modePhrasesBtn: document.getElementById('modePhrasesBtn'),
  modeLettersBtn: document.getElementById('modeLettersBtn'),
  modeNumbersBtn: document.getElementById('modeNumbersBtn'),
  modeColorsBtn: document.getElementById('modeColorsBtn'),
  numbersConfig: document.getElementById('numbersConfig'),
  minNumber: document.getElementById('minNumber'),
  maxNumber: document.getElementById('maxNumber'),
  minNumberValue: document.getElementById('minNumberValue'),
  maxNumberValue: document.getElementById('maxNumberValue'),
  confirmNumbersBtn: document.getElementById('confirmNumbersBtn'),
  cancelNumbersBtn: document.getElementById('cancelNumbersBtn'),
  changeModeBtn: document.getElementById('changeModeBtn'),
  toggleCaseBtn: document.getElementById('toggleCaseBtn'),
  streakDisplay: document.getElementById('streakDisplay'),
  configSummary: document.getElementById('configSummary'),
  configHelp: document.getElementById('configHelp')
};

// Estado do jogo
let words = []; // sempre no formato com hífen
let deck = []; // índices embaralhados
let idx = -1; // índice atual no deck
let usedHelp = false; // se clicou ajuda na palavra atual
let streak = 0; // sequência de acertos sem ajuda
let high = Number(sessionStorage.getItem('readingStarsHighScore') || 0);
let syllablesClicked = new Set(); // sílabas clicadas
let totalWords = Number(localStorage.getItem('readingTotalWords') || 0); // total de palavras lidas corretamente
let sessionWords = 0; // palavras da sessão atual
let level = 1; // nível atual

// Mascotes que mudam com o nível
const mascots = ['🐶', '🐱', '🐷', '🐘', '🐬', '🐙', '🦉', '🐉', '🦄', '👑'];



el.highScore.textContent = high;

el.speakBtn.style.display = 'none'; // esconder botão de ouvir inicialmente

// Calcular nível baseado em palavras totais (a cada 4 palavras)
function calculateLevel() {
  level = Math.floor(totalWords / 4) + 1;
  // Ciclar mascotes se passar do limite
  const mascotIndex = (level - 1) % mascots.length;
  el.levelDisplay.textContent = level;
  el.mascot.textContent = mascots[mascotIndex];
}

// ---------------------- Utilidades ----------------------
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildDeck() {
  deck = shuffle([...words.keys()]);
  idx = -1;
}

function nextFromDeck() {
  idx++;
  if (idx >= deck.length) {
    buildDeck();
    idx = 0;
  }
  return words[deck[idx]];
}

function stripHyphens(text) {
  if (gameMode === 'phrases' || gameMode === 'letters' || gameMode === 'numbers' || gameMode === 'colors') return text;
  return text.replace(/\s+/g, '').replace(/-/g, '');
}

function renderWord(text, showParts) {
  let parts;
  let separator;
  
  if (gameMode === 'phrases') {
    parts = text.split(' ');
    separator = '<span class="syllable" style="opacity:0"> </span>'; // espaço visível
  } else if (gameMode === 'letters' || gameMode === 'numbers') {
    // Para letras e números, sempre mostrar como botão clicável
    parts = [text];
    separator = '';
    el.word.innerHTML = `<button class="syllable-btn" data-index="0">${text}</button>`;
    
    // Ocultar botão de ajuda para letras e números
    el.helpBtn.style.display = 'none';
    
    // adicionar listeners após DOM update
    setTimeout(() => {
      document.querySelectorAll('.syllable-btn').forEach(btn => {
        btn.addEventListener('click', handleSyllableClick);
      });
    }, 0);
    return; // sair da função
  } else if (gameMode === 'colors') {
    // Para cores, mostrar retângulo colorido
    const colorData = JSON.parse(text);
    el.word.innerHTML = `<button class="color-box" data-index="0" data-color="${colorData.name}" style="background-color: ${colorData.color}; width: 200px; height: 200px; border-radius: 20px; border: 3px solid #fff; cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.3); transition: transform 0.2s;"></button>`;
    
    // Ocultar botão de ajuda para cores
    el.helpBtn.style.display = 'none';
    
    // adicionar listeners após DOM update
    setTimeout(() => {
      document.querySelectorAll('.color-box').forEach(btn => {
        btn.addEventListener('click', handleSyllableClick);
        btn.addEventListener('mouseenter', (e) => {
          e.target.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', (e) => {
          e.target.style.transform = 'scale(1)';
        });
      });
    }, 0);
    return; // sair da função
  } else {
    parts = text.split('-');
    separator = '<span class="syllable" style="opacity:.5">-</span>';
  }

  // Mostrar botão de ajuda para palavras e frases
  el.helpBtn.style.display = 'inline-block';

  if (showParts) {
    el.helpBtn.textContent = gameMode === 'phrases' ? 'Esconder palavras' : 'Esconder sílabas';
    el.word.innerHTML = parts.map((p, i) => `<button class="syllable-btn" data-index="${i}">${p}</button>`).join(separator);
    
    // adicionar listeners após DOM update
    setTimeout(() => {
      document.querySelectorAll('.syllable-btn').forEach(btn => {
        btn.addEventListener('click', handleSyllableClick);
      });
    }, 0);
  } else {
    el.helpBtn.textContent = gameMode === 'phrases' ? 'Separar palavras' : 'Mostrar sílabas';
    el.word.textContent = stripHyphens(text);
  }
}

function handleSyllableClick(e) {
  const index = parseInt(e.target.dataset.index);
  const text = words[deck[idx]];
  let parts;
  let syllable;
  
  if (gameMode === 'phrases') {
    parts = text.split(' ');
    syllable = parts[index];
  } else if (gameMode === 'letters' || gameMode === 'numbers') {
    syllable = text; // letra ou número único
  } else if (gameMode === 'colors') {
    // Para cores, pegar o nome da cor do atributo data-color
    syllable = e.target.dataset.color;
  } else {
    parts = text.split('-');
    syllable = parts[index];
  }
  
  // Adicionar animação
  e.target.classList.add('clicked');
  setTimeout(() => e.target.classList.remove('clicked'), 400);
  
  const u = new SpeechSynthesisUtterance(syllable);
  const v = getPtVoice();
  if (v) u.voice = v;
  u.lang = (v && v.lang) || 'pt-BR';
  u.rate = 0.95;
  u.pitch = 1.0;
  u.volume = 1.0;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
  syllablesClicked.add(index);
  
  // Para letras, números e cores, não mostrar botão de ouvir
  if (gameMode === 'letters' || gameMode === 'numbers' || gameMode === 'colors') {
    return; // não fazer mais nada
  }
  
  // Para palavras e frases, mostrar botão de ouvir quando necessário
  if (!parts) {
    parts = gameMode === 'phrases' ? text.split(' ') : text.split('-');
  }
  if (syllablesClicked.size === parts.length) {
    el.speakBtn.style.display = 'inline-block';
  }
}

function setMessage(msg = '', kind = 'muted') {
  el.message.textContent = msg;
  if (kind === 'win') el.message.style.color = 'var(--ok)';
  else if (kind === 'warn') el.message.style.color = 'var(--warn)';
  else if (kind === 'danger') el.message.style.color = 'var(--danger)';
  else el.message.style.color = 'var(--muted)';
}

function renderStreak(n) {
  el.streakDisplay.textContent = n;
  if (n > 0) {
    el.streakDisplay.classList.remove('pulse');
    void el.streakDisplay.offsetWidth;
    el.streakDisplay.classList.add('pulse'); // Reuse existing pulse animation
  }
}

function celebrate() {
  setMessage('🎉 Uau! Você bateu seu recorde! Continue assim!', 'win');
  // confete simples
  const colors = ['#fde047', '#60a5fa', '#f97316', '#22c55e', '#e879f9'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    const size = 6 + Math.random() * 8;
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.width = size + 'px';
    piece.style.height = (size * 1.4) + 'px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    piece.style.animationDuration = (900 + Math.random() * 700) + 'ms';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1600);
  }
}

function updateProgress() {
  // Progresso dentro do nível atual (0 a 4)
  const currentProgress = totalWords % 4;
  const percentage = (currentProgress / 4) * 100;
  
  el.progressFill.style.width = percentage + '%';
  el.progressText.textContent = `${currentProgress} / 4`;
}

function showAchievement(icon, text) {
  el.achievementPopup.innerHTML = `<div class="achievement-icon">${icon}</div>${text}`;
  el.achievementPopup.classList.add('show');
  playSuccessSound();
  setTimeout(() => {
    el.achievementPopup.classList.remove('show');
  }, 3000);
}

function checkAchievements() {
  // Conquistas baseadas em números totais
  if (totalWords === 5) {
    showAchievement('🌟', 'Primeira Conquista!<br/>5 acertos!');
  } else if (totalWords === 20) {
    showAchievement('🏆', 'Incrível!<br/>20 acertos!');
  } else if (totalWords === 50) {
    showAchievement('👑', 'Campeão de Leitura!<br/>50 acertos!');
  }
  
  // Verificar mudança de nível
  const oldLevel = level;
  calculateLevel();
  if (level > oldLevel) {
    showAchievement('🎊', `Subiu para o Nível ${level}!`);
    el.mascot.classList.add('excited');
    setTimeout(() => el.mascot.classList.remove('excited'), 800);
    playEncouragement();
  }
}

function animateMascot(type = 'happy') {
  el.mascot.classList.add(type);
  setTimeout(() => el.mascot.classList.remove(type), type === 'happy' ? 600 : 800);
}

function playSuccessSound() {
  // Som de sucesso simples usando Web Audio API
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }
}

function getEncouragingMessage() {
  const messages = [
    '👏 Muito bem! Continue assim!',
    '🌟 Excelente trabalho!',
    '🎯 Você está arrasando!',
    '💪 Incrível! Você consegue!',
    '✨ Perfeito! Você é demais!',
    '🚀 Maravilhoso! Vamos continuar!',
    '🎨 Fantástico! Que leitura linda!',
    '🦸 Você é um super leitor!',
    '🌈 Brilhante! Parabéns!'
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function getItemTypePlural(mode) {
  const types = {
    'phrases': 'frase(s)',
    'letters': 'letra(s)',
    'numbers': 'número(s)',
    'colors': 'cor(es)',
    'syllables': 'palavra(s)'
  };
  return types[mode] || 'item(s)';
}

function getWordDifficulty(text) {
  if (gameMode === 'letters') {
    return { text: '🔤 Letra', color: '#22c55e', hidden: false };
  }
  
  if (gameMode === 'numbers' || gameMode === 'colors') {
    return { text: '', color: '', hidden: true }; // sem dificuldade para números e cores
  }
  
  const count = gameMode === 'phrases' ? text.split(' ').length : text.split('-').length;
  
  if (gameMode === 'phrases') {
     if (count <= 3) return { text: '📖 Frase Curta', color: '#22c55e', hidden: false };
     if (count <= 5) return { text: '📗 Frase Média', color: '#3b82f6', hidden: false };
     return { text: '📕 Frase Longa', color: '#ef4444', hidden: false };
  } else {
     if (count === 1) return { text: '📖 Muito Fácil', color: '#22c55e', hidden: false };
     if (count === 2) return { text: '📗 Fácil', color: '#3b82f6', hidden: false };
     if (count === 3) return { text: '📘 Médio', color: '#f59e0b', hidden: false };
     return { text: '📕 Desafio', color: '#ef4444', hidden: false };
  }
}

function loadNewWord() {
  const w = nextFromDeck();
  usedHelp = false;
  syllablesClicked.clear();
  el.speakBtn.style.display = 'none';
  renderWord(w, false);
  setMessage('');
  
  // Mostrar ou ocultar dificuldade
  const difficulty = getWordDifficulty(w);
  if (difficulty.hidden) {
    el.wordDifficulty.style.display = 'none';
  } else {
    el.wordDifficulty.style.display = 'block';
    el.wordDifficulty.textContent = difficulty.text;
    el.wordDifficulty.style.color = difficulty.color;
  }
}

function updateHighScore() {
  if (streak > high) {
    high = streak;
    el.highScore.textContent = high;
    sessionStorage.setItem('readingStarsHighScore', String(high));
    celebrate();
  }
}

// ---------------------- Ações dos botões ----------------------
el.helpBtn.addEventListener('click', () => {
  // Se clicar em ajuda, zera a sequência imediatamente
  if (!usedHelp) {
     streak = 0;
     renderStreak(0);
  }

  // alterna exibição
  if (!usedHelp && (el.helpBtn.textContent.startsWith('Mostrar') || el.helpBtn.textContent.startsWith('Ouvir'))) {
    usedHelp = true; // marcar que houve ajuda nesta palavra
    renderWord(words[deck[idx]], true);
    setMessage('Ajuda ativada: este item não vale estrela.', 'warn');
  } else if (el.helpBtn.textContent.startsWith('Esconder')) {
    renderWord(words[deck[idx]], false);
    // manter aviso de ajuda
  } else {
    // fallback
    usedHelp = true;
    renderWord(words[deck[idx]], true);
    setMessage('Ajuda ativada: este item não vale estrela.', 'warn');
  }
});

el.correctBtn.addEventListener('click', () => {
  if (usedHelp) {
    streak = 0;
    renderStreak(streak);
    setMessage('Boa! Tente ler a próxima sem ajuda para ganhar estrelas. ✨', 'muted');
    setTimeout(loadNewWord, 650);
    return;
  }
  
  // Incrementar contadores
  streak++;
  totalWords++;
  sessionWords++;
  localStorage.setItem('readingTotalWords', String(totalWords));
  
  // Animações
  el.word.classList.add('bounce');
  setTimeout(() => el.word.classList.remove('bounce'), 600);
  animateMascot('happy');
  playSuccessSound();
  
  // Atualizar UI
  renderStreak(streak);
  updateProgress();
  
  // Mensagens especiais para combos
  let message = getEncouragingMessage() + ` +1 ⭐`;
  if (streak === 3) message = '🔥 3 seguidas! Você está pegando fogo!';
  else if (streak === 5) message = '⚡ 5 seguidas! Incrível!';
  else if (streak === 10) message = '💫 10 seguidas! FENOMENAL!';
  
  setMessage(message, 'win');
  updateHighScore();
  checkAchievements();
  
  setTimeout(loadNewWord, 650);
});

el.nextBtn.addEventListener('click', () => {
  // Para letras, números e cores, sempre incrementar pontuação (modo treino)
  if (gameMode === 'letters' || gameMode === 'numbers' || gameMode === 'colors') {
    // Incrementar contadores
    streak++;
    totalWords++;
    sessionWords++;
    localStorage.setItem('readingTotalWords', String(totalWords));
    
    // Animações
    el.word.classList.add('bounce');
    setTimeout(() => el.word.classList.remove('bounce'), 600);
    animateMascot('happy');
    playSuccessSound();
    
    // Atualizar UI
    renderStreak(streak);
    updateProgress();
    
    // Mensagens especiais para combos
    let message = getEncouragingMessage() + ` +1 ⭐`;
    if (streak === 3) message = '🔥 3 seguidas! Você está pegando fogo!';
    else if (streak === 5) message = '⚡ 5 seguidas! Incrível!';
    else if (streak === 10) message = '💫 10 seguidas! FENOMENAL!';
    
    setMessage(message, 'win');
    updateHighScore();
    checkAchievements();
    
    setTimeout(loadNewWord, 650);
    return;
  }
  
  // Para palavras e frases, comportamento original (zera sequência ao pular)
  streak = 0;
  renderStreak(0);
  
  // avançar sem pontuar
  if (usedHelp) {
    setMessage('Sem estrela nesta, pois a ajuda foi usada. Você consegue na próxima!');
  } else {
    setMessage('Sequência zerada ao pular.');
  }
  loadNewWord();
});

el.shuffleBtn.addEventListener('click', () => {
  buildDeck();
  loadNewWord();
  setMessage('Lista embaralhada novamente.');
});

el.resetBtn.addEventListener('click', () => {
  streak = 0;
  renderStreak(0);
  sessionWords = 0;
  updateProgress();
  setMessage('Pontuações da sessão zeradas.');
});

el.resetRecordBtn.addEventListener('click', () => {
  if (confirm('Tem certeza? Isso zerará TUDO: nível, recorde e sequência.')) {
    // Resetar tudo
    high = 0;
    streak = 0;
    level = 1;
    totalWords = 0;
    sessionWords = 0;
    sessionStorage.removeItem('readingStarsHighScore');
    localStorage.removeItem('readingTotalWords');
    
    // Atualizar UI
    el.highScore.textContent = '0';
    renderStreak(0);
    calculateLevel();
    updateProgress();
    
    setMessage('Tudo zerado! Começando do zero! 🔥', 'warn');
  }
});

el.loadBtn.addEventListener('click', () => {
  const raw = el.wordsInput.value.trim();
  const parts = raw.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
  
  let onlyValid;
  if (gameMode === 'syllables') {
    onlyValid = parts.filter(w => SYLLABLE_PATTERN.test(w));
    if (!onlyValid.length) {
      setMessage('Nenhuma palavra válida encontrada. Use hífens para separar sílabas (ex.: ca-sa).', 'danger');
      return;
    }
  } else if (gameMode === 'letters') {
    // No modo letras, aceita apenas letras únicas
    onlyValid = parts.filter(w => LETTER_PATTERN.test(w));
    if (!onlyValid.length) {
      setMessage('Nenhuma letra válida encontrada. Digite apenas letras individuais.', 'danger');
      return;
    }
  } else if (gameMode === 'numbers') {
    // No modo números, aceita apenas números inteiros
    onlyValid = parts.filter(w => NUMBER_PATTERN.test(w));
    if (!onlyValid.length) {
      setMessage('Nenhum número válido encontrado. Digite apenas números.', 'danger');
      return;
    }
  } else {
    // No modo frases, aceita qualquer texto não vazio
    onlyValid = parts.filter(w => w.length > 0);
    if (!onlyValid.length) {
      setMessage('Nenhuma frase válida encontrada. Digite pelo menos uma frase.', 'danger');
      return;
    }
  }
  
  words = onlyValid;
  buildDeck();
  loadNewWord();
  setMessage(`Carregado ${words.length} ${getItemTypePlural(gameMode)}.`, 'muted');
});

// ---------------------- Controle de Modos ----------------------

// Iniciar em maiúsculas por padrão
document.body.classList.add('uppercase-mode');

el.toggleCaseBtn.addEventListener('click', () => {
  document.body.classList.toggle('uppercase-mode');
});

function setMode(mode) {
  gameMode = mode;
  if (mode === 'syllables') {
    words = [...dbSyllables];
    el.wordsInput.value = dbSyllables.join(', ');
    el.configSummary.textContent = 'Carregar/editar lista de palavras (sílabas separadas por "-")';
    el.configHelp.innerHTML = 'Separe por vírgula, ponto-e-vírgula ou quebra de linha. Ex.: <code>ca-sa</code>, <code>ho-ra</code>, <code>so-fá</code>';
    el.nextBtn.textContent = 'Próxima palavra ➜';
  } else if (mode === 'letters') {
    words = [...dbLetters];
    el.wordsInput.value = dbLetters.join(', ');
    el.configSummary.textContent = 'Carregar/editar lista de letras';
    el.configHelp.innerHTML = 'Separe por vírgula, ponto-e-vírgula ou quebra de linha. Ex.: <code>A</code>, <code>B</code>, <code>C</code>';
    el.nextBtn.textContent = 'Próxima letra ➜';
  } else if (mode === 'numbers') {
    // Gerar números baseado no range
    words = [];
    for (let i = numbersRange.min; i <= numbersRange.max; i++) {
      words.push(String(i));
    }
    el.wordsInput.value = words.join(', ');
    el.configSummary.textContent = 'Carregar/editar lista de números';
    el.configHelp.innerHTML = 'Separe por vírgula, ponto-e-vírgula ou quebra de linha. Ex.: <code>1</code>, <code>2</code>, <code>3</code>';
    el.nextBtn.textContent = 'Próximo número ➜';
  } else if (mode === 'colors') {
    // Para cores, armazenar como JSON string
    words = dbColors.map(c => JSON.stringify(c));
    el.wordsInput.value = dbColors.map(c => c.name).join(', ');
    el.configSummary.textContent = 'Carregar/editar lista de cores';
    el.configHelp.innerHTML = 'Separe por vírgula, ponto-e-vírgula ou quebra de linha. Ex.: <code>Vermelho</code>, <code>Azul</code>, <code>Verde</code>';
    el.nextBtn.textContent = 'Próxima cor ➜';
  } else {
    words = [...dbPhrases];
    el.wordsInput.value = dbPhrases.join('\n');
    el.configSummary.textContent = 'Carregar/editar lista de frases';
    el.configHelp.innerHTML = 'Separe por quebra de linha. Ex.: <code>O gato mia</code>, <code>A lua brilha</code>';
    el.nextBtn.textContent = 'Próxima frase ➜';
  }
  
  streak = 0;
  sessionWords = 0;
  buildDeck();
  loadNewWord();
  renderStreak(0);
  updateProgress();
  
  el.modeSelection.classList.add('hidden');
}

el.modeSyllablesBtn.addEventListener('click', () => setMode('syllables'));
el.modePhrasesBtn.addEventListener('click', () => setMode('phrases'));
el.modeLettersBtn.addEventListener('click', () => setMode('letters'));
el.modeColorsBtn.addEventListener('click', () => setMode('colors'));

// Numbers mode: show config modal first
el.modeNumbersBtn.addEventListener('click', () => {
  el.modeSelection.classList.add('hidden');
  el.numbersConfig.classList.remove('hidden');
});

// Numbers config slider handlers
el.minNumber.addEventListener('input', (e) => {
  const value = parseInt(e.target.value);
  el.minNumberValue.textContent = value;
  // Ensure max is always >= min
  if (parseInt(el.maxNumber.value) < value) {
    el.maxNumber.value = value;
    el.maxNumberValue.textContent = value;
  }
});

el.maxNumber.addEventListener('input', (e) => {
  const value = parseInt(e.target.value);
  el.maxNumberValue.textContent = value;
  // Ensure min is always <= max
  if (parseInt(el.minNumber.value) > value) {
    el.minNumber.value = value;
    el.minNumberValue.textContent = value;
  }
});

el.confirmNumbersBtn.addEventListener('click', () => {
  numbersRange.min = parseInt(el.minNumber.value);
  numbersRange.max = parseInt(el.maxNumber.value);
  el.numbersConfig.classList.add('hidden');
  setMode('numbers');
});

el.cancelNumbersBtn.addEventListener('click', () => {
  el.numbersConfig.classList.add('hidden');
  el.modeSelection.classList.remove('hidden');
});

el.changeModeBtn.addEventListener('click', () => {
  el.modeSelection.classList.remove('hidden');
});

// Ouvir palavra (Web Speech API)
let voices = [];

function getPtVoice() {
  if (!voices.length) voices = speechSynthesis.getVoices();
  return voices.find(v => /pt|brazil/i.test(v.lang)) || voices[0];
}
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
  };
}

el.speakBtn.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) {
    setMessage('Recurso de voz não suportado neste navegador.', 'warn');
    return;
  }
  const u = new SpeechSynthesisUtterance(stripHyphens(words[deck[idx]]));
  const v = getPtVoice();
  if (v) u.voice = v;
  u.lang = (v && v.lang) || 'pt-BR';
  u.rate = 0.95;
  u.pitch = 1.0;
  u.volume = 1.0;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
});

// Atalhos: Enter = Acertei, Espaço = Próxima, H = Ajuda
window.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (e.key === 'Enter') {
    e.preventDefault();
    el.correctBtn.click();
  } else if (e.key === ' ') {
    e.preventDefault();
    el.nextBtn.click();
  } else if (e.key.toLowerCase() === 'h') {
    e.preventDefault();
    el.helpBtn.click();
  }
});

// Inicialização
async function initGame() {
  try {
    const [resWords, resPhrases, resLetters, resColors] = await Promise.all([
      fetch('words.json'),
      fetch('phrases.json'),
      fetch('letters.json'),
      fetch('colors.json')
    ]);

    if (!resWords.ok || !resPhrases.ok || !resLetters.ok || !resColors.ok) throw new Error('Erro ao carregar dados');

    dbSyllables = await resWords.json();
    dbPhrases = await resPhrases.json();
    dbLetters = await resLetters.json();
    dbColors = await resColors.json();
    
    // Inicia sem carregar jogo, espera seleção
    el.wordsInput.value = dbSyllables.join(', '); // apenas para facilitar edição do modo padrão
    
  } catch (error) {
    console.error(error);
    setMessage('Erro ao carregar dados: ' + error.message, 'danger');
  }
}

// Inicialização
initGame();

// Interação com mascote
const encouragements = [
  { text: 'Você está indo muito bem! 🎉', audio: 'audio/Você está indo muito bem.mp3' },
  { text: 'Eu acredito em você! ⭐', audio: 'audio/Eu acredito em você.mp3' },
  { text: 'Vamos ler mais uma? 📚', audio: 'audio/Vamos ler mais uma.mp3' },
  { text: 'Você é incrível! 🌟', audio: 'audio/Você é incrível.mp3' },
  { text: 'Cada tentativa te deixa mais forte! 🚀', audio: 'audio/Cada tentativa te deixa mais forte.mp3' },
  { text: 'Que orgulho de você! 😄', audio: 'audio/Que orgulho de você.mp3' },
  { text: 'Você aprende rápido demais! 🧠', audio: 'audio/Você aprende rápido demais.mp3' },
  { text: 'Aprender com você é divertido! 😊', audio: 'audio/Aprender com você é divertido.mp3' }
];

function playEncouragement() {
  const item = encouragements[Math.floor(Math.random() * encouragements.length)];
  setMessage(item.text, 'win');
  try {
    const audio = new Audio(item.audio);
    audio.play().catch(e => console.warn('Autoplay prevented or audio missing:', e));
  } catch(e) {
    console.warn('Audio error:', e);
  }
}

// Interação com mascote
el.mascot.addEventListener('click', () => {
  animateMascot('excited');
  playEncouragement();
});