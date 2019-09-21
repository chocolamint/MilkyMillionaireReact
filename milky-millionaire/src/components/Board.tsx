import React, { Dispatch } from "react";
import CardView from "./CardView";
import { cardToString } from "../models/Card";
import "./Board.scss";
import { goneToNextTrick, ActionTypes, endDiscarding } from "../actions";
import { connect } from "react-redux";
import { AppState } from "../states";

interface OwnProps {

}

type BoardProps = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

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

function mapStateToProps(state: AppState) {
    return {
        stack: state.stack,
        discarding: state.discarding,
        isTrickEnding: state.isTrickEnding,
    };
}

function mapDispatchToProps(dispatch: Dispatch<ActionTypes>) {
    return {
        goneToNextTrick: () => dispatch(goneToNextTrick()),
        endDiscarding: () => dispatch(endDiscarding())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
