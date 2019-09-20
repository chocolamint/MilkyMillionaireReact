import { Card, NumberCard } from "./Card";

function sortCards(cards: readonly Card[]) {
    const sorted = cards.slice();
    sorted.sort((a, b) => getCardRank(a) - getCardRank(b));
    return sorted;

    function getCardRank(card: Card) {
        return getHeight(card) * 10 + getSuitRank(card);
    }
    function getSuitRank(card: Card) {
        if (card.joker) return 5;
        switch (card.suit) {
            case "heart": return 0;
            case "diamond": return 1;
            case "spade": return 2;
            case "club": return 3;
        }
    }
}

function canDiscard(stackTop: readonly Card[] | undefined, cards: readonly Card[]) {

    if (cards.length === 0) return false;
    if (cards.length >= 5) return false;

    let c: Card;
    if (cards.every(x => x.joker)) {
        c = cards[0];
    } else {
        c = cards.find(x => !x.joker)!;
        if (cards.some(x => !x.joker && (c as NumberCard).rank !== x.rank)) return false;
    }
    if (stackTop === undefined) return true;
    if (getHeight(c) <= getHeight(stackTop[0])) return false;
    return cards.length === stackTop.length;
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
    sortCards,
    canDiscard,
};