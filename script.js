// VOCABULARY WORDS GO HERE
const wordList = [
  'babymouse',
  'squeak',
  'amoeba',
  'squish',
  'cupcake',
  'typical',
  'locker',
  'wilson',
  'felicia',
  'penny',
  'georgie',
  'messy whiskers',
  'narrator',
  'grandpa',
  'school',
  'school bus',
  'dodgeball',
  'library',
  'slime',
  'mold',
  'shelldon',
  'miss bee',
  'fractions',
  'lord babymouse',
  'tater tots',
  'whiz bang',
  'comic book',
  'squid',
  'christmas',
  'mad scientist',
  'cupcake tycoon',
  'queen',
  'lost gold cupcake',
  'our hero',
  'beach babe',
  'rockstar',
  'camp',
  'skater girl',
  'puppy love',
  'monster mash',
  'musical',
  'dragonslayer',
  'burns rubber',
  'president',
  'babymousse',
  'pesky',
  'homework',
  'queen babymouse',
  'debate',
  'voters',
  'santiago seal',
  'president',
  'campaign',
  'candidate',
  'run for president',
  'love babymouse',
  'recess',
  'cafeteria',
  'gross lunch',
  'victoria',
  'soul',
  'soap',
  'snore',
  'extreme',
  'snowboarding',
  'mountain',
  'summit',
  'half pipe',
  'cabin',
  'hot chocolate',
  'black diamond',
  'inner voice',
  'tail',
  'meow',
  'bad sissi',
];

// Variables
let wordDisplay = document.querySelector('.word');
let guesses = [];
let incorrectGuesses = 0;
const hangmanImage = document.getElementById('hangman');

// Function to get random word
let currentWord = '';
if (!currentWord) {
  getRandomWord();
}
function getRandomWord() {
  const randomIndex = Number.parseInt(Math.random() * wordList.length);
  while (currentWord === wordList[randomIndex]) {
    randomIndex = Number.parseInt(Math.random() * wordList.length);
  }
  currentWord = wordList[randomIndex];
  updateWordDisplay();
}

// Function to Update Word Display
function updateWordDisplay() {
  wordDisplay.style.color = 'black';
  wordDisplay.textContent = '';
  for (let i = 0; i < currentWord.length; i++) {
    if (guesses.includes(currentWord[i].toUpperCase())) {
      wordDisplay.textContent += currentWord[i].toUpperCase();
    } else if (currentWord[i] === ' ') {
      wordDisplay.textContent += ' ';
    } else {
      wordDisplay.textContent += '_';
    }
  }
  if (!wordDisplay.textContent.includes('_')) {
    winner();
  }
}

// Function to Compare Guesses to Current Word
function checkGuess(letter) {
  guesses.push(letter);
  if (currentWord.toUpperCase().includes(letter)) {
    updateWordDisplay();
  } else {
    incorrectGuesses += 1;
    hangmanImage.setAttribute('src', `images/${incorrectGuesses}.png`);
  }
  if (incorrectGuesses === 7) {
    gameOver();
  }
  if (guesses.length > 0 && incorrectGuesses === 0) {
    hangmanImage.setAttribute('src', 'images/blank.png');
  }
}

// You Win!
function winner() {
  wordDisplay.style.color = 'green';
  const buttons = document.querySelectorAll('.button-grid button');
  buttons.forEach((button) => {
    if (button.textContent !== 'RESTART') {
      button.disabled = true;
    }
  });
  const root = document.querySelector(':root');
  root.style.setProperty('--winner', 'visible');
}

// Game Over
function gameOver() {
  wordDisplay.style.color = 'red';
  wordDisplay.textContent = currentWord.toUpperCase();
  const buttons = document.querySelectorAll('.button-grid button');
  buttons.forEach((button) => {
    if (button.textContent !== 'RESTART') {
      button.disabled = true;
    }
  });
  const root = document.querySelector(':root');
  root.style.setProperty('--loser', 'visible');
}

// Restart
function restartGame() {
  incorrectGuesses = 0;
  guesses = [];
  getRandomWord();
  hangmanImage.setAttribute('src', `images/${incorrectGuesses}.png`);
  const buttons = document.querySelectorAll('.button-grid button');
  buttons.forEach((button) => (button.disabled = false));
  const root = document.querySelector(':root');
  root.style.setProperty('--winner', 'hidden');
  root.style.setProperty('--loser', 'hidden');
}

// Create and Place Letter Buttons
const buttonGrid = document.querySelector('.button-grid');
for (let i = 0; i < 26; i++) {
  const letter = String.fromCharCode(65 + i);
  const button = document.createElement('button');
  button.value = letter;
  button.textContent = letter;
  button.setAttribute('id', `button-${letter}`);
  buttonGrid.appendChild(button);
  button.addEventListener('click', () => {
    checkGuess(button.value);
    button.disabled = true;
  });
}
const restart = document.createElement('button');
restart.value = 'restart';
restart.textContent = 'RESTART';
restart.setAttribute('id', 'button-restart');
buttonGrid.appendChild(restart);
restart.style.gridArea = '6 / 2 / 7 / 6';
restart.style.width = '61.5vw';

restart.addEventListener('click', () => restartGame());
