import { Player } from "./player.js";

/* --- Get DOM elements --- */

const info = document.getElementById("info");
const gameboards = document.querySelectorAll(".gameboard");
const startBtn = document.getElementById("start");

/* --- Create a nxn grid within each gameboard --- */

let n = 10;
const createGameboard = (board) => {
    for (let i = 0; i < n * n; i++) {
        let cell = document.createElement("div");
        cell.id = i;
        cell.classList.add("cell");
        board.appendChild(cell);
    }
};

gameboards.forEach((board) => {
    createGameboard(board);
});

/* --- Update the text content of a gameboard's cells using the relevant board array --- */

const updateGameboard = (screenCells, board) => {
    for (let i = 0; i < n; i++) {
        let row = board[i];
        for (let j = 0; j < n; j++) {
            let content = row[j];
            let index;
            if (i === 0) {
                index = j;
            } else {
                index = Number(i.toString() + j.toString());
            }
            
            if (content === null) {
                continue;
            }

            screenCells[index].classList.add("active");
        }
    }
}

const resetGameboards = () => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        if (cell.classList.contains("active")) {
            cell.classList.remove("active");
        }
    });
};

/* --- Start a game when the startBtn element is clicked --- */

const startGame = () => {
    resetGameboards();

    let playerCells = document.querySelectorAll("#player .cell");
    let opponentCells = document.querySelectorAll("#opponent .cell");

    let player = Player("player", n);
    let opponent = Player("opponent", n);

    player.initializeGameboard();
    opponent.initializeGameboard();

    let playerBoard = player.getGameboard().getBoard();
    let opponentBoard = opponent.getGameboard().getBoard();

    updateGameboard(playerCells, playerBoard);
    updateGameboard(opponentCells, opponentBoard);
}

startBtn.addEventListener("click", startGame);