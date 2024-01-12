import { Opponent } from "../src/opponent.js";
import { Gameboard } from "../src/gameboard.js";

describe ("Opponent", () => {
    let testOpponent;
    let testPlayerBoard;

    beforeEach(() => {
        testOpponent = Opponent(10, "opponent");
        testPlayerBoard = Gameboard(10);
    });

    test("attack attacks the player board", () => {
        const testShip = testPlayerBoard.getShips()[0];
        testPlayerBoard.placeShip(testShip, 1, 0, 0);

        testOpponent.attack(0, 0, testPlayerBoard);
        const attacks = testOpponent.getAttacks();
        const playerHits = testPlayerBoard.getHits();

        expect(attacks).toContainEqual([0, 0]);
        expect(playerHits[0][0]).toBe(true);
    });

    test("isValidTargetedAttack returns false for coordinates that have been attacked", () => {
        testOpponent.attack(0, 0, testPlayerBoard);

        const result = testOpponent.isValidTargetedAttack(0, 0);

        expect(result).toBe(false);
    });

    test("isValidTargetedAttack returns false for coordinates that are out of bounds", () => {
        const result = testOpponent.isValidTargetedAttack(15, 15);

        expect(result).toBe(false);
    });

    test("isValidTargetedAttack returns true for valid coordinates", () => {
        const result = testOpponent.isValidTargetedAttack(6, 6);

        expect(result).toBe(true);
    });
});