import { Gameboard } from "./gameboard.js";

export const Player = (name, size) => {
    let n = size;
    let playerName = name;
    let gameboard = Gameboard(n);

    const getName = () => {
        return playerName;
    };

    const getGameboard = () => {
        return gameboard;
    };

    const createGameboard = () => {
        gameboard.initializeBoard();
    };

    return { getName, getGameboard, createGameboard };
};