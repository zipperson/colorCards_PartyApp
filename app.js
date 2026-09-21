const palette = [
  { name: 'RED', hex: '#ff765e' }, { name: 'BLUE', hex: '#70b7ff' },
  { name: 'YELLOW', hex: '#ffd34e' }, { name: 'GREEN', hex: '#a9df74' },
  { name: 'ORANGE', hex: '#ffad55' }, { name: 'PURPLE', hex: '#bd93ef' },
  { name: 'PINK', hex: '#f59fc1' }, { name: 'TEAL', hex: '#6fd6c6' }
];
const settings = { mode: 'tap', duration: 5, colors: 4 };
let cardNumber = 1, timerId, secondsLeft, playing = false;
const $ = (selector) => document.querySelector(selector);
const card = $('#card');

function nextCard() {
  cardNumber++;
  const choices = palette.slice(0, settings.colors);
  const isWhite = Math.random() < .5;
  const word = choices[Math.floor(Math.random() * choices.length)];
  if (isWhite) {
    card.className = 'card card-white'; card.style.background = '#fffdf9';
    $('#card-rule').textContent = 'SAY THE WORD'; $('#card-word').textContent = word.name;
    $('#card-word').style.color = word.hex;
  } else {
    const color = choices[Math.floor(Math.random() * choices.length)];
    card.className = 'card'; card.style.background = color.hex;
    $('#card-rule').textContent = 'SAY THE CARD COLOR'; $('#card-word').textContent = color.name;
    $('#card-word').style.color = '#17222b';
  }
  $('#progress-fill').style.width = `${Math.min(100, 12 + (cardNumber % 8) * 12)}%`;
}
function tick() {
  secondsLeft--;
  $('#timer').textContent = `00:${String(Math.max(secondsLeft, 0)).padStart(2, '0')}`;
  if (secondsLeft <= 0) { nextCard(); secondsLeft = settings.duration; }
}
function startGame() {
  playing = true; $('#start-button').innerHTML = 'Playing <span>●</span>';
  $('#mode-label').textContent = settings.mode === 'tap' ? 'TAP TO PLAY' : 'AUTO PLAY';
  if (settings.mode === 'timer') { clearInterval(timerId); secondsLeft = settings.duration; $('#timer').hidden = false; $('#timer').textContent = `00:${String(secondsLeft).padStart(2, '0')}`; timerId = setInterval(tick, 1000); }
  else { clearInterval(timerId); $('#timer').hidden = true; }
}
card.addEventListener('click', () => { if (settings.mode === 'tap' || !playing) nextCard(); });
$('#start-button').addEventListener('click', startGame);
$('#reset-button').addEventListener('click', () => { clearInterval(timerId); playing = false; cardNumber = 0; $('#timer').hidden = true; $('#start-button').innerHTML = 'Start playing <span>→</span>'; nextCard(); });
function toggleSettings(show) { $('#settings').classList.toggle('open', show); $('#settings').setAttribute('aria-hidden', !show); $('#scrim').hidden = !show; }
$('#settings-button').onclick = () => toggleSettings(true); $('#close-settings').onclick = () => toggleSettings(false); $('#scrim').onclick = () => toggleSettings(false); $('#save-settings').onclick = () => { toggleSettings(false); startGame(); };
$('#advance-mode').onclick = (e) => { if (!e.target.dataset.mode) return; settings.mode = e.target.dataset.mode; document.querySelectorAll('#advance-mode button').forEach(b => b.classList.toggle('selected', b === e.target)); $('#duration-control').hidden = settings.mode !== 'timer'; };
$('#color-count').onclick = (e) => { if (!e.target.dataset.count) return; settings.colors = Number(e.target.dataset.count); document.querySelectorAll('#color-count button').forEach(b => b.classList.toggle('selected', b === e.target)); };
document.querySelectorAll('[data-adjust]').forEach(button => button.onclick = () => { settings.duration = Math.max(1, Math.min(30, settings.duration + Number(button.dataset.adjust))); $('#duration-output').textContent = settings.duration; });
nextCard();
