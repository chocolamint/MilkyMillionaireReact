import React from "react";
import "./CPUView.scss";
import { Card } from "../models/Card";
import { Random, TurnResult } from "../models/Game";
import { turnCPU } from "../models/CPU";

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

const waiting = { action: "waiting" } as const;

export default function CPU(props: CPUProps) {

    if (props.isMyTurn) {
        const result = turnCPU(props.stackTop, props.cards, props.random);
        props.onTurnEnd(result);
    }

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
        </div>
    );
}