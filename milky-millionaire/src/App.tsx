import React from 'react';
import './App.scss';
import CPUView from './components/CPUView';
import CardView from './components/CardView';
import Player from './components/PlayerView';
import { GameStatus, RandomGenerator, shuffle } from './models/Game';
import { allCards } from './models/Card';

export default function App(props: { randomGen: RandomGenerator }) {

    const [cards, _] = shuffle(allCards, props.randomGen);
    const gameStatus = GameStatus.Playing;
    const cpus = [{
        name: "パクチー",
        color: "#F189C8",
        bgColor: "",
        imageFileName: "vegetable_pakuchi_coriander.png",
        cards: cards.slice(0, 11)
    }, {
        name: "日本酒",
        color: "#34BD67",
        bgColor: "",
        imageFileName: "masu_nihonsyu.png",
        cards: cards.slice(11, 22)
    }, {
        name: "餃子",
        color: "#26C4F0",
        bgColor: "",
        imageFileName: "food_gyouza_mise.png",
        cards: cards.slice(22, 33)
    }, {
        name: "かまぼこ",
        color: "#C97842",
        bgColor: "",
        imageFileName: "kamaboko_red.png",
        cards: cards.slice(33, 44)
    }];
    const stack = {
        cards: [{ cardSet: cards.slice(0, 3) }]
    };
    const playerInfo = {
        rank: "平民",
        deck: cards.slice(44)
    } as const;
    const message = "";

    return (
        <div className="main">
            <div className="board">
                <ul className="cpus">
                    {cpus.map(cpu => {
                        // CPUを描画
                        return (
                            <li className="cpu">
                                <CPUView {...cpu} />
                            </li>
                        );
                    })}
                </ul >
                <div className="discard">
                    {stack.cards.map(cards =>
                        <div className="card-set">
                            {cards.cardSet.map(card =>
                                <div className="card-container">
                                    <CardView card={card} />
                                </div>
                            )}
                        </div>
                    )}
                </div >
                <Player {...playerInfo} gameStatus={gameStatus} />
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
