import React from 'react';
import './App.scss';
import CPU from './components/CPU';
import CardView from './components/CardView';
import Player from './components/PlayerView';
import { GameStatus } from './models/Game';

export default function App() {

    const gameStatus = GameStatus.Playing;
    const cpus = [{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }];
    const stack = {
        cards: [{
            cardSet: [{
                suit: "heart", rank: 1
            }, {
                suit: "diamond", rank: 2
            }, {
                suit: "club", rank: 13
            }, {
                joker: true
            }] as const
        }]
    };
    const playerInfo = {
        rank: "平民",
        deck: [{
            suit: "heart", rank: 1
        }, {
            suit: "diamond", rank: 2
        }, {
            suit: "club", rank: 13
        }, {
            joker: true
        }]
    } as const;
    const message = "";

    return (
        <div className="main">
            <div className="board">
                <ul className="computers">
                    {cpus.map(cpu => {
                        // CPUを描画
                        return (
                            <li>
                                <CPU name={cpu.name} />
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
