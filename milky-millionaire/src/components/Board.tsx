import React, { Dispatch } from "react";
import CardView from "./CardView";
import { cardToString, Card } from "../models/Card";
import "./Board.scss";
import { goneToNextTrick, ActionTypes, endDiscarding } from "../actions";
import { AppState, DiscardedCards } from "../reducers";
import { connect } from "react-redux";

interface OwnProps {
}

type OwnState = Pick<AppState, "stack" | "discarding" | "isTrickEnding">;

interface OwnActions {
    endDiscarding: () => void;
    goneToNextTrick: () => void;
}

type BoardProps = OwnProps & OwnState & OwnActions;


function Board(props: Readonly<BoardProps>) {
    return (
        <div className="board">
            <div className={`discarded ${props.isTrickEnding ? "next-trick" : ""}`} onAnimationEnd={props.goneToNextTrick}>
                {props.stack.map(cards =>
                    <div className="card-set" key={`discarded-set-${cards.map(cardToString).join("-")}`}>
                        {cards.map(card =>
                            <div className="card-container" key={`discarded-card-${cardToString(card)}`}>
                                <CardView card={card} />
                            </div>
                        )}
                    </div>
                )}
            </div>
            {props.discarding &&
                <div className={`discardings discardings-${props.discarding.by}`} onAnimationEnd={props.endDiscarding}>
                    <div className="card-set">
                        {props.discarding.cards.map(card =>
                            <div className="card-container" key={`discardings-card-${cardToString(card)}`}>
                                <CardView card={card} />
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default connect(
    (state: AppState) => ({
        stack: state.stack,
        discarding: state.discarding,
        isTrickEnding: state.isTrickEnding,
    }),
    (dispatch: Dispatch<ActionTypes>) => ({
        goneToNextTrick: () => dispatch(goneToNextTrick()),
        endDiscarding: () => dispatch(endDiscarding())
    })
)(Board);