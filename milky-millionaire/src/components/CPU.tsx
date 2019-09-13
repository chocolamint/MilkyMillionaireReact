import React from "react";

export interface CPUProps {
    name: string;
}

export default function CPU(props: CPUProps) {
    return <div className="cpu">{props.name}</div>;
}