import { GameState, GameStatus } from "./models/Game";
import { DISCARD, ActionTypes as Actions, PASS } from "./actions";
import { DiscardedCards } from "./components/Board";
import { Card } from "./models/Card";

export interface AppState {
    gameState: GameState;
    isTrickEnding: boolean;
    discarding: DiscardedCards | undefined;
}

const initialState = {
    gameState: {
        gameStatus: GameStatus.Playing,
        decks: [] as Card[][],
        currentTurn: 0,
        stack: [] as Card[][],
        passCount: 0,
        lastDiscard: undefined as number | undefined
    },
    isTrickEnding: false,
    discarding: undefined
};

export function reducer(state: AppState | undefined = initialState, action: Actions): AppState {
    switch (action.type) {
        case DISCARD:
            const deck = state.gameState.decks[state.gameState.currentTurn];
            const newDeck = deck.filter(x => !action.payload.cards.includes(x));
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    stack: state.gameState.stack,
                    decks: state.gameState.decks.map((d, i) => i === state.gameState.currentTurn ? newDeck : d),
                    lastDiscard: state.gameState.currentTurn,
                    passCount: 0,
                },
                discarding: {
                    by: state.gameState.currentTurn,
                    cards: action.payload.cards
                }
            };
        case PASS:
            const passCount = state.gameState.passCount + 1;
            if (passCount === 4) {
                return {
                    ...state,
                    isTrickEnding: true
                };
            } else {
                return {
                    ...state,
                    gameState: {
                        ...state.gameState,
                        currentTurn: 1,//getNextTurn(),
                        passCount
                    }
                };
            }
    }
}