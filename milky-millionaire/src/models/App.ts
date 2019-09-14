import { GameState, GameStatus, Random } from "./Game";
import { turnCPU } from "./CPU";

export async function tickGame(state: GameState, random: Random): Promise<GameState> {
    switch (state.gameStatus) {
        case GameStatus.Playing:
            switch (state.currentTurn) {
                case 4:
                    // player
                    return state;
                default:
                    const cpuDeck = state.cpuDeck[state.currentTurn];
                    const result = turnCPU(state, cpuDeck, random);
                    const nextTurn = state.currentTurn === 4 ? 0 : state.currentTurn + 1;
                    if (result.action === "pass") {
                        return {
                            ...state,
                            currentTurn: nextTurn
                        };
                    } else {
                        const newDeck = cpuDeck.filter(x => !result.cards.includes(x));
                        return {
                            ...state,
                            currentTurn: nextTurn,
                            stack: [result.cards, ...state.stack],
                            cpuDeck: state.cpuDeck.map((d, i) => i === state.currentTurn ? newDeck : d),
                        };
                    }
            }
        default:
            return state;
    }
}   