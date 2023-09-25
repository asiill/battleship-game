import { Ship } from "./ship.js";

export const Gameboard = (n) => {
    let size = n;
    let board = Array(size).fill("").map(() => Array(size).fill(""));
    let ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

    const getBoard = () => {
        return board;
    };

    const reset = () => {
        board = Array(size).fill("").map(() => Array(size).fill(""));
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

    return { getBoard, reset, receiveAttack, allSunk }
};