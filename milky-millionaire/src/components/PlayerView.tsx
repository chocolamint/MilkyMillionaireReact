import React, { useState } from "react";
import "./PlayerView.scss";
import CardView from "./CardView";
import { Card } from "../models/Card";
import { GameStatus } from "../models/Game";

export interface PlayerProps {
    rank: "大富豪" | "富豪" | "平民" | "貧民" | "大貧民";
    deck: readonly Card[];
    gameStatus: GameStatus;
}

export default function Player(props: PlayerProps) {

    const [stagings, setStagings] = useState([] as Card[]);

    return (
        <div className="player">
            <div className="player-buttons">
                <div className="pass-button player-button">
                    パス
                </div>
                {props.gameStatus !== GameStatus.GameSet ?
                    <div className="discard-button player-button">
                        カードを出す
                    </div> :
                    <div className="next-game-button player-button">
                        次のゲームへ
                    </div>
                }
            </div>
            <div className="player-rank">
                {props.rank}
            </div>
            <div className="deck">
                {props.deck.map(card =>
                    <div className={`card-container ${stagings.includes(card) ? "staging" : ""}`} onClick={() => handleCardClick(card)}>
                        <CardView card={card} />
                    </div>
                )}
            </div>
        </div>
    );

    function handleCardClick(card: Card) {
        if (stagings.includes(card)) {
            setStagings(stagings.filter(x => x !== card));
        } else {
            setStagings(stagings.concat([card]));
        }
    }
}