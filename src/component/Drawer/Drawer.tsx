import React, { useState } from "react";

import "./Drawer.less";

import Icon from "../Icon/Icon";

import CloseSvg from "./close.svg";

interface IDrawerProps {
    visible: Boolean;
    children: JSX.Element;
    onClose?: () => void;
}

export default function Drawer(props: IDrawerProps) {
    if (!props.visible) return null;

    const handleClick = (e) => {
        if (e.target.closest(".drawer-container")) return;
        // if (props.onClose) props.onClose();
    };

    const handleClose = () => {
        if (props.onClose) props.onClose();
    };

    return (
        <div className="drawer" onClick={handleClick}>
            <div className="drawer-container">
                <div className="drawer-head">
                    <div className="drawer-close" onClick={handleClose}>
                        <Icon svg={CloseSvg} />
                    </div>
                    <div className="drawer-title">Edit Note</div>
                </div>
                <div className="drawer-body">{props.children}</div>
            </div>
        </div>
    );
}
