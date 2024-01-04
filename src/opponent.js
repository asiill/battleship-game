import { Gameboard } from "./gameboard.js";

export const Opponent = (size, name) => {
    let n = size;
    let opponentName = name;
    let gameboard = Gameboard(n);
    let attacks = [];

    // Coordinates of the most recent hit
    let lastHit = null;
    let potentialTargets = [];

    const getName = () => {
        return opponentName;
    };

    const getGameboard = () => {
        return gameboard;
    };

    const getAttacks = () => {
        return attacks;
    };

    const initializeGameboard = () => {
        gameboard.initializeBoard();
    };

    const hasAttacked = (x, y) => {
        for (let i = 0; i < attacks.length; i++) {
            if (attacks[i][0] === x && attacks[i][1] === y) {
                return true;
            }
        }
        return false;
    };

    const attack = (x, y, board) => {
        attacks.push([x, y]);
        let result = board.receiveAttack(x, y);

        if (result === "hit") {
            lastHit = { x, y };
        }
    };
    
    const randomAttack = (board) => {
        let x, y;
    
        do {
            x = Math.floor(Math.random() * n);
            y = Math.floor(Math.random() * n);
        } while (hasAttacked(x, y));

        attack(x, y, board);
    };

    const isWithinBounds = (x, y) => {
        return (x >= 0 && x < n && y >=0 && y < n);
    };

    const isValidTargetedAttack = (x, y) => {
        const validAttack = isWithinBounds(x, y);
        const notAttacked = !hasAttacked(x, y);
        return (
            validAttack && notAttacked
        );
    };

    const getNextAttack = (axis) => {
        const horizontal = [
            { x: lastHit.x + 1, y: lastHit.y },
            { x: lastHit.x - 1, y: lastHit.y },
            { x: lastHit.x + 2, y: lastHit.y },
            { x: lastHit.x - 2, y: lastHit.y },
            { x: lastHit.x + 3, y: lastHit.y },
            { x: lastHit.x - 3, y: lastHit.y },
            { x: lastHit.x + 4, y: lastHit.y },
            { x: lastHit.x - 4, y: lastHit.y },
        ];

        const vertical = [
            { x: lastHit.x, y: lastHit.y + 1 },
            { x: lastHit.x, y: lastHit.y - 1 },
            { x: lastHit.x, y: lastHit.y + 2 },
            { x: lastHit.x, y: lastHit.y - 2 },
            { x: lastHit.x, y: lastHit.y + 3 },
            { x: lastHit.x, y: lastHit.y - 3 },
            { x: lastHit.x, y: lastHit.y + 4 },
            { x: lastHit.x, y: lastHit.y - 4 },
        ];

        if (axis === 1) {
            for (const coord of horizontal) {
                if (isValidTargetedAttack(coord.x, coord.y)) {
                    return {x: coord.x, y: coord.y};
                }
            }

        } else {
            for (const coord of vertical) {
                if (isValidTargetedAttack(coord.x, coord.y)) {
                    return {x: coord.x, y: coord.y};
                } 
            }
        }

        return null;
    };

    const getAxis = (board) => {
        let { x, y } = lastHit;
        let axis;

        // Get hits and misses on the player's gameboard
        let hits = board.getHits();
        let misses = board.getMisses();
        
        const shouldAttackHorizontally = (
        (isWithinBounds(x + 1, y) && hits[x + 1][y]) ||
        (isWithinBounds(x - 1, y) && hits[x - 1][y]) ||
        (isWithinBounds(x, y + 1) && misses[x][y + 1] && isWithinBounds(x, y - 1) && misses[x][y - 1]) ||
        (isWithinBounds(x, y + 1) && !isWithinBounds(x, y - 1) && misses[x][y + 1]) ||
        (isWithinBounds(x, y - 1) && !isWithinBounds(x, y + 1) && misses[x][y - 1])
        );

        const shouldAttackVertically = (
        (isWithinBounds(x, y + 1) && !hits[x][y + 1]) ||
        (isWithinBounds(x, y - 1) && !hits[x][y - 1]) ||
        (isWithinBounds(x + 1, y) && misses[x + 1][y] && isWithinBounds(x - 1, y) && misses[x - 1][y]) ||
        (isWithinBounds(x + 1, y) && !isWithinBounds(x - 1, y) && misses[x + 1][y]) ||
        (isWithinBounds(x - 1, y) && !isWithinBounds(x + 1, y) && misses[x - 1][y])
        );
        
        const shouldAttackRandomly = (
            !shouldAttackHorizontally && !shouldAttackVertically
        );
        
        if (shouldAttackHorizontally) {
            axis = 1;
        } else if (shouldAttackVertically) {
            axis = 0;
        } else if (shouldAttackRandomly) {
            axis = Math.random() < 0.5 ? 1 : 0;
        }
        
        return axis;
    };

    const updatePotentialTargets = (board) => {
        let ships = board.getShips();
        for (let i = 0; i < ships.length; i++) {
            let ship = ships[i];
            if (!ship.isSunk()) {
                potentialTargets.push(ship);
            }
        }
    };

    const targetedAttack = (board) => {
        potentialTargets = [];
        updatePotentialTargets(board);
        console.log(potentialTargets);

        // If a previous round resulted in a "hit"
        if (lastHit) {
            let { x, y } = lastHit;
            let ship = board.getBoard()[x][y];

            if(ship.isSunk()) {
                lastHit = null;
                randomAttack(board);
            } else {
                let axis = getAxis(board);
                let result = getNextAttack(axis);
                if (result) {
                    attack (result.x, result.y, board);
                } else {
                    randomAttack(board);
                }
            }
        } else {
            randomAttack(board);
        }
    };

    return { getName, getGameboard, getAttacks, initializeGameboard, attack, targetedAttack, };
};