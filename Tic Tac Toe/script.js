// Variables
const titlePage = document.querySelector('.title-page');
const playerButton = document.getElementById('player-button');
const computerButton = document.getElementById('computer-button');
const gamePage = document.querySelector('.game-page');
const buttons = document.querySelectorAll('.button-option');
const restartButton = document.getElementById('restart');
const popup = document.querySelector('.popup');
const message = document.getElementById('message');
const newGameButton = document.getElementById('new-game');
let playerVsComputer = false;

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

// Player vs Player button event listener
playerButton.addEventListener('click', () => {
  startGame(false);
});

// Player vs Computer button event listener
computerButton.addEventListener('click', () => {
  startGame(true);
});

// Add event listeners to buttons
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    makeMove(index);
  });
});

// Restart button event listener
restartButton.addEventListener('click', restartGame);

// Return to home
function returnToHome() {
  gamePage.style.display = 'none';
  titlePage.style.display = 'flex';
}

// New game button event listener
newGameButton.addEventListener('click', () => {
  popup.classList.add('hide');
  returnToHome();
});

// Start the game
function startGame(vsComputer) {
  playerVsComputer = vsComputer;
  titlePage.style.display = 'none';
  gamePage.style.display = 'block';
  restartGame();
}

// Make a move
function makeMove(index) {
  if (board[index] === '' && !gameOver) {
    board[index] = currentPlayer;
    buttons[index].textContent = currentPlayer;
    checkWin(currentPlayer);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (!gameOver && currentPlayer === 'O' && playerVsComputer) {
      setTimeout(makeAIMove, 400);
    }
  }
}

// AI makes a move
function makeAIMove() {
  const index = getBestMove();
  makeMove(index);
}

// Get the best move for the AI
function getBestMove() {
  // AI logic to determine the best move
  // This is a simple implementation that randomly selects an empty cell
  const availableMoves = getAvailableMoves();
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

// Get available moves
function getAvailableMoves() {
  const availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      availableMoves.push(i);
    }
  }
  return availableMoves;
}

// Check for a win or draw
function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      gameOver = true;
      if (player === 'X') {
        displayMessage(`Player 1 wins!!!`);
        break;
      } else {
        if (playerVsComputer) {
          displayMessage(`Computer wins!!!`);
        } else {
          displayMessage(`Player 2 wins!!!`);
        }
        break;
      }
    }
  }

  if (!board.includes('') && !gameOver) {
    gameOver = true;
    displayMessage("It's a draw!");
  }
}

// Display the game result message
function displayMessage(msg) {
  message.textContent = msg;
  popup.classList.remove('hide');
}

// Restart the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  buttons.forEach((button) => {
    button.textContent = '';
  });
  popup.classList.add('hide');
}
