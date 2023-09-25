import { Gameboard } from "../src/gameboard.js";

test("isSunk() returns false if a given ship is not yet sunk", () => {
    const testBoard = Gameboard(10);
    expect(testBoard.allSunk()).toBe(false);
});