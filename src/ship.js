export const Ship = (length, name) => {
    let shipHits = 0;
    let shipLength = length;
    let shipName = name;

    const getLength = () => {
        return shipLength;
    };

    const getName = () => {
        return shipName;
    }

    const hit = () => {
        shipHits++;
    };

    const getHits = () => {
        return shipHits;
    };

    const isSunk = () => {
        return (shipHits >= shipLength);
    };

    const reset = () => {
        shipHits = 0;
    };

    return { getLength, getName, hit, getHits, isSunk, reset };
};