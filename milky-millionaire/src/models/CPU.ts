import { Card } from "./Card";
import { GameState } from "./Game";

export function turnCPU(game: GameState, deck: Card[]): { probability: number, cards: Card[] }[] {
    return [{ probability: 1, cards: deck }];
}