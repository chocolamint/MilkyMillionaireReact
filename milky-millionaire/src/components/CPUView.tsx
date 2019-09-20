import React, { useState } from "react";
import "./CPUView.scss";
import { Card } from "../models/Card";
import { Random, TurnResult } from "../models/Game";
import { turnCPU } from "../models/CPU";
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

const waiting = { action: "waiting" } as const;
type TurnState = TurnResult | typeof waiting;

export default function CPU(props: CPUProps) {

    const [myState, setMyState] = useState(waiting as TurnState);

    if (props.isMyTurn && myState.action === "waiting") {
        setMyState(
            turnCPU(props.stackTop, props.cards, props.random)
        );
    }

    const isDiscarding = (card: Card) => {
        if (myState && myState.action === "discard") {
            return myState.discards.includes(card);
        }
        return false;
    };

    const hand = props.cards.filter(x => !isDiscarding(x));

    const handleAnimationEnd = () => {
        if (myState.action !== "waiting") {
            props.onTurnEnd(myState);
            setMyState(waiting);
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
            <div className="cards" data-card-count={hand.length}>
                {hand.map(x =>
                    <div className="card"></div>
                )}
            </div>
            {myState && myState.action === "discard" &&
                <div className="discarding" onAnimationEnd={handleAnimationEnd}>
                    {myState.discards.map(card => (
                        <CardView card={card} />
                    ))}
                </div>
            }
        </div>
    );
}