import React, { useState } from "react";
import "./PlayerView.scss";
import CardView from "./CardView";
import { Card, cardToString } from "../models/Card";
import { GameStatus, TurnResult } from "../models/Game";
import { Rule } from "../models/Rule";
import PlayerButton from "./PlayerButton";

export interface PlayerProps {
    rank: "大富豪" | "富豪" | "平民" | "貧民" | "大貧民";
    stackTop: readonly Card[];
    deck: readonly Card[];
    isMyTurn: boolean;
    gameStatus: GameStatus;
    onTurnEnd: (result: TurnResult) => void;
}

export default function Player(props: Readonly<PlayerProps>) {

    const [stagings, setStagings] = useState([] as Card[]);
    const deck = Rule.sortCards(props.deck);

    return (
        <div className="player">
            <div className="player-buttons">
                <PlayerButton className="pass-button" disabled={!props.isMyTurn} buttonColor="green" onClick={handlePassClick}>
                    パス
                </PlayerButton>
                {props.gameStatus !== GameStatus.GameSet ?
                    <PlayerButton className="discard-button" disabled={!canDiscard()} buttonColor="pink" onClick={handleDiscardClick}>
                        カードを出す
                    </PlayerButton> :
                    <PlayerButton className="next-game-button" buttonColor="pink">
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
                        <div className={classNames.join(" ")} key={`player-card-${cardToString(card)}`}>
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

    function canDiscard() {
        return props.isMyTurn && Rule.canDiscard(props.stackTop, stagings);
    }

    function handleCardClick(card: Card) {

        if (!props.isMyTurn) return;

        if (stagings.includes(card)) {
            setStagings(stagings.filter(x => x !== card));
        } else {
            setStagings(stagings.concat([card]));
        }
    }

    function handlePassClick() {
        props.onTurnEnd({ action: "pass" });
    }

    function handleDiscardClick() {
        const discards = stagings;
        setStagings([]);
        props.onTurnEnd({ action: "discard", discards });
    }
}