import React, { useState } from 'react';
import './App.scss';
import CPUView from './components/CPUView';
import CardView from './components/CardView';
import Player from './components/PlayerView';
import { GameStatus, Random, shuffle, deal, TurnResult } from './models/Game';
import { allCards, Card, cardToString } from './models/Card';

interface DiscardedCards {
    by: number;
    cards: Card[];
}

export default function App(props: { random: Random }) {

    const { random } = props;
    const cards = shuffle(allCards, random);
    const dealCards = shuffle(deal(cards, 5), random);
    const currentTurn = random.next(5);

    const [gameState, setGameState] = useState({
        gameStatus: GameStatus.Playing,
        decks: dealCards,
        currentTurn,
        stack: [] as Card[][],
        passCount: 0,
        lastDiscard: undefined as number | undefined
    });
    const [discarding, setDiscarding] = useState(undefined as DiscardedCards | undefined);
    const [isTrickEnding, setIsTrickEnding] = useState(false);

    const gameInfo = {
        cpus: [{
            name: "パクチー",
            color: "#F189C8",
            bgColor: "",
            imageFileName: "vegetable_pakuchi_coriander.png"
        }, {
            name: "日本酒",
            color: "#34BD67",
            bgColor: "",
            imageFileName: "masu_nihonsyu.png"
        }, {
            name: "餃子",
            color: "#26C4F0",
            bgColor: "",
            imageFileName: "food_gyouza_mise.png"
        }, {
            name: "かまぼこ",
            color: "#C97842",
            bgColor: "",
            imageFileName: "kamaboko_red.png"
        }],
        player: {
            rank: "平民" as const,
        },
    };
    const message = "";

    return (
        <div className="main">
            <div className="game">
                <ul className="cpus">
                    {gameInfo.cpus.map((cpu, i) => {
                        return (
                            <li className="cpu" key={`cpu-${i}`}>
                                <CPUView {...cpu}
                                    isMyTurn={isYourTurn(i)}
                                    cards={gameState.decks[i]}
                                    stackTop={gameState.stack[0]}
                                    random={random}
                                    onTurnEnd={handleTurnEnd} />
                            </li>
                        );
                    })}
                </ul>
                <div className="board">
                    <div className={`discarded ${isTrickEnding ? "next-trick" : ""}`} onAnimationEnd={goToNextTrick}>
                        {gameState.stack.map(cards =>
                            <div className="card-set" key={`discarded-set-${cards.map(cardToString).join("-")}`}>
                                {cards.map(card =>
                                    <div className="card-container" key={`discarded-card-${cardToString(card)}`}>
                                        <CardView card={card} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {discarding &&
                        <div className={`discardings discardings-${discarding.by}`} onAnimationEnd={handleAnimationEnd}>
                            <div className="card-set">
                                {discarding.cards.map(card =>
                                    <div className="card-container" key={`discardings-card-${cardToString(card)}`}>
                                        <CardView card={card} />
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                </div>
                <Player {...gameInfo.player}
                    stackTop={gameState.stack[0]}
                    deck={gameState.decks[4]}
                    gameStatus={gameState.gameStatus}
                    isMyTurn={isYourTurn(4)}
                    onTurnEnd={handleTurnEnd}
                />
            </div>
            {message &&
                <div className="message">
                    <div className="message-text">
                        {message}
                    </div>
                </div>
            }
        </div>
    );

    function isYourTurn(position: number) {
        return gameState.currentTurn === position &&
            discarding === undefined &&
            !isTrickEnding;
    }

    function goToNextTrick() {
        setIsTrickEnding(false);
        setGameState({
            ...gameState,
            stack: [],
            currentTurn: gameState.lastDiscard!,
            passCount: 0,
            lastDiscard: undefined
        });
    }

    function handleTurnEnd(result: TurnResult) {
        const deck = gameState.decks[gameState.currentTurn];
        if (result.action === "pass") {
            console.log(`${gameState.currentTurn}がパス`);
            const passCount = gameState.passCount + 1;
            if (passCount === 4) {
                console.log(`次のトリックへ`);
                setIsTrickEnding(true);
            } else {
                setGameState({
                    ...gameState,
                    currentTurn: getNextTurn(),
                    passCount
                });
            }
        } else {
            console.log(`${gameState.currentTurn}が${result.discards.map(cardToString).join(",")}を捨てた`);
            const newDeck = deck.filter(x => !result.discards.includes(x));
            setDiscarding({
                by: gameState.currentTurn,
                cards: result.discards
            });
            setGameState({
                ...gameState,
                stack: gameState.stack,
                decks: gameState.decks.map((d, i) => i === gameState.currentTurn ? newDeck : d),
                lastDiscard: gameState.currentTurn,
                passCount: 0
            });
        }
    }

    function handleAnimationEnd() {
        if (discarding !== undefined) {
            setGameState({
                ...gameState,
                stack: [discarding.cards, ...gameState.stack],
                currentTurn: getNextTurn()
            });
            setDiscarding(undefined);
        }
    }

    function getNextTurn() {
        return gameState.currentTurn === 4 ? 0 : gameState.currentTurn + 1;
    }
}
