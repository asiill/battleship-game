import { Player } from "../src/player.js";
import { Gameboard } from "../src/gameboard.js";

describe ("Player", () => {
    let testPlayer;
    let testOpponentBoard;

    beforeEach(() => {
        testPlayer = Player(10, "player");
        testOpponentBoard = Gameboard(10);
    });

    test("attack attacks the opponent board", () => {
        const testShip = testOpponentBoard.getShips()[0];
        testOpponentBoard.placeShip(testShip, 1, 0, 0);

        testPlayer.attack(0, 0, testOpponentBoard);
        const attacks = testPlayer.getAttacks();
        const opponentHits = testOpponentBoard.getHits();

        expect(attacks).toContainEqual([0, 0]);
        expect(opponentHits[0][0]).toBe(true);
    });
});