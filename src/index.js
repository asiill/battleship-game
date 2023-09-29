import { Player } from "./player.js";
import { Game } from "./game.js";

/* --- Get DOM elements --- */

const content = document.getElementById("content");
const info = document.getElementById("info");
const gameboards = document.querySelectorAll(".gameboard");
const startBtn = document.getElementById("start-btn");

// The pop-up announcing the results of a game
const winnerContainer = document.getElementById("winner-container");
winnerContainer.style.display = "none";
const close = document.querySelector(".close");
const restartBtn = document.getElementById("restart-btn");

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

/* -- Display the winner */

const displayWinner = (winner) => {
    let winnerName = document.getElementById("winner");
    if (winner === "tie") {
        winnerName.textContent = "It's a tie";
    } else {
        winnerName.textContent = `The ${winner} has won`;
    }

    winnerContainer.style.display = "block";
    content.style.opacity = 0.5;
};

/* --- Check if the game is over and get the winner --- */

const checkGameStatus = (game) => {
    if (!game.isGameOver()) {
        return;
    } else {
        let winner = game.getWinner();
        displayWinner(winner);
    }
};

/* --- Update the style of a gameboard's cells using the relevant gameboard object --- */

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
};

/* --- Play game round --- */

const playRound = (cell, opponentGameboard, opponent, playerGameboard, player, game) => {
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

    checkGameStatus(game);
};

/* Reset the classList of the player and opponent gameboards */

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

    info.textContent = "Make your shot";

    let playerCells = document.querySelectorAll("#player .cell");
    let opponentCells = document.querySelectorAll("#opponent .cell");

    let player = Player("player", n);
    let opponent = Player("opponent", n);
    let game = Game(player, opponent);

    player.initializeGameboard();
    opponent.initializeGameboard();

    let playerGameboard = player.getGameboard();
    let opponentGameboard = opponent.getGameboard();

    updateGameboard(playerCells, playerGameboard);
    updateGameboard(opponentCells, opponentGameboard);

    opponentCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            if (e.target.classList.contains("hit") || e.target.classList.contains("miss") || game.isGameOver()) {
                return;
            } 
            playRound(cell, opponentGameboard, opponent, playerGameboard, player, game);
            updateGameboard(playerCells, playerGameboard);
            updateGameboard(opponentCells, opponentGameboard);
        });
    });
};

startBtn.addEventListener("click", startGame);

close.addEventListener("click", () => {
    winnerContainer.style.display = "none";
});

restartBtn.addEventListener("click", () => {
    winnerContainer.style.display = "none";
    content.style.opacity = 1;
    location.reload();
});