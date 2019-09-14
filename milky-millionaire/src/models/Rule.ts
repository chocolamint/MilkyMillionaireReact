import { Card } from "./Card";

export const Rule = {

    canDiscard(board: { stack: Card[][] }, cards: Card[]) {

        const [stackTop] = board.stack;

        if (stackTop) {
            if (stackTop.length !== cards.length) return false;
            return true;
        } else {
            return true;
        }
    }
}