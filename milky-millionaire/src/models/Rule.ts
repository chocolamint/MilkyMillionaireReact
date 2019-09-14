import { Card, NumberCard } from "./Card";

function canDiscard(board: { stack: Card[][] }, cards: readonly Card[]) {

    const [stackTop] = board.stack;

    if (cards.length == 0) return false;

    let c: Card;
    if (cards.every(x => x.joker)) {
        c = cards[0];
    } else {
        c = cards.find(x => !x.joker)!;
        if (cards.some(x => !x.joker && (c as NumberCard).rank != x.rank)) return false;
    }
    if (stackTop == null) return true;
    if (getHeight(c) <= getHeight(stackTop[0])) return false;
    return cards.length == stackTop.length;
}

function getHeight(card: Card) {
    if (card.joker) return 16;
    switch (card.rank) {
        case 2: return 15;
        case 1: return 14;
        default: return card.rank;
    }
}

export const Rule = {
    canDiscard,
};