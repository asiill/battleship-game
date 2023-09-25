import { Gameboard } from "./gameboard.js";

export const Player = (name) => {
    let playerName = name;

    const getName = () => {
        return playerName;
    }

    return { getName };
};