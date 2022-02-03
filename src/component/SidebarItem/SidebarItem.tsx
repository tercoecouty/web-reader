import React from "react";

import "./SidebarItem.less";

interface ISidebarItemProps {
    disabled?: boolean;
    Icon: any;
    title: string;
    onClick?: () => void;
}

export default function SidebarItem(props: ISidebarItemProps) {
    const { Icon, disabled, title, onClick } = props;

    const handleClick = () => {
        if (disabled) return;
        if (onClick) onClick();
    };

    let classNames = ["sidebar-item"];
    if (disabled) {
        classNames.push("disabled");
    }

    return (
        <div className={classNames.join(" ")} onClick={handleClick} title={title}>
            <Icon />
        </div>
    );
}
