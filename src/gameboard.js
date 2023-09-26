import { Ship } from "./ship.js";

export const Gameboard = (size) => {
    let n = size;
    let board = Array(n).fill(null).map(() => Array(n).fill(null));
    let ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

    const getBoard = () => {
        return board;
    };

    const reset = () => {
        board = Array(n).fill(null).map(() => Array(n).fill(null));
    };

    const isValidPosition = (length, direction, x, y) => {
        /* --- if x or y is out of bounds --- */
        if (x < 0 || x > n - 1 || y < 0 || y > n - 1) {
            return false;
        }

        /* --- if the ship will be of out bounds --- */
        // --- direction is horizontal --- //
        if (direction === 1) {
            if (x + length > n) {
                return false;
            }
        }
        // --- direction is vertical --- //
        else {
            if (y + length > n) {
                return false;
            }
        }

        /* --- if the position or the neighbouring positions are occupied --- */
        // --- horizontal --- //
        if (direction === 1) {
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
        // --- vertical --- //
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

    const placeShip = (ship, direction, x, y) => {
        let length = ship.getLength();
        if (!isValidPosition(length, direction, x, y)) {
            return false;
        }
        // if direction is horizontal
        if (direction === 1) {
            for (let i = 0; i < length; i++) {
                board[x + i][y] = "x";
            }
        }
        // else if direction is vertical
        else {
            for (let i = 0; i < length; i++) {
                board[x][y + i] = "x";
            }
        }
        return true;
    };

    const initializeBoard = () => {
        let i = 0;
        while (i < 5) {
            let ship = ships[i];
            // 1 is horizontal | 0 is vertical
            let direction = Math.random() < 0.5 ? 1 : 0;
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            if (placeShip(ship, direction, x, y)) {
                i++;
            }
        }
    };

    const receiveAttack = () => {
        console.log("attack");
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

    return { getBoard, reset, initializeBoard, receiveAttack, allSunk };
};