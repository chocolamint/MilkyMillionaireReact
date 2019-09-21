import React, { Dispatch } from "react";
import "./CPUView.scss";
import { Card, cardToString } from "../models/Card";
import { Random, combination, TurnResult } from "../models/Game";
import { connect } from "react-redux";
import { discardStarted, passStarted, ActionTypes, passDone } from "../actions";
import { AppState } from "../states";
import { Rule } from "../models/Rule";

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

function turnCPU(stackTop: readonly Card[] | undefined, deck: readonly Card[], random: Random): TurnResult {

    const combinations = [
        ...combination(deck, 1),
        ...combination(deck, 2),
        ...combination(deck, 3),
        ...combination(deck, 4),
    ];
    const discardables = combinations.filter(x => Rule.canDiscard(stackTop, x));

    const discards = discardables[random.next(discardables.length)];

    if (discards) {
        return {
            action: "discard",
            discards
        };
    } else {
        return {
            action: "pass"
        };
    }
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