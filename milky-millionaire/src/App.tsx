import React, { useState } from 'react';
import './App.scss';
import CPUView from './components/CPUView';
import CardView from './components/CardView';
import Player from './components/PlayerView';
import { GameStatus, Random, shuffle, deal, TurnResult } from './models/Game';
import { allCards, Card } from './models/Card';

export default function App(props: { random: Random }) {

    const { random } = props;
    const cards = shuffle(allCards, random);
    const dealCards = shuffle(deal(cards, 5), random);
    const currentTurn = random.next(5);

    const [gameState, setGameState] = useState({
        gameStatus: GameStatus.Playing,
        cpuDeck: dealCards.slice(0, 4),
        currentTurn,
        stack: [] as Card[][],
        playerDeck: dealCards[4]
    });

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
            <div className="board">
                <ul className="cpus">
                    {gameInfo.cpus.map((cpu, i) => {
                        // CPUを描画
                        return (
                            <li className="cpu">
                                <CPUView {...cpu}
                                    isMyTurn={i === gameState.currentTurn}
                                    position={i}
                                    cards={gameState.cpuDeck[i]}
                                    stackTop={gameState.stack[0]}
                                    random={random}
                                    onTurnEnd={handleTurnEnd} />
                            </li>
                        );
                    })}
                </ul >
                <div className="discard">
                    {gameState.stack.map(cards =>
                        <div className="card-set">
                            {cards.map(card =>
                                <div className="card-container">
                                    <CardView card={card} />
                                </div>
                            )}
                        </div>
                    )}
                </div >
                <Player {...gameInfo.player} deck={gameState.playerDeck} gameStatus={gameState.gameStatus} />
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

    function handleTurnEnd(result: TurnResult) {
        const cpuDeck = gameState.cpuDeck[gameState.currentTurn];
        const nextTurn = gameState.currentTurn === 4 ? 0 : gameState.currentTurn + 1;
        if (result.action === "pass") {
            setGameState({
                ...gameState,
                currentTurn: nextTurn
            });
        } else {
            const newDeck = cpuDeck.filter(x => !result.discards.includes(x));
            setGameState({
                ...gameState,
                currentTurn: nextTurn,
                stack: [result.discards, ...gameState.stack],
                cpuDeck: gameState.cpuDeck.map((d, i) => i === gameState.currentTurn ? newDeck : d),
            });
        }
    }
}
