import { Card } from "./Card";
import { combination, Random, TurnResult } from "./Game";
import { Rule } from "./Rule";

export function turnCPU(stackTop: readonly Card[] | undefined, deck: readonly Card[], random: Random): TurnResult {

    const combinations = [
        ...combination(deck, 1),
        ...combination(deck, 2),
        ...combination(deck, 3),
        ...combination(deck, 4),
    ];
    const discardables = combinations.filter(x => Rule.canDiscard(stackTop, x));

    const discards = discardables[random.next(discardables.length)];

    if (discards) {
        return {
            action: "discard",
            discards
        };
    } else {
        return {
            action: "pass"
        };
    }
}