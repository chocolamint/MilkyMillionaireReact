import React from 'react';
import './App.scss';
import CPUView from './components/CPUView';
import CardView from './components/CardView';
import Player from './components/PlayerView';
import { GameStatus } from './models/Game';

export default function App() {

    const cards = [{
        suit: "heart", rank: 1
    }, {
        suit: "diamond", rank: 2
    }, {
        suit: "club", rank: 13
    }, {
        joker: true
    }] as const;
    const gameStatus = GameStatus.Playing;
    const cpus = [{
        name: "パクチー",
        color: "#F189C8",
        bgColor: "",
        imageFileName: "vegetable_pakuchi_coriander.png",
        cards: cards
    }, {
        name: "日本酒",
        color: "#34BD67",
        bgColor: "",
        imageFileName: "masu_nihonsyu.png",
        cards: cards
    }, {
        name: "餃子",
        color: "#26C4F0",
        bgColor: "",
        imageFileName: "food_gyouza_mise.png",
        cards: cards
    }, {
        name: "かまぼこ",
        color: "#C97842",
        bgColor: "",
        imageFileName: "kamaboko_red.png",
        cards: cards
    }];
    const stack = {
        cards: [{
            cardSet: cards.slice(0, 2)
        }, {
            cardSet: cards.slice(2, 4)
        }, {
            cardSet: cards.slice(1, 3)
        }]
    };
    const playerInfo = {
        rank: "平民",
        deck: cards
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
