import { Card } from "./models/Card";
import { Action } from "redux";

export const DISCARD = 'DISCARD';
export const PASS = 'PASS';
export const END_DISCARDING = 'END_DISCARDING';
export const GO_TO_NEXT_TRICK = 'GO_TO_NEXT_TRICK';
export const GONE_TO_NEXT_TRICK = 'GONE_TO_NEXT_TRICK';

export interface DiscardAction {
    type: typeof DISCARD,
    payload: {
        cards: Card[]
    }
}
export interface PassAction {
    type: typeof PASS,
}

export type ActionTypes = DiscardAction | PassAction;

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
    }
}