import React, { useState } from 'react';
import './App.scss';
import CPUView from './components/CPUView';
import CardView from './components/CardView';
import Player from './components/PlayerView';
import { GameStatus, RandomGenerator, shuffle, deal } from './models/Game';
import { allCards } from './models/Card';

export default function App(props: { randomGen: RandomGenerator }) {

    const [cards, randomGen2] = shuffle(allCards, props.randomGen);
    const [dealCards, randomGen3] = shuffle(deal(cards, 5), randomGen2);

    const [cpuCards, setCPUCards] = useState(dealCards.slice(0, 4));

    const gameInfo = {
        gameStatus: GameStatus.Playing,
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
        stack: [cards.slice(0, 3)],
        player: {
            rank: "平民" as const,
            deck: cards.slice(44)
        }
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
                                <CPUView {...cpu} cards={cpuCards[i]} />
                            </li>
                        );
                    })}
                </ul >
                <div className="discard">
                    {gameInfo.stack.map(cards =>
                        <div className="card-set">
                            {cards.map(card =>
                                <div className="card-container">
                                    <CardView card={card} />
                                </div>
                            )}
                        </div>
                    )}
                </div >
                <Player {...gameInfo.player} gameStatus={gameInfo.gameStatus} />
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
}
