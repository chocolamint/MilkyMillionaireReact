import { Card } from "./Card";
import { GameState } from "./Game";

export async function turnCPU(game: GameState, deck: Card[]): Promise<Card[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return deck.slice(3);
}