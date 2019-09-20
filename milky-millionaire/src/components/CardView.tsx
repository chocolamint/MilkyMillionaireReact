import React from "react";
import './CardView.scss';
import { Card } from "../models/Card";

export interface CardViewProps {
    card: Card;
    disabled?: boolean;
    onClick?: (card: Card) => void;
}

export default function (props: Readonly<CardViewProps>) {

    const { card } = props;
    const classes = ["card", card.joker ? "joker" : card.suit];
    props.disabled && classes.push("disabled");

    return (
        <div className={classes.join(" ")} onClick={handleClick}>
            {card.joker ?
                <div>
                    <span>Joker</span>
                </div>
                :
                <div>
                    <span className="suit">
                        {(() => {
                            switch (card.suit) {
                                case "heart": return "♥";
                                case "diamond": return "♦";
                                case "club": return "♣";
                                case "spade": return "♠";
                                default: throw new Error();
                            }
                        })()}
                    </span>
                    <span className="rank" data-rank={card.rank}>
                        {(() => {
                            switch (card.rank) {
                                case 1: return "A";
                                case 11: return "J";
                                case 12: return "Q";
                                case 13: return "K";
                                default: return String(card.rank);
                            }
                        })()}
                    </span>
                </div>
            }
        </div>
    );

    function handleClick() {
        if (props.disabled) return;
        props.onClick && props.onClick(props.card);
    }
}