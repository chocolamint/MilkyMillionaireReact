import { Rule } from "../../models/Rule";
import { Card, Suit, Rank } from "../../models/Card";

describe("Rule", () => {

    describe("Rule.canDiscard method", () => {

        describe("when top is heart7", () => {
            it("should return true only if higher than stack top.", () => {

                const board = {
                    stack: [
                        [card("heart", 7)],
                        [card("spade", 5)],
                    ],
                };

                expect(Rule.canDiscard(board, [card("heart", 8)])).toBe(true);
                expect(Rule.canDiscard(board, [card("spade", 8)])).toBe(true);
                expect(Rule.canDiscard(board, [card("spade", 7)])).toBe(false);
                expect(Rule.canDiscard(board, [card("heart", 6)])).toBe(false);
            });
        });

        describe("when top is (heart7, diamond7)", () => {

            it("should return true only if card count is same.", () => {

                const board = {
                    stack: [
                        [card("heart", 7), card("diamond", 7)],
                        [card("spade", 5), card("club", 5)],
                    ],
                };

                expect(Rule.canDiscard(board, [card("heart", 8)])).toBe(false);
                expect(Rule.canDiscard(board, [card("spade", 8), card("club", 8), card("diamond", 8)])).toBe(false);
                expect(Rule.canDiscard(board, [card("spade", 8), card("club", 8)])).toBe(true);
            });

            it("should return false if card rank is different.", () => {

                const board = {
                    stack: [
                        [card("heart", 7), card("diamond", 7)],
                        [card("spade", 5), card("club", 5)],
                    ],
                };

                expect(Rule.canDiscard(board, [card("spade", 8), card("spade", 9)])).toBe(false);
            });
        });

        describe("when leader", () => {

            it("should return true.", () => {

                const board = {
                    stack: [],
                };

                expect(Rule.canDiscard(board, [card("spade", 3)])).toBe(true);
                expect(Rule.canDiscard(board, [card("spade", 3), card("club", 3)])).toBe(true);
                expect(Rule.canDiscard(board, [card("spade", 3), card("club", 3), card("heart", 3)])).toBe(true);
                expect(Rule.canDiscard(board, [card("spade", 3), card("club", 3), card("heart", 3), card("diamond", 3)])).toBe(true);
                expect(Rule.canDiscard(board, [card("spade", 2)])).toBe(true);
                expect(Rule.canDiscard(board, [joker()])).toBe(true);
            });
        });

        describe("Joker", () => {

            it("should be almighty.", () => {

                const board = {
                    stack: [
                        [card("heart", 7), card("diamond", 7)],
                        [card("spade", 5), card("club", 5)],
                    ],
                };

                expect(Rule.canDiscard(board, [card("spade", 8), joker()])).toBe(true);
                expect(Rule.canDiscard(board, [card("spade", 7), joker()])).toBe(false);
            });

            it("should be higher than pair of 2.", () => {

                const board = {
                    stack: [
                        [card("heart", 2), card("diamond", 2)],
                    ],
                };

                expect(Rule.canDiscard(board, [joker(), joker(true)])).toBe(true);
                expect(Rule.canDiscard(board, [card("spade", 2), joker()])).toBe(false);
            });
        });


        function card(suit: Suit, rank: Rank): Card {
            return { suit, rank };
        }
        function joker(extra: boolean = false): Card {
            return { joker: true, extra }
        }
    });
});
