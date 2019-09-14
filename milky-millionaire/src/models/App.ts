import { GameState, GameStatus } from "./Game";
import { turnCPU } from "./CPU";

export async function tickGame(state: GameState): Promise<GameState> {
    switch (state.gameStatus) {
        case GameStatus.Playing:
            switch (state.currentTurn) {
                case 4:
                    // player
                    return state;
                default:
                    const newDeck = await turnCPU(state, state.cpuDeck[state.currentTurn]);
                    return {
                        ...state,
                        currentTurn: state.currentTurn === 4 ? 0 : state.currentTurn + 1,
                        cpuDeck: state.cpuDeck.map((x, i) => i === state.currentTurn ? newDeck : x),
                    };
            }
        default:
            return state;
    }
}   