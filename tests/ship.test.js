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

test("Return true if isSunk() returns true", () => {
    const testShip = Ship(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
});

test("Return false if isSunk() returns false", () => {
    const testShip = Ship(2);
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
});

test("Set shipHits to 0 when rese() is called", () => {
    const testShip = Ship(2);
    testShip.hit();
    testShip.hit();
    testShip.reset();
    expect(testShip.getHits()).toBe(0);
});