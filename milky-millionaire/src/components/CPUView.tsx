import React, { useState, Dispatch } from "react";
import "./CPUView.scss";
import { Card, cardToString } from "../models/Card";
import { Random, GameState } from "../models/Game";
import { turnCPU } from "../models/CPU";
import { connect } from "react-redux";
import { discard, pass, ActionTypes } from "../actions";
import { AppState } from "../reducers";

interface OwnProps {
    gameState: GameState;
    imageFileName: any;
    bgColor: string | undefined;
    color: string | undefined;
    name: string;
    isMyTurn: boolean;
    cards: readonly Card[];
    stackTop: Card[] | undefined;
    random: Random;
}

interface CPUActions {
    discard: (cards: Card[]) => void;
    pass: () => void;
}

type CPUViewProps = OwnProps & CPUActions & AppState;

function CPUView(props: CPUViewProps) {

    const [isPassing, setIsPassing] = useState(false);

    if (props.isMyTurn && !isPassing) {
        const result = turnCPU(props.stackTop, props.cards, props.random);
        if (result.action === "discard") {
            props.discard(result.discards);
        } else {
            setIsPassing(true);
            setTimeout(() => {
                // TODO: onAnimationEnd でやる
                props.pass();
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

export default connect(
    (state: CPUViewProps) => state,
    (dispatch: Dispatch<ActionTypes>) => ({
        discard: (cards: Card[]) => dispatch(discard(cards)),
        pass: () => dispatch(pass())
    })
)(CPUView);