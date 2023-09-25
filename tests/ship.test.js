import { Ship } from "../src/ship.js";

test("Increment shipHits by 1 when hit() is called once", () => {
    const testShip = Ship(2);
    testShip.hit();
    expect(testShip.getHits()).toBe(1);
});

test("Increment shipHits by 2 when hit() is called twice", () => {
    const testShip = Ship(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.getHits()).toBe(2);
});

test("isSunk() returns true if ship is sunk", () => {
    const testShip = Ship(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
});

test("isSunk() returns false if ship is not sunk", () => {
    const testShip = Ship(2);
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
});

test("Set shipHits to 0 when reset() is called", () => {
    const testShip = Ship(2);
    testShip.hit();
    testShip.hit();
    testShip.reset();
    expect(testShip.getHits()).toBe(0);
});