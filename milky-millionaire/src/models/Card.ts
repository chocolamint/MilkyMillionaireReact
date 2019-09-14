export type Card = NumberCard | Joker;

export interface NumberCard {
    joker?: false | undefined;
    suit: Suit;
    rank: Rank;
}

export interface Joker {
    joker: true;
    extra?: boolean;
}

const suits = ["heart", "diamond", "club", "spade"] as const;
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;

export type Suit = typeof suits[number];
export type Rank = typeof ranks[number];
