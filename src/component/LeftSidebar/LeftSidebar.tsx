import React from "react";

import "./LeftSidebar.less";

import SidebarItem from "../SidebarItem/SidebarItem";

import TeamSvg from "./team.svg";
import BarsSvg from "./bars.svg";
import SearchSvg from "./search.svg";
import BookSvg from "./book.svg";
import SettingSvg from "./setting.svg";

export default function LeftSidebar() {
    return (
        <div className="left-sidebar">
            <SidebarItem svg={TeamSvg} title="班级列表" disabled />
            <SidebarItem svg={BarsSvg} title="我的笔记" disabled />
            <SidebarItem svg={BookSvg} title="书签" disabled />
            <SidebarItem svg={SearchSvg} title="搜索" disabled />
            <SidebarItem svg={SettingSvg} title="设置" disabled />
        </div>
    );
}
