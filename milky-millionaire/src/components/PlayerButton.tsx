import React, { ReactNode } from "react";
import "./PlayerButton.scss";

interface PlayerButtonProps {
    className?: string;
    disabled?: boolean;
    children?: ReactNode
}

export default function PlayerButton(props: Readonly<PlayerButtonProps>) {

    const classNames = ["player-button"];
    if (props.className) {
        classNames.push(props.className);
    }
    if (props.disabled) {
        classNames.push("disabled");
    }

    return (
        <div className={classNames.join(" ")}>
            {props.children}
        </div>
    );
}