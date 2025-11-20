// ---------------------- Configuração inicial ----------------------
const defaultWords = [
  // Palavras simples (2 sílabas)
  "ca-sa", "bo-la", "ga-to", "pa-to", "sa-po", "la-ta", "ca-ma", "me-sa",
  "po-vo", "ru-a", "lu-a", "so-fá", "ca-fé", "pé", "mão", "sol",
  "flor", "mar", "céu", "pão", "luz", "paz", "sal", "mel",

  // Palavras com 2 sílabas
  "li-vro", "por-ta", "ca-rro", "fer-ro", "ter-ra", "guer-ra", "pe-dra", "vi-dro",
  "qua-dro", "le-bre", "ti-gre", "ze-bra", "co-bra", "ca-bra", "o-lho", "fi-lho",
  "ga-lho", "mi-lho", "cha-vé", "cha-péu", "pa-pel", "pas-tel", "jar-dim", "tam-bém",

  // Palavras com 3 sílabas
  "ja-ne-la", "ca-dei-ra", "ma-dei-ra", "ban-dei-ra", "la-ran-ja", "co-ber-tor",
  "es-co-la", "pro-fes-sor", "ca-der-no", "lá-pis", "bor-ra-cha", "te-sou-ra",
  "co-mi-da", "be-bi-da", "fa-mi-lia", "a-mi-go", "me-ni-no", "me-ni-na",
  "bon-e-ca", "car-rin-ho", "bi-ci-cle-ta", "pa-ti-ne-te", "ba-lan-ço", "es-cor-re-ga",

  // Animais
  "ca-va-lo", "va-ca", "por-co", "o-ve-lha", "ga-li-nha", "pin-to", "co-e-lho",
  "ca-chor-ro", "lei-ão", "ma-ca-co", "e-le-fan-te", "gi-ra-fa", "hip-pó-po-ta-mo",
  "bor-bo-le-ta", "a-be-lha", "for-mi-ga", "jo-a-nha", "grilo", "ci-gar-ra",
  "pei-xe", "tu-ba-rão", "ba-lei-a", "gol-fi-nho", "tar-ta-ru-ga", "ja-ca-ré",
  "pás-sa-ro", "pa-pa-gai-o", "co-ru-ja", "á-gui-a", "gali-nha", "per-u",

  // Frutas
  "ma-çã", "ba-na-na", "u-va", "la-ran-ja", "li-mão", "ma-ra-cu-já", "a-ba-ca-xi",
  "me-lan-cia", "mo-ran-go", "pês-se-go", "a-me-ixa", "ce-re-ja", "cô-co", "man-ga",
  "ma-mão", "ki-wi", "pe-ra", "fi-go", "ca-qui", "go-ia-ba",

  // Alimentos
  "ar-roz", "fei-jão", "ma-car-rão", "ba-ta-ta", "ce-nou-ra", "to-ma-te", "a-lfa-ce",
  "bró-co-lis", "co-u-ve", "a-bo-brin-ha", "be-rin-je-la", "pi-men-tão", "ce-bo-la",
  "al-ho", "lei-te", "quei-jo", "man-tei-ga", "i-o-gur-te", "o-vo", "car-ne",
  "fran-go", "pei-xe", "bis-coi-to", "bo-lo", "do-ce", "so-cor-ve-te", "su-co",

  // Corpo humano
  "ca-be-ça", "ca-be-lo", "o-re-lha", "o-lho", "na-riz", "bo-ca", "den-te",
  "lín-gua", "pes-co-ço", "om-bro", "bra-ço", "mão", "de-do", "un-ha",
  "bar-ri-ga", "cos-tas", "per-na", "joe-lho", "pé", "co-ra-ção", "pul-mão",

  // Roupas
  "ca-mi-sa", "cal-ça", "short", "sa-ia", "ves-ti-do", "blu-sa", "ca-sa-co",
  "ja-que-ta", "sa-pa-to", "tê-nis", "mei-a", "lu-va", "go-rro", "cha-péu",
  "ci-nto", "gra-va-ta", "len-ço", "e-char-pe", "pi-ja-ma", "cal-ci-nha",

  // Objetos da casa
  "co-zi-nha", "sa-la", "quar-to", "ba-nhei-ro", "te-lha-do", "pa-re-de", "pi-so",
  "te-to", "es-ca-da", "jar-dim", "quin-tal", "por-tão", "cam-pai-nha",
  "so-fá", "pol-tro-na", "te-le-vi-são", "rá-di-o", "com-pu-ta-dor", "te-le-fo-ne",
  "ge-la-dei-ra", "fo-gão", "mi-cro-on-das", "li-qui-di-fi-ca-dor", "ba-te-dei-ra",
  "co-po", "pra-to", "ta-lher", "gar-fo", "fa-ca", "col-her", "xi-ca-ra",
  "pa-ne-la", "fri-gi-dei-ra", "cha-lei-ra", "ga-rra-fa", "jar-ra", "ban-de-ja",

  // Natureza
  "ár-vo-re", "fo-lha", "ga-lho", "raiz", "tron-co", "fru-to", "se-men-te",
  "gra-ma", "flo-res-ta", "mon-ta-nha", "rio", "la-go", "ca-cho-ei-ra", "pra-ia",
  "nu-vem", "chu-va", "ven-to", "tro-vão", "re-lâm-pa-go", "ar-co-í-ris",
  "es-tre-la", "pla-ne-ta", "ter-ra", "pe-dra", "a-rei-a", "bar-ro",

  // Cores
  "ver-me-lho", "a-zul", "a-ma-re-lo", "ver-de", "la-ran-ja", "ro-xo", "ro-sa",
  "mar-rom", "pre-to", "bran-co", "cin-za", "dou-ra-do", "pra-te-a-do",

  // Ações simples
  "cor-rer", "pu-lar", "dan-çar", "can-tar", "brin-car", "es-tu-dar", "ler",
  "es-cre-ver", "de-se-nhar", "pin-tar", "dor-mir", "a-cor-dar", "co-mer", "be-ber"
];

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
  streakStars: document.getElementById('streakStars'),
  highScore: document.getElementById('highScore'),
  progressFill: document.getElementById('progressFill'),
  progressText: document.getElementById('progressText'),
  mascot: document.getElementById('mascot'),
  achievementPopup: document.getElementById('achievementPopup'),
  levelDisplay: document.getElementById('levelDisplay'),
  wordDifficulty: document.getElementById('wordDifficulty')
};

