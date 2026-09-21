const palette = [
  { name: 'RED', hex: '#ff6b5a' }, { name: 'BLUE', hex: '#69adff' },
  { name: 'YELLOW', hex: '#ffd447' }, { name: 'GREEN', hex: '#9bdc6f' },
  { name: 'ORANGE', hex: '#ffab52' }, { name: 'PURPLE', hex: '#bd8fe8' },
  { name: 'PINK', hex: '#f49cbc' }, { name: 'TEAL', hex: '#63d4c3' },
  { name: 'LIME', hex: '#c7ed59' }, { name: 'NAVY', hex: '#6482c2' },
  { name: 'CORAL', hex: '#fc8770' }, { name: 'VIOLET', hex: '#a97ee3' },
  { name: 'MINT', hex: '#8cddba' }, { name: 'AMBER', hex: '#ffc65a' },
  { name: 'ROSE', hex: '#ee7899' }, { name: 'SKY', hex: '#78d3ed' }
];

const settings = { mode: 'tap', duration: 5, colors: 8 };
let cardNumber = 0;
let timerId;
let secondsLeft;
const $ = (selector) => document.querySelector(selector);
const card = $('#card');

function nextCard() {
  cardNumber += 1;
  const choices = palette.slice(0, settings.colors);
  const isWhite = Math.random() < 0.5;
  const word = choices[Math.floor(Math.random() * choices.length)];

  if (isWhite) {
    card.className = 'card card-white';
    card.style.background = '#fffdf9';
    $('#card-rule').textContent = 'SAY THE WORD';
    $('#card-word').textContent = word.name;
    $('#card-word').style.color = word.hex;
  } else {
    const color = choices[Math.floor(Math.random() * choices.length)];
    const differentWords = choices.filter((choice) => choice.name !== color.name);
    const wordOnCard = differentWords[Math.floor(Math.random() * differentWords.length)];
    card.className = 'card';
    card.style.background = color.hex;
    $('#card-rule').textContent = 'SAY THE CARD COLOR';
    $('#card-word').textContent = wordOnCard.name;
    $('#card-word').style.color = '#17222b';
  }

  $('#progress-fill').style.width = `${Math.min(100, 12 + (cardNumber % 8) * 12)}%`;
}

function stopTimer() {
  clearInterval(timerId);
  $('#timer').hidden = true;
}

function tick() {
  secondsLeft -= 1;
  $('#timer').textContent = `00:${String(Math.max(secondsLeft, 0)).padStart(2, '0')}`;
  if (secondsLeft <= 0) {
    nextCard();
    secondsLeft = settings.duration;
  }
}

function openGame() {
  $('#settings-screen').hidden = true;
  $('#game-screen').hidden = false;
  $('#mode-label').textContent = settings.mode === 'tap' ? 'TAP TO PLAY' : 'AUTO PLAY';
  nextCard();

  if (settings.mode === 'timer') {
    secondsLeft = settings.duration;
    $('#timer').hidden = false;
    $('#timer').textContent = `00:${String(secondsLeft).padStart(2, '0')}`;
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
  } else {
    stopTimer();
  }
}

function openSettings() {
  stopTimer();
  $('#game-screen').hidden = true;
  $('#settings-screen').hidden = false;
}

card.addEventListener('click', () => {
  if (settings.mode === 'tap') nextCard();
});
$('#start-button').addEventListener('click', openGame);
$('#exit-button').addEventListener('click', openSettings);

$('#advance-mode').addEventListener('click', (event) => {
  const selected = event.target.dataset.mode;
  if (!selected) return;
  settings.mode = selected;
  document.querySelectorAll('#advance-mode button').forEach((button) => {
    button.classList.toggle('selected', button.dataset.mode === selected);
  });
  $('#duration-control').hidden = settings.mode !== 'timer';
});

$('#color-count').addEventListener('input', (event) => {
  settings.colors = Number(event.target.value);
  $('#color-output').textContent = settings.colors;
});

document.querySelectorAll('[data-adjust]').forEach((button) => {
  button.addEventListener('click', () => {
    settings.duration = Math.max(1, Math.min(30, settings.duration + Number(button.dataset.adjust)));
    $('#duration-output').textContent = settings.duration;
  });
});
