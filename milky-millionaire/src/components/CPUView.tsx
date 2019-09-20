import React, { useEffect, useState } from "react";
import "./CPUView.scss";
import { Card } from "../models/Card";
import { Random, TurnResult } from "../models/Game";
import { turnCPU } from "../models/CPU";
import { cancellation, sleep } from "../AsyncHelper";
import CardView from "./CardView";

export interface CPUProps {
    imageFileName: any;
    bgColor: string | undefined;
    color: string | undefined;
    name: string;
    position: number;
    isMyTurn: boolean;
    cards: readonly Card[];
    stackTop: Card[] | undefined;
    random: Random;
    onTurnEnd: (result: TurnResult) => void;
}

export default function CPU(props: CPUProps) {

    const [turn, setTurn] = useState({ action: "waiting" } as TurnResult | { action: "waiting" });

    if (props.isMyTurn && turn.action === "waiting") {
        setTurn(
            turnCPU(props.stackTop, props.cards, props.random)
        );
    }

    const isDiscarding = (card: Card) => {
        if (turn && turn.action === "discard") {
            return turn.discards.includes(card);
        }
        return false;
    };

    const handleAnimationEnd = () => {
        if (turn.action !== "waiting") {
            props.onTurnEnd(turn);
            setTurn({ action: "waiting" });
        }
    };

    const hand = props.cards.filter(x => !isDiscarding(x));

    return (
        <div className={`cpu position-${props.position}`}>
            <div className="name">
                {props.name}
            </div>
            <div className="image" style={{ borderColor: props.color, backgroundColor: props.bgColor }}>
                <img src={`/assets/images/${props.imageFileName}`} alt="" />
            </div>
            <div className="cards" data-card-count={hand.length}>
                {hand.map(x =>
                    <div className="card"></div>
                )}
            </div>
            {turn && turn.action === "discard" &&
                <div className="discarding" onAnimationEnd={handleAnimationEnd}>
                    {turn.discards.map(card => (
                        <CardView card={card} />
                    ))}
                </div>
            }
        </div>
    );
}