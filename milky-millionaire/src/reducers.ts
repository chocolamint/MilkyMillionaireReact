import { GameStatus } from "./models/Game";
import { DISCARD, ActionTypes as Actions, PASS, START_GAME, GO_TO_NEXT_TRICK, END_DISCARDING, GONE_TO_NEXT_TRICK } from "./actions";
import { Card } from "./models/Card";

export interface DiscardedCards {
    by: number;
    cards: Card[];
}

export interface AppState {
    gameStatus: GameStatus;
    decks: Card[][];
    currentTurn: number;
    stack: Card[][];
    passCount: number;
    lastDiscard: number | undefined;
    isTrickEnding: boolean;
    discarding: DiscardedCards | undefined;
}

const initialState = {
    gameStatus: GameStatus.Init,
    decks: [] as Card[][],
    currentTurn: 0,
    stack: [] as Card[][],
    passCount: 0,
    lastDiscard: undefined as number | undefined,
    isTrickEnding: false,
    discarding: undefined
};

export function reducer(state: AppState | undefined = initialState, action: Actions): AppState {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                gameStatus: GameStatus.Playing,
                decks: action.payload.decks,
                currentTurn: action.payload.initialTurn
            };
        case DISCARD:
            const deck = state.decks[state.currentTurn];
            const newDeck = deck.filter(x => !action.payload.cards.includes(x));
            return {
                ...state,
                stack: state.stack,
                decks: state.decks.map((d, i) => i === state.currentTurn ? newDeck : d),
                lastDiscard: state.currentTurn,
                passCount: 0,
                discarding: {
                    by: state.currentTurn,
                    cards: action.payload.cards
                }
            };
        case PASS:
            const passCount = state.passCount + 1;
            if (passCount === 4) {
                return {
                    ...state,
                    isTrickEnding: true
                };
            } else {
                return {
                    ...state,
                    currentTurn: getNextTurn(state.decks, state.currentTurn, state.lastDiscard, state.isTrickEnding),
                    passCount
                };
            }
        case END_DISCARDING:
            return {
                ...state,
                stack: [state.discarding!.cards, ...state.stack],
                currentTurn: getNextTurn(state.decks, state.currentTurn, state.lastDiscard, state.isTrickEnding),
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
                stack: [],
                currentTurn: getNextTurn(state.decks, state.currentTurn, state.lastDiscard, state.isTrickEnding),
                passCount: 0,
                lastDiscard: undefined,
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