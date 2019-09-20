import React, { ReactNode, EventHandler } from "react";
import "./PlayerButton.scss";

interface PlayerButtonProps {
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
    onClick?: () => void;
    buttonColor: "pink" | "green";
}

export default function PlayerButton(props: Readonly<PlayerButtonProps>) {

    const classNames = ["player-button", props.buttonColor];
    if (props.className) {
        classNames.push(props.className);
    }
    if (props.disabled) {
        classNames.push("disabled");
    }

    return (
        <div className={classNames.join(" ")} onClick={handleClick}>
            {props.children}
        </div>
    );

    function handleClick() {
        props.onClick && props.onClick();
    }
}