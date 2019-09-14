import React from "react";
import "./CPUView.scss";
import { Card } from "../models/Card";

export interface CPUProps {
    imageFileName: any;
    bgColor: string | undefined;
    color: string | undefined;
    name: string;
    cards: readonly Card[]
}

export default function CPU(props: CPUProps) {
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