export const Ship = (length) => {
    let shipHits = 0;
    let shipLength = length;

    const getLength = () => {
        return shipLength;
    }

    const hit = () => {
        shipHits++;
    }

    const getHits = () => {
        return shipHits;
    };

    const isSunk = () => {
        return (shipHits >= shipLength);
    };

    const reset = () => {
        shipHits = 0;
    }

    return { getLength, hit, getHits, isSunk, reset };
};