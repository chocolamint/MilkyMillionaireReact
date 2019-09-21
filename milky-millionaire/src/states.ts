import { GameStatus } from "./models/Game";
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
    isPassing: boolean;
    isTrickEnding: boolean;
    discarding: DiscardedCards | undefined;
}
