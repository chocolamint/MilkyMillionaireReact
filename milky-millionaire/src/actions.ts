import { Card } from "./models/Card";

export const START_GAME = 'START_GAME';
export const DISCARD = 'DISCARD';
export const PASS = 'PASS';
export const END_DISCARDING = 'END_DISCARDING';
export const GO_TO_NEXT_TRICK = 'GO_TO_NEXT_TRICK';
export const GONE_TO_NEXT_TRICK = 'GONE_TO_NEXT_TRICK';

export interface StartGameAction {
    type: typeof START_GAME,
    payload: {
        decks: Card[][],
        initialTurn: number,
    }
}
export interface DiscardAction {
    type: typeof DISCARD,
    payload: {
        cards: Card[]
    }
}
export interface PassAction {
    type: typeof PASS,
}
export interface EndDiscardingAction {
    type: typeof END_DISCARDING
}
export interface GoToNextTrickAction {
    type: typeof GO_TO_NEXT_TRICK
}
export interface GoneToNextTrickAction {
    type: typeof GONE_TO_NEXT_TRICK
}

export type ActionTypes = StartGameAction | DiscardAction | PassAction | EndDiscardingAction | GoToNextTrickAction | GoneToNextTrickAction;

export function startGame(decks: Card[][], initialTurn: number): StartGameAction {
    return {
        type: START_GAME,
        payload: {
            decks,
            initialTurn
        }
    };
}
export function discard(cards: Card[]): DiscardAction {
    return {
        type: DISCARD,
        payload: {
            cards
        }
    };
}
export function pass(): PassAction {
    return {
        type: PASS
    };
}
export function endDiscarding(): EndDiscardingAction {
    return {
        type: END_DISCARDING
    };
}
export function goToNextTrick(): GoToNextTrickAction {
    return {
        type: GO_TO_NEXT_TRICK
    };
}
export function goneToNextTrick(): GoneToNextTrickAction {
    return {
        type: GONE_TO_NEXT_TRICK
    };
}