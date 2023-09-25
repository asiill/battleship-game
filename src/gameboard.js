import { Ship } from "./ship.js";

export const Gameboard = (size) => {
    let n = size;
    let board = Array(n).fill("").map(() => Array(n).fill(""));
    let ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

    const getBoard = () => {
        return board;
    };

    const reset = () => {
        board = Array(n).fill("").map(() => Array(n).fill(""));
    };

    const isValidPosition = (length, direction, x, y) => {
        // if direction is horizontal
        if (direction === 1) {
            for (let i = 0; i < length; i++) {
                if ((x + i) > 9) {
                    return false;
                }
            }
        }
        // else if direction is vertical
        else {
            for (let i = 0; i < length; i++) {
                if ((y + i) > 9) {
                    return false;
                }
            }
        }
        return true;
    };

    const placeShip = (ship, direction, x, y) => {
        let length = ship.getLength();
        if (isValidPosition(length, direction, x, y)) {
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
        }
        else {
            // if direction is horizontal
            if (direction === 1) {
                x = x - ((x + (length - 1)) - (n - 1));
                for (let i = 0; i < length; i++) {
                    board[x + i][y] = "x";
                }
            }
            // else if direction is vertical
            else {
                y = y - ((y + (length - 1)) - (n - 1));
                for (let i = 0; i < length; i++) {
                    board[x][y + i] = "x";
                }
            }
        }
    };

    const initializeBoard = () => {
        for (let i = 0; i < ships.length; i++) {
            let ship = ships[i];
            // 1 is horizontal | 0 is vertical
            let direction = Math.random() < 0.5 ? 1 : 0;
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            placeShip(ship, direction, x, y);
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