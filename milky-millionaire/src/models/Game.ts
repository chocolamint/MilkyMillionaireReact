import { Card } from "./Card";

export enum GameStatus {
    Playing,
    GameSet,
    Trading
}

export interface GameState {
    gameStatus: GameStatus;
    cpuDeck: Card[][];
    currentTurn: number;
    stack: Card[][];
    playerDeck: Card[]
}

export function shuffle<T>(array: readonly T[], random: Random): T[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = random.next(i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function deal(cards: Card[], length: number): Card[][] {
    const r: Card[][] = [...Array(length)].map(_ => []);
    let i = 0;
    for (const card of cards) {
        r[i++ % length].push(card);
    }
    return r;
}

export interface Random {
    next(max: number): number;
}
// https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/
export function newRandom(seed: number = new Date().valueOf()): Random {

    const generator = nextRandom(seed);
    return {
        next(max: number): number {
            const next = generator.next();
            if (next.done) throw new Error();
            return next.value(max);
        }
    }

    function* nextRandom(seed: number) {
        let gen = [123456789, 362436069, 521288629, seed];
        let num;
        while (true) {
            [num, gen] = nextDouble(gen);
            const r = Math.abs(num);
            yield (max: number) => r % max;
        }
    }

    // XorShift
    function nextDouble([x, y, z, w]: number[]): [number, number[]] {
        const t = x ^ (x << 11);
        const newX = y;
        const newY = z;
        const newZ = w;
        const newW = (w ^ (w >>> 19)) ^ (t ^ (t >>> 8));
        return [newW, [newX, newY, newZ, newW]];
    }
}
