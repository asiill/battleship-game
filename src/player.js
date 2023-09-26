import { Gameboard } from "./gameboard.js";

export const Player = (name, size) => {
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
    }

    const attack = (x, y, board) => {
        if (hasAttacked(x, y)) {
            return;
        }
        attacks.push([x, y]);
        board.receiveAttack(x, y);
    }

    const randomAttack = (board) => {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        attack(x, y, board);
    }

    return { getName, getGameboard, initializeGameboard, attack, randomAttack};
};