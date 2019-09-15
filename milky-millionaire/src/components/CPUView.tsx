import React, { useEffect } from "react";
import "./CPUView.scss";
import { Card } from "../models/Card";
import { GameState, Random, TurnResult } from "../models/Game";
import { turnCPU } from "../models/CPU";
import { cancellation, sleep } from "../AsyncHelper";

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

    useEffect(() => {
        if (props.isMyTurn) {
            const [source, token] = cancellation();
            (async () => {
                const result = turnCPU(props.stackTop, props.cards, props.random);
                await sleep(500, token);
                props.onTurnEnd(result);
            })();
            return () => source.cancel();
        }
    });

    return (
        <div className="cpu">
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
        </div >
    );
}