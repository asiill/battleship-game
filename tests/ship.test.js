import { Ship } from "../src/ship.js";

describe("Ship", () => {
    let testShip;

    beforeEach(() => {
        testShip = Ship(2)
    });

    test("Increment shipHits by 1 when hit() is called once", () => {
        testShip.hit();
        expect(testShip.getHits()).toBe(1);
    });
    
    test("Increment shipHits by 2 when hit() is called twice", () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.getHits()).toBe(2);
    });
    
    test("isSunk() returns true if ship is sunk", () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    });
    
    test("isSunk() returns false if ship is not sunk", () => {
        testShip.hit();
        expect(testShip.isSunk()).toBe(false);
    });
    
    test("Set shipHits to 0 when reset() is called", () => {
        testShip.hit();
        testShip.hit();
        testShip.reset();
        expect(testShip.getHits()).toBe(0);
    });
});