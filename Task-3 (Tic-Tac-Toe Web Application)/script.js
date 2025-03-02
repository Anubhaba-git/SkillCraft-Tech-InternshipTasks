let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "player"; // Default mode: Player vs Player

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
}

function handleClick(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;
    document.getElementsByClassName("cell")[index].classList.add("taken");

    if (checkWinner()) {
        document.getElementById("status").innerText = `${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        document.getElementById("status").innerText = "It's a Draw! 😐";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (mode === "computer" && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyCells = board.map((cell, i) => (cell === "" ? i : null)).filter(i => i !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    if (randomIndex !== undefined) {
        handleClick(randomIndex);
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("status").innerText = "";

    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.innerText = "";
        cell.classList.remove("taken");
    }
}
