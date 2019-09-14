import { GameState } from "./Game";

export async function tickGame(state: GameState): Promise<GameState> {
    return new Promise<GameState>(resolve => {
        setTimeout(() => {
            resolve({
                ...state,
                cpuDeck: [state.cpuDeck[0].slice(0, 7)].concat(state.cpuDeck.slice(1, 4)),
            })
        }, 4000);
    });
}