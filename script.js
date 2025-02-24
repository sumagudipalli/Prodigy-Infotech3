const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');
const toggleAIButton = document.getElementById('toggle-ai');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let aiOpponent = false;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive || (currentPlayer === 'O' && aiOpponent)) {
        return;
    }

    makeMove(clickedCellIndex, currentPlayer);
    if (gameActive && aiOpponent && currentPlayer === 'O') {
        aiMove();
    }
}

function makeMove(index, player) {
    gameState[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player.toLowerCase());

    if (checkWin(player)) {
        statusDisplay.textContent = `${player} has won!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== "")) {
        statusDisplay.textContent = "Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Now it's ${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === player);
    });
}

function aiMove() {
    let availableCells = gameState.map((cell, index) => cell === "" ? index : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    setTimeout(() => makeMove(randomIndex, 'O'), 500);
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    });
    statusDisplay.textContent = `${currentPlayer}'s turn`;
}

function toggleAI() {
    aiOpponent = !aiOpponent;
    toggleAIButton.textContent = aiOpponent ? 'Play Against Human' : 'Play Against AI';
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
toggleAIButton.addEventListener('click', toggleAI);

statusDisplay.textContent = `${currentPlayer}'s turn`;
toggleAIButton.textContent = 'Play Against AI';
