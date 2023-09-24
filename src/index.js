/* --- Get DOM elements --- */

const info = document.getElementById("info");

const gameboards = document.querySelectorAll(".gameboard");
const playerBoard = document.getElementById("player");
const opponentBoard = document.getElementById("opponent");

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

gameboards.forEach(board => {
    createGameboard(board);
});

/* --- Start a game when the startBtn element is clicked --- */

const startGame = () => {
    console.log("start");
}

startBtn.addEventListener("click", startGame);