import React from 'react';
import './App.css';
import Player from './components/Player';
import CPU from './components/CPU';
import Card from './components/Card';

export default function App() {

    const cpus = [{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }];
    const stack = {
        cards: [{
            cardSet: [{}]
        }]
    };
    const message = "";

    return (
        <div className="main">
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
            <div className="field">
                {stack.cards.map(cards =>
                    <div className="card-set">
                        {cards.cardSet.map(card =>
                            <div className="card-container">
                                <Card />
                            </div>
                        )}
                    </div>
                )}
            </div >
            <Player />
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
