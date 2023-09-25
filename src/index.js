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

/* --- Start a game when the startBtn element is clicked --- */

const startGame = () => {
    let playerCells = document.querySelectorAll("#player .cell");
    let opponentCells = document.querySelectorAll("#opponent .cell");

    let player = Player("player", n);
    let computer = Player("computer", n);

    player.initializeGameboard();
    computer.initializeGameboard();

    let playerBoard = player.getGameboard().getBoard();
    let computerBoard = computer.getGameboard().getBoard();

    for (let i = 0; i < n; i++) {
        let row = playerBoard[i];
        for (let j = 0; j < n; j++) {
            let cell = row[j];
            let index;
            if (i === 0) {
                index = j;
            } else {
                index = Number(i.toString() + j.toString());
            }
            playerCells[index].textContent = cell;
        }
    }
}

startBtn.addEventListener("click", startGame);