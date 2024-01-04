import { Gameboard } from "./gameboard.js";

export const Player = (size, name) => {
    let n = size;
    let playerName = name;
    let gameboard = Gameboard(n);
    let attacks = [];

    const getName = () => {
        return playerName;
    };

    const getGameboard = () => {
        return gameboard;
    };

    const getAttacks = () => {
        return attacks;
    };

    const initializeGameboard = () => {
        gameboard.initializeBoard();
    };

    const hasAttacked = (x, y) => {
        for (let i = 0; i < attacks.length; i++) {
            if (attacks[i][0] === x && attacks[i][1] === y) {
                return true;
            }
        }
        return false;
    };

    const attack = (x, y, board) => {
        if (hasAttacked(x, y)) {
            return;
        }
        attacks.push([x, y]);
        board.receiveAttack(x, y);
    };

    return { getName, getGameboard, getAttacks, initializeGameboard, attack };
};