// Estado do jogo
let words = [...defaultWords]; // sempre no formato com hífen
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
const mascots = ['🦉', '🐱', '🐶', '🐼', '🦁', '🦄', '🐉', '👑'];

el.highScore.textContent = high;
el.wordsInput.value = defaultWords.join(', ');
el.speakBtn.style.display = 'none'; // esconder botão de ouvir inicialmente

// Calcular nível baseado em palavras totais
function calculateLevel() {
  level = Math.floor(totalWords / 10) + 1;
  if (level > mascots.length) level = mascots.length;
  el.levelDisplay.textContent = level;
  el.mascot.textContent = mascots[level - 1];
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

function stripHyphens(hyphenated) {
  return hyphenated.replace(/\s+/g, '').replace(/-/g, '');
}

function renderWord(hyphenated, showSyllables) {
  const parts = hyphenated.split('-');
  if (showSyllables) {
    el.word.innerHTML = parts.map((p, i) => `<button class="syllable-btn" data-index="${i}">${p}</button>`).join('<span class="syllable" style="opacity:.5">-</span>');
    // adicionar listeners após DOM update
    setTimeout(() => {
      document.querySelectorAll('.syllable-btn').forEach(btn => {
        btn.addEventListener('click', handleSyllableClick);
      });
    }, 0);
  } else {
    el.word.textContent = stripHyphens(hyphenated);
  }
}

function handleSyllableClick(e) {
  const index = parseInt(e.target.dataset.index);
  const parts = words[deck[idx]].split('-');
  const syllable = parts[index];
  
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

function renderStars(n) {
  const starsHtml = n > 0 ? Array.from({length: n}, (_, i) => 
    `<span class="star ${i === n-1 ? 'star-grow' : ''}">⭐</span>`
  ).join('') : '—';
  el.streakStars.innerHTML = starsHtml;
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
  const percentage = (sessionWords / 20) * 100; // meta de 20 palavras
  el.progressFill.style.width = Math.min(percentage, 100) + '%';
  el.progressText.textContent = `${sessionWords} ${sessionWords === 1 ? 'palavra' : 'palavras'}`;
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
  if (totalWords === 5) {
    showAchievement('🌟', 'Primeira Conquista!<br/>5 palavras lidas!');
  } else if (totalWords === 10) {
    showAchievement('🏆', 'Incrível!<br/>10 palavras lidas!');
  } else if (totalWords === 20) {
    showAchievement('💎', 'Brilhante!<br/>20 palavras lidas!');
  } else if (totalWords === 50) {
    showAchievement('👑', 'Campeão de Leitura!<br/>50 palavras lidas!');
  } else if (totalWords === 100) {
    showAchievement('🎓', 'Mestre da Leitura!<br/>100 palavras lidas!');
  }
  
  // Verificar mudança de nível
  const oldLevel = level;
  calculateLevel();
  if (level > oldLevel) {
    showAchievement('🎊', `Subiu para o Nível ${level}!`);
    el.mascot.classList.add('excited');
    setTimeout(() => el.mascot.classList.remove('excited'), 800);
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

function getWordDifficulty(hyphenatedWord) {
  const syllables = hyphenatedWord.split('-').length;
  if (syllables === 1) return { text: '📖 Muito Fácil', color: '#22c55e' };
  if (syllables === 2) return { text: '📗 Fácil', color: '#3b82f6' };
  if (syllables === 3) return { text: '📘 Médio', color: '#f59e0b' };
  return { text: '📕 Desafio', color: '#ef4444' };
}

function loadNewWord() {
  const w = nextFromDeck();
  usedHelp = false;
  syllablesClicked.clear();
  el.speakBtn.style.display = 'none';
  renderWord(w, false);
  el.helpBtn.textContent = 'Mostrar sílabas';
  setMessage('');
  
  // Mostrar dificuldade
  const difficulty = getWordDifficulty(w);
  el.wordDifficulty.textContent = difficulty.text;
  el.wordDifficulty.style.color = difficulty.color;
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
  // alterna exibição
  if (!usedHelp && el.helpBtn.textContent.startsWith('Mostrar')) {
    usedHelp = true; // marcar que houve ajuda nesta palavra
    renderWord(words[deck[idx]], true);
    el.helpBtn.textContent = 'Esconder sílabas';
    setMessage('Ajuda ativada: esta palavra não vale estrela.', 'warn');
  } else if (el.helpBtn.textContent.startsWith('Esconder')) {
    renderWord(words[deck[idx]], false);
    el.helpBtn.textContent = 'Mostrar sílabas';
    // manter aviso de ajuda
  } else {
    // fallback
    usedHelp = true;
    renderWord(words[deck[idx]], true);
    el.helpBtn.textContent = 'Esconder sílabas';
    setMessage('Ajuda ativada: esta palavra não vale estrela.', 'warn');
  }
});

el.correctBtn.addEventListener('click', () => {
  if (usedHelp) {
    streak = 0;
    renderStars(streak);
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
  renderStars(streak);
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
  // avançar sem pontuar
  if (usedHelp && streak > 0) {
    setMessage('Sem estrela nesta, pois a ajuda foi usada. Você consegue na próxima!');
  } else {
    setMessage('');
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
  renderStars(0);
  high = 0;
  el.highScore.textContent = '0';
  sessionStorage.removeItem('readingStarsHighScore');
  sessionWords = 0;
  updateProgress();
  setMessage('Pontuações da sessão zeradas.');
});

el.loadBtn.addEventListener('click', () => {
  const raw = el.wordsInput.value.trim();
  const parts = raw.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
  const onlyValid = parts.filter(w => /[a-zA-ZáàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]+-[a-zA-Z]/.test(w));
  if (!onlyValid.length) {
    setMessage('Nenhuma palavra válida encontrada. Use hífens para separar sílabas (ex.: ca-sa).', 'danger');
    return;
  }
  words = onlyValid;
  buildDeck();
  loadNewWord();
  setMessage(`Carregado ${words.length} palavra(s).`, 'muted');
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
buildDeck();
loadNewWord();
renderStars(0);
calculateLevel();
updateProgress();

// Interação com mascote
el.mascot.addEventListener('click', () => {
  animateMascot('excited');
  const encouragements = [
    'Você está indo muito bem! 🎉',
    'Continue assim, campeão! 💪',
    'Eu acredito em você! ⭐',
    'Vamos ler mais uma? 📚',
    'Você é incrível! 🌟'
  ];
  setMessage(encouragements[Math.floor(Math.random() * encouragements.length)], 'win');
});