import React, { useState } from "react";
import "./PlayerView.scss";
import CardView from "./CardView";
import { Card } from "../models/Card";
import { GameStatus } from "../models/Game";
import { Rule } from "../models/Rule";
import PlayerButton from "./PlayerButton";

export interface PlayerProps {
    rank: "大富豪" | "富豪" | "平民" | "貧民" | "大貧民";
    stackTop: readonly Card[];
    deck: readonly Card[];
    isMyTurn: boolean;
    gameStatus: GameStatus;
}

export default function Player(props: Readonly<PlayerProps>) {

    const [stagings, setStagings] = useState([] as Card[]);
    const deck = Rule.sortCards(props.deck);

    return (
        <div className="player">
            <div className="player-buttons">
                <PlayerButton className="pass-button">
                    パス
                </PlayerButton>
                {props.gameStatus !== GameStatus.GameSet ?
                    <PlayerButton className="discard-button">
                        カードを出す
                    </PlayerButton> :
                    <PlayerButton className="next-game-button">
                        次のゲームへ
                    </PlayerButton>
                }
            </div>
            <div className="player-rank">
                {props.rank}
            </div>
            <div className="deck">
                {deck.map(card => {

                    const classNames = ["card-container"];
                    stagings.includes(card) && classNames.push("staging");

                    return (
                        <div className={classNames.join(" ")}>
                            <CardView card={card}
                                disabled={props.isMyTurn && !canToggle(card)}
                                onClick={handleCardClick}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );

    function canToggle(card: Card) {
        return stagings.includes(card) ? true : canStage(card);
    }

    function canStage(card: Card) {
        return Rule.canDiscard(props.stackTop, stagings.concat([card]));
    }

    function handleCardClick(card: Card) {

        if (!props.isMyTurn) return;

        if (stagings.includes(card)) {
            setStagings(stagings.filter(x => x !== card));
        } else {
            setStagings(stagings.concat([card]));
        }
    }
}