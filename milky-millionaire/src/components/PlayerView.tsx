import React, { useState, Dispatch } from "react";
import "./PlayerView.scss";
import CardView from "./CardView";
import { Card, cardToString } from "../models/Card";
import { GameStatus } from "../models/Game";
import { Rule } from "../models/Rule";
import PlayerButton from "./PlayerButton";
import { connect } from "react-redux";
import { pass, ActionTypes, discardStarted } from "../actions";
import { AppState } from "../states";

interface OwnProps {
    rank: "大富豪" | "富豪" | "平民" | "貧民" | "大貧民";
    isMyTurn: boolean;
}

type PlayerViewProps = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function PlayerView(props: Readonly<PlayerViewProps>) {

    const [stagings, setStagings] = useState([] as Card[]);
    const deck = Rule.sortCards(props.deck);

    return (
        <div className={`player ${deck.length === 0 ? "clear" : ""}`}>
            <div className="player-buttons">
                <PlayerButton className="pass-button" disabled={!props.isMyTurn} buttonColor="green" onClick={handlePassClick}>
                    パス
                </PlayerButton>
                {props.gameStatus !== GameStatus.GameSet ?
                    <PlayerButton className="discard-button" disabled={!canDiscard()} buttonColor="pink" onClick={handleDiscardClick}>
                        カードを出す
                    </PlayerButton> :
                    <PlayerButton className="next-game-button" buttonColor="pink">
                        次のゲームへ
                    </PlayerButton>
                }
            </div>
            <div className="player-rank">
                {props.rank}
            </div>
            <div className="deck">
                {deck.map(card => {

                    const classNames = ["card-container"];
                    stagings.includes(card) && classNames.push("staging");

                    return (
                        <div className={classNames.join(" ")} key={`player-card-${cardToString(card)}`}>
                            <CardView card={card}
                                disabled={props.isMyTurn && !canToggle(card)}
                                onClick={handleCardClick}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );

    function canToggle(card: Card) {
        return stagings.includes(card) ? true : canStage(card);
    }

    function canStage(card: Card) {
        return Rule.canDiscard(props.stackTop, stagings.concat([card]));
    }

    function canDiscard() {
        return props.isMyTurn && Rule.canDiscard(props.stackTop, stagings);
    }

    function handleCardClick(card: Card) {

        if (!props.isMyTurn) return;

        if (stagings.includes(card)) {
            setStagings(stagings.filter(x => x !== card));
        } else {
            setStagings(stagings.concat([card]));
        }
    }

    function handlePassClick() {
        props.pass();
    }

    function handleDiscardClick() {
        const discards = stagings;
        setStagings([]);
        props.discard(discards);
    }
}

function mapStateToProps(state: AppState) {
    return {
        gameStatus: state.gameStatus,
        stackTop: state.stack[0],
        deck: state.decks[state.decks.length - 1]
    };
}

function mapDispatchToProps(dispatch: Dispatch<ActionTypes>) {
    return {
        discard: (cards: Card[]) => dispatch(discardStarted(cards)),
        pass: () => dispatch(pass())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerView);