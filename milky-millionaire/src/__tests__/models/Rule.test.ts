import { Rule } from "../../models/Rule";
import { allCards, NumberCard, Card } from "../../models/Card";

describe("Rule", () => {

    describe("canDiscard", () => {

        it.each([
            [[{ suit: "heart", rank: 3 } as Card]]
        ])("returns true if stack is empty.", cards => {

            expect(Rule.canDiscard({ stack: [] }, cards)).toBe(true);
        });
    });
});
