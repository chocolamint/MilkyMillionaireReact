import { GameState, GameStatus } from "./models/Game";
import { DISCARD, ActionTypes as Actions, PASS, START_GAME, GO_TO_NEXT_TRICK, END_DISCARDING, GONE_TO_NEXT_TRICK } from "./actions";
import { DiscardedCards } from "./components/Board";
import { Card } from "./models/Card";

export interface AppState {
    gameState: GameState;
    isTrickEnding: boolean;
    discarding: DiscardedCards | undefined;
}

const initialState = {
    gameState: {
        gameStatus: GameStatus.Init,
        decks: [] as Card[][],
        currentTurn: 0,
        stack: [] as Card[][],
        passCount: 0,
        lastDiscard: undefined as number | undefined
    },
    isTrickEnding: false,
    discarding: undefined
};

function assertNever(x: never): never {
    throw new Error("never");
}

export function reducer(state: AppState | undefined = initialState, action: Actions): AppState {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    decks: action.payload.decks,
                    currentTurn: action.payload.initialTurn
                }
            };
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
                        currentTurn: getNextTurn(state.gameState.decks, state.gameState.currentTurn, state.gameState.lastDiscard, state.isTrickEnding),
                        passCount
                    }
                };
            }
        case END_DISCARDING:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    stack: [state.discarding!.cards, ...state.gameState.stack],
                    currentTurn: getNextTurn(state.gameState.decks, state.gameState.currentTurn, state.gameState.lastDiscard, state.isTrickEnding)
                },
                discarding: undefined
            };
        case GO_TO_NEXT_TRICK:
            return {
                ...state,
                isTrickEnding: true
            };
        case GONE_TO_NEXT_TRICK:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    stack: [],
                    currentTurn: getNextTurn(state.gameState.decks, state.gameState.currentTurn, state.gameState.lastDiscard, state.isTrickEnding),
                    passCount: 0,
                    lastDiscard: undefined
                },
                isTrickEnding: false
            };
        default:
            return state;
    }
}

function getNextTurn(decks: Card[][], currentTurn: number, lastDiscard: number | undefined, isTrickEnding: boolean) {

    let p = isTrickEnding ?
        lastDiscard! :
        nextPosition(currentTurn);

    while (true) {
        if (!isCleared(decks, p)) return p;
        p = nextPosition(p);
    }

    function nextPosition(pos: number) {
        return pos === 4 ? 0 : pos + 1;
    }

    function isCleared(decks: Card[][], position: number) {
        return decks[position].length === 0;
    }
}