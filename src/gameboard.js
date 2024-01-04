import { Ship } from "./ship.js";

export const Gameboard = (size) => {
    let n = size;
    let board = Array(n).fill(null).map(() => Array(n).fill(null));
    let hits = Array(n).fill(false).map(() => Array(n).fill(false));
    let misses = Array(n).fill(false).map(() => Array(n).fill(false));
    let ships = [Ship(5, "carrier"), Ship(4, "battleship"), Ship(3, "cruiser"), Ship(3, "submarine"), Ship(2, "destroyer")];

    const getBoard = () => {
        return board;
    };

    const getHits = () => {
        return hits;
    };

    const getMisses = () => {
        return misses;
    };

    const getShips = () => {
        return ships;
    };

    const isValidPosition = (length, axis, x, y) => {
        /* --- if x or y is out of bounds --- */
        if (x < 0 || x > n - 1 || y < 0 || y > n - 1) {
            return false;
        }

        /* --- if the ship will be of out bounds --- */
        // --- x-axis --- //
        if (axis === 1) {
            if (x + length > n) {
                return false;
            }
        }
        // --- y-axis --- //
        else {
            if (y + length > n) {
                return false;
            }
        }

        /* --- if the position or the neighbouring positions are occupied --- */
        // --- x-axis --- //
        if (axis === 1) {
            for (let i = -1; i <= length; i++) {
                for (let j = -1; j <= 1; j++) {
                    if ((x + i < 0) || (x + i > n - 1) || (y + j < 0) || (y + j > n - 1)) {
                        continue;
                    }
                    if (board[x + i][y + j]) {
                        return false;
                    }
                }
            }
        }
        // --- y-axis --- //
        else {
            for (let i = - 1; i <= length; i++) {
                for (let j = -1; j <= 1; j++) {
                    if ((x + j < 0) || (x + j > n - 1) || (y + i < 0) || (y + i > n - 1)) {
                        continue;
                    }
                    if (board[x + j][y + i]) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    const placeShip = (ship, axis, x, y) => {
        let length = ship.getLength();
        if (!isValidPosition(length, axis, x, y)) {
            return false;
        }
        // if ship is placed horizontally
        if (axis === 1) {
            for (let i = 0; i < length; i++) {
                board[x + i][y] = ship;
            }
        }
        // else if ship is placed vertically
        else {
            for (let i = 0; i < length; i++) {
                board[x][y + i] = ship;
            }
        }
        return true;
    };

    const initializeBoard = () => {
        let i = 0;
        while (i < 5) {
            let ship = ships[i];
            // 1 is horizontal | 0 is vertical
            let axis = Math.random() < 0.5 ? 1 : 0;
            let x = Math.floor(Math.random() * n);
            let y = Math.floor(Math.random() * n);
            if (placeShip(ship, axis, x, y)) {
                i++;
            }
        }
    };

    const receiveAttack = (x, y) => {
        if (x < 0 || x > n - 1 || y < 0 || y > n - 1) {
            return;
        }
        if (board[x][y]) {
            board[x][y].hit();
            hits[x][y] = true;
            return "hit";
        }
        else {
            misses[x][y] = true;
            return "miss";
        }
    };

    const allSunk = () => {
        for (let i = 0; i < ships.length; i++) {
            let ship = ships[i];
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    };

    const reset = () => {
        board = Array(n).fill(null).map(() => Array(n).fill(null));
        hits = Array(n).fill(false).map(() => Array(n).fill(false));
        misses = Array(n).fill(false).map(() => Array(n).fill(false));
        for (let i = 0; i < ships.length; i++) {
            ships[i].reset();
        }
    };

    return { getBoard, getHits, getMisses, getShips, placeShip, initializeBoard, receiveAttack, allSunk, reset };
};