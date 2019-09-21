import { GameStatus } from "./models/Game";
import { DISCARD_STARTED, ActionTypes as Actions, PASS, START_GAME, GO_TO_NEXT_TRICK_STARTED, DISCARD_DONE, GO_TO_NEXT_TRICK_DONE } from "./actions";
import { Card } from "./models/Card";
import { AppState } from "./states";

const initialState: AppState = {
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
        case DISCARD_STARTED:
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
        case DISCARD_DONE:
            return {
                ...state,
                stack: [state.discarding!.cards, ...state.stack],
                currentTurn: getNextTurn(state.decks, state.currentTurn, state.lastDiscard, state.isTrickEnding),
                discarding: undefined
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
        case GO_TO_NEXT_TRICK_STARTED:
            return {
                ...state,
                isTrickEnding: true
            };
        case GO_TO_NEXT_TRICK_DONE:
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