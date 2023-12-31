import { Gameboard } from "../src/gameboard.js";
import { Ship } from "../src/ship.js";

describe("Gameboard", () => {
    let testBoard;

    beforeEach(() => {
        testBoard = Gameboard(10);
    });

    test("initializeBoard places all ships on the board", () => {
        testBoard.initializeBoard();
        const board = testBoard.getBoard();
        let lengthCount = 0;

        for(let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== null) {
                    lengthCount++;
                }
            }
        }

        expect(lengthCount).toBe(17);
    });

    test("receiveAttack places a hit", () => {
        const testShip = Ship(3, "cruiser");
        testBoard.placeShip(testShip, 1, 0, 0);
        testBoard.receiveAttack(0, 0);
        const hits = testBoard.getHits();

        expect(hits[0][0]).toBe(true);
    });

    test("receiveAttack places a miss", () => {
        const testShip = Ship(3, "cruiser");
        testBoard.placeShip(testShip, 1, 0, 0);
        testBoard.receiveAttack(1, 1);
        const misses = testBoard.getMisses();

        expect(misses[1][1]).toBe(true);
    });

    test("allSunk returns true if all ships are sunk", () => {
        testBoard.initializeBoard();
        const ships = testBoard.getShips();
        for (let i = 0; i < ships.length; i++) {
            let testShip = ships[i];
            for (let j = 0; j < testShip.getLength(); j++) {
                testShip.hit();
            }
        }

        expect(testBoard.allSunk()).toBe(true);
    });

    test("reset resets the board", () => {
        const testShip = Ship(3, "cruiser");
        testBoard.placeShip(testShip, 1, 0, 0);
        testBoard.receiveAttack(0, 0);
        testBoard.receiveAttack(1, 1);

        testBoard.reset();
        const board = testBoard.getBoard();
        const hits = testBoard.getHits();
        const misses = testBoard.getMisses();

        expect(board.every(row => row.every(cell => cell === null))).toBe(true);
        expect(hits.every(row => row.every(cell => cell === false))).toBe(true);
        expect(misses.every(row => row.every(cell => cell === false))).toBe(true);
    });
});