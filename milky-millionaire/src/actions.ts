import { Card } from "./models/Card";

export const START_GAME = 'START_GAME';
export const DISCARD_STARTED = 'DISCARD_STARTED';
export const DISCARD_DONE = 'DISCARD_DONE';
export const PASS = 'PASS';
export const GO_TO_NEXT_TRICK_STARTED = 'GO_TO_NEXT_TRICK_STARTED';
export const GO_TO_NEXT_TRICK_DONE = 'GO_TO_NEXT_TRICK_DONE';

export interface StartGameAction {
    type: typeof START_GAME,
    payload: {
        decks: Card[][],
        initialTurn: number,
    }
}
export interface DiscardStartedAction {
    type: typeof DISCARD_STARTED,
    payload: {
        cards: Card[]
    }
}
export interface DiscardDoneAction {
    type: typeof DISCARD_DONE
}
export interface PassAction {
    type: typeof PASS,
}
export interface GoToNextTrickStartedAction {
    type: typeof GO_TO_NEXT_TRICK_STARTED
}
export interface GoToNextTrickDoneAction {
    type: typeof GO_TO_NEXT_TRICK_DONE
}

export type ActionTypes = StartGameAction | DiscardStartedAction | PassAction | DiscardDoneAction | GoToNextTrickStartedAction | GoToNextTrickDoneAction;

export function startGame(decks: Card[][], initialTurn: number): StartGameAction {
    return {
        type: START_GAME,
        payload: {
            decks,
            initialTurn
        }
    };
}
export function discardStarted(cards: Card[]): DiscardStartedAction {
    return {
        type: DISCARD_STARTED,
        payload: {
            cards
        }
    };
}
export function discardDone(): DiscardDoneAction {
    return {
        type: DISCARD_DONE
    };
}
export function pass(): PassAction {
    return {
        type: PASS
    };
}
export function goToNextTrickStarted(): GoToNextTrickStartedAction {
    return {
        type: GO_TO_NEXT_TRICK_STARTED
    };
}
export function goToNextTrickDone(): GoToNextTrickDoneAction {
    return {
        type: GO_TO_NEXT_TRICK_DONE
    };
}