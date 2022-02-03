import React from "react";

import "./LeftSidebar.less";

import SidebarItem from "../SidebarItem/SidebarItem";

import TeamOutlined from "@ant-design/icons/TeamOutlined";
import BarsOutlined from "@ant-design/icons/BarsOutlined";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import BookOutlined from "@ant-design/icons/BookOutlined";
import SettingOutlined from "@ant-design/icons/SettingOutlined";

export default function LeftSidebar() {
    return (
        <div className="left-sidebar">
            <SidebarItem Icon={TeamOutlined} title="班级列表" disabled />
            <SidebarItem Icon={BarsOutlined} title="我的笔记" disabled />
            <SidebarItem Icon={BookOutlined} title="书签" disabled />
            <SidebarItem Icon={SearchOutlined} title="搜索" disabled />
            <SidebarItem Icon={SettingOutlined} title="设置" disabled />
        </div>
    );
}
