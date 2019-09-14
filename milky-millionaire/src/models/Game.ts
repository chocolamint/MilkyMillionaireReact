import { Card } from "./Card";

export enum GameStatus {
    Playing,
    GameSet,
    Trading
}

export interface GameState {
    gameStatus: GameStatus;
    cpuDeck: Card[][];
    stack: Card[][];
    playerDeck: Card[]
}

export function shuffle<T>(array: readonly T[], randomGen: RandomGenerator): [T[], RandomGenerator] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const [j, rGen] = random(i + 1, randomGen);
        randomGen = rGen;
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return [shuffled, randomGen];
}

export function deal(cards: Card[], length: number): Card[][] {
    const r: Card[][] = [...Array(length)].map(_ => []);
    let i = 0;
    for (const card of cards) {
        r[i++ % length].push(card);
    }
    return r;
}

// https://sbfl.net/blog/2017/06/01/javascript-reproducible-random/
export type RandomGenerator = [number, number, number, number];

export function newRandomGenerator(seed: number = new Date().valueOf()): RandomGenerator {
    return [123456789, 362436069, 521288629, seed];
}

export function random(max: number, randomGen: RandomGenerator): [number, RandomGenerator] {

    // XorShift
    function nextDouble(randomGen: RandomGenerator): [number, RandomGenerator] {
        const [x, y, z, w] = randomGen;
        const t = x ^ (x << 11);
        const newX = y;
        const newY = z;
        const newZ = w;
        const newW = (w ^ (w >>> 19)) ^ (t ^ (t >>> 8));
        return [newW, [newX, newY, newZ, newW]];
    }

    const [num, newRandomGen] = nextDouble(randomGen);
    const r = Math.abs(num);
    return [r % max, newRandomGen];
}
