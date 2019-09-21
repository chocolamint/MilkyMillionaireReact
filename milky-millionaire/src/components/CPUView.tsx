import React, { useState, Dispatch } from "react";
import "./CPUView.scss";
import { Card, cardToString } from "../models/Card";
import { Random } from "../models/Game";
import { turnCPU } from "../models/CPU";
import { connect } from "react-redux";
import { discardStarted, passStarted, ActionTypes, passDone } from "../actions";
import { AppState } from "../states";

interface OwnProps {
    imageFileName: any;
    bgColor: string | undefined;
    color: string | undefined;
    name: string;
    isMyTurn: boolean;
    cards: readonly Card[];
    stackTop: Card[] | undefined;
    random: Random;
}

type CPUViewProps = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function CPUView(props: CPUViewProps) {

    const isPassing = props.isPassing && props.isMyTurn;

    if (props.isMyTurn && !isPassing) {
        const result = turnCPU(props.stackTop, props.cards, props.random);
        if (result.action === "discard") {
            props.discard(result.discards);
        } else {
            props.pass();
        }
    }

    return (
        <div className={`cpu ${isPassing ? "pass" : ""} ${props.cards.length === 0 ? "clear" : ""}`} onAnimationEnd={props.endPass}>
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

function mapStateToProps(state: AppState) {
    return {
        isPassing: state.isPassing
    };
}

function mapDispatchToProps(dispatch: Dispatch<ActionTypes>) {
    return {
        discard: (cards: Card[]) => dispatch(discardStarted(cards)),
        pass: () => dispatch(passStarted()),
        endPass: () => dispatch(passDone())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CPUView);