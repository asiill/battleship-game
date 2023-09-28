export const Game = (player, opponent) => {
    let winner;

    const isGameOver = () => {
        if (player.getAttacks().length === 100 || opponent.getAttacks().length === 100) {
            winner = "tie";
            return true;
        }
        if (player.getGameboard().allSunk()) {
            winner = opponent.getName();
            return true;
        }
        if (opponent.getGameboard().allSunk()) {
            winner = player.getName();
            return true;
        }
        return false;
    };

    const getWinner = () => {
        return winner;
    };

    return { isGameOver, getWinner };
};