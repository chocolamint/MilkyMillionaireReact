import React from "react";
import CardView from "./CardView";
import { cardToString, Card } from "../models/Card";
import "./Board.scss";

interface BoardProps {
    stack: Card[][];
    discarding: DiscardedCards | undefined;
    isTrickEnding: boolean;
    onGoToNextTrick: () => void;
    onDiscardingEnd: () => void;
}

export interface DiscardedCards {
    by: number;
    cards: Card[];
}

export default function Board(props: Readonly<BoardProps>) {
    return (
        <div className="board">
            <div className={`discarded ${props.isTrickEnding ? "next-trick" : ""}`} onAnimationEnd={handleNextTrickAnimationEnd}>
                {props.stack.map(cards =>
                    <div className="card-set" key={`discarded-set-${cards.map(cardToString).join("-")}`}>
                        {cards.map(card =>
                            <div className="card-container" key={`discarded-card-${cardToString(card)}`}>
                                <CardView card={card} />
                            </div>
                        )}
                    </div>
                )}
            </div>
            {props.discarding &&
                <div className={`discardings discardings-${props.discarding.by}`} onAnimationEnd={handleDiscardingAnimationEnd}>
                    <div className="card-set">
                        {props.discarding.cards.map(card =>
                            <div className="card-container" key={`discardings-card-${cardToString(card)}`}>
                                <CardView card={card} />
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    );

    function handleNextTrickAnimationEnd() {
        props.onGoToNextTrick();
    }

    function handleDiscardingAnimationEnd() {
        props.onDiscardingEnd();
    }
}