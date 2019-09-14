import React from "react";
import CardView from "./CardView";
import { Card } from "../models/Card";

export interface PlayerProps {
    deck: readonly Card[]
}

export default function Player(props: PlayerProps) {
    return (
        <div className="player">
            <div className="players-cards">
                {props.deck.map(card =>
                    <CardView card={card} />
                )}
            </div>
        </div>
    );
}