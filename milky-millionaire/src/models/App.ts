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
                    const { newDeck, discard } = await turnCPU(state, state.cpuDeck[state.currentTurn], random);
                    return {
                        ...state,
                        currentTurn: state.currentTurn === 4 ? 0 : state.currentTurn + 1,
                        stack: [discard, ...state.stack],
                        cpuDeck: state.cpuDeck.map((x, i) => i === state.currentTurn ? newDeck : x),
                    };
            }
        default:
            return state;
    }
}   