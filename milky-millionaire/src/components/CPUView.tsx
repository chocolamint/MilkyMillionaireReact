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

    const [turnResult, setTurnResult] = useState(undefined as TurnResult | undefined);

    useEffect(() => {
        if (props.isMyTurn) {
            if (turnResult === undefined) {
                const result = turnCPU(props.stackTop, props.cards, props.random);
                setTurnResult(result);
            }
        }
    });

    const handleAnimationEnd = () => {
        if (turnResult !== undefined) {
            props.onTurnEnd(turnResult);
            setTurnResult(undefined);
        }
    };

    return (
        <div className={`cpu position-${props.position}`}>
            <div className="name">
                {props.name}
            </div>
            <div className="image" style={{ borderColor: props.color, backgroundColor: props.bgColor }}>
                <img src={`/assets/images/${props.imageFileName}`} alt="" />
            </div>
            <div className="cards" data-card-count={props.cards.length}>
                {props.cards.map(x =>
                    <div className="card"></div>
                )}
            </div>
            {turnResult && turnResult.action === "discard" &&
                <div className="discarding" onAnimationEnd={handleAnimationEnd}>
                    {turnResult.cards.map(card => (
                        <CardView card={card} />
                    ))}
                </div>
            }
        </div>
    );
}