import { Player } from "./player.js";

/* --- Get DOM elements --- */

const info = document.getElementById("info");
const gameboards = document.querySelectorAll(".gameboard");
const startBtn = document.getElementById("start");

/* --- Create a nxn grid within each gameboard --- */

let n = 10;
const createGameboard = (board) => {
    for (let i = 0; i < n * n; i++) {
        let cell = document.createElement("button");
        cell.id = i;
        cell.classList.add("cell");
        board.appendChild(cell);
    }
};

gameboards.forEach((board) => {
    createGameboard(board);
});

/* --- Update the text content of a gameboard's cells using the relevant board array --- */

const updateGameboard = (screenCells, gameboard) => {
    let board = gameboard.getBoard();
    let hits = gameboard.getHits();
    let misses = gameboard.getMisses();

    for (let i = 0; i < n; i++) {
        let rowB = board[i];
        let rowH = hits[i];
        let rowM = misses[i];
        for (let j = 0; j < n; j++) {
            let content = rowB[j];
            let hit = rowH[j];
            let miss = rowM[j];

            let index;
            if (i === 0) {
                index = j;
            } else {
                index = Number(i.toString() + j.toString());
            }
            
            if (hit === true) {
                screenCells[index].classList.add("hit");
            }
            if (miss === true) {
                screenCells[index].classList.add("miss");
            }
            if (content !== null) {
                screenCells[index].classList.add("active");
            }

        }
    }
}

/* --- Play game round --- */

const playRound = (cell, opponentGameboard, opponent, playerGameboard, player) => {
    let index = cell.id;
    let x;
    let y;

    // >= 0 index <= 9
    if (index.length === 1) {
        x = 0;
        y = Number(index);
    } else {
        let coord = index.split("");
        x = Number(coord[0]);
        y = Number(coord[1]);
    }

    player.attack(x, y, opponentGameboard);
    opponent.randomAttack(playerGameboard);
}

/* Reset the player and opponent gameboards */

const resetGameboards = () => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        if (cell.classList.contains("active")) {
            cell.classList.remove("active");
        }
        if (cell.classList.contains("hit")) {
            cell.classList.remove("hit");
        }
        if (cell.classList.contains("miss")) {
            cell.classList.remove("miss");
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

    let playerGameboard = player.getGameboard();
    let opponentGameboard = opponent.getGameboard();

    updateGameboard(playerCells, playerGameboard);
    updateGameboard(opponentCells, opponentGameboard);

    opponentCells.forEach((cell) => {
        cell.addEventListener("click", () => {
            playRound(cell, opponentGameboard, opponent, playerGameboard, player);
            updateGameboard(playerCells, playerGameboard);
            updateGameboard(opponentCells, opponentGameboard);
        });
    });
}

startBtn.addEventListener("click", startGame);