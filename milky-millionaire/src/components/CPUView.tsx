import React, { useState } from "react";
import "./CPUView.scss";
import { Card, cardToString } from "../models/Card";
import { Random, TurnResult } from "../models/Game";
import { turnCPU } from "../models/CPU";

export interface CPUProps {
    imageFileName: any;
    bgColor: string | undefined;
    color: string | undefined;
    name: string;
    isMyTurn: boolean;
    cards: readonly Card[];
    stackTop: Card[] | undefined;
    random: Random;
    onTurnEnd: (result: TurnResult) => void;
}

export default function CPU(props: CPUProps) {

    const [isPassing, setIsPassing] = useState(false);

    if (props.isMyTurn && !isPassing) {
        const result = turnCPU(props.stackTop, props.cards, props.random);
        if (result.action === "discard") {
            props.onTurnEnd(result);
        } else {
            setIsPassing(true);
            setTimeout(() => {
                props.onTurnEnd({ action: "pass" });
                setIsPassing(false);
            }, 500);
        }
    }

    return (
        <div className={`cpu ${isPassing ? "pass" : ""} ${props.cards.length === 0 ? "clear" : ""}`}>
            <div className="name">
                {props.name}
            </div>
            <div className="image" style={{ borderColor: props.color, backgroundColor: props.bgColor }}>
                <img src={`/assets/images/${props.imageFileName}`} alt="" />
            </div>
            <div className="cards" data-card-count={props.cards.length}>
                {props.cards.map(x =>
                    <div className="card" key={`cpu-card-${cardToString(x)}`}></div>
                )}
            </div>
        </div>
    );
}