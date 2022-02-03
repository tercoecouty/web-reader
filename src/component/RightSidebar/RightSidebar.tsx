import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./RightSidebar.less";
import SidebarItem from "../SidebarItem/SidebarItem";

import FullscreenOutlined from "@ant-design/icons/FullscreenOutlined";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";
import UnderlineOutlined from "@ant-design/icons/UnderlineOutlined";
import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";

import { nextPage, prevPage, setRange, setCurrentNoteId } from "../../reducer/bookReducer";
import {
    selectRange,
    selectPages,
    selectPageNumber,
    selectCurrentNoteId,
    selectTwoPage,
} from "../../reducer/bookReducer";
import { disableNextPage } from "../../reducer/bookReducer";
import { addNote, deleteNote } from "../../reducer/noteReducer";

export default function RightSidebar() {
    const dispatch = useDispatch();
    const range = useSelector(selectRange);
    const pages = useSelector(selectPages);
    const pageNumber = useSelector(selectPageNumber);
    const currentNoteId = useSelector(selectCurrentNoteId);
    const twoPage = useSelector(selectTwoPage);

    const handleAddNote = () => {
        dispatch(addNote(range));
        dispatch(setRange(null));
    };

    const handleDeleteNote = () => {
        dispatch(deleteNote());
        dispatch(setCurrentNoteId(null));
    };

    return (
        <div className="right-sidebar">
            <SidebarItem Icon={FullscreenOutlined} title="全屏" disabled />
            <SidebarItem
                Icon={ArrowLeftOutlined}
                title="上一页"
                onClick={() => dispatch(prevPage())}
                disabled={pageNumber === 1}
            />
            <SidebarItem
                Icon={ArrowRightOutlined}
                title="下一页"
                onClick={() => dispatch(nextPage())}
                disabled={disableNextPage(pageNumber, pages.length, twoPage)}
            />
            <SidebarItem Icon={UnderlineOutlined} title="划线" onClick={handleAddNote} disabled={!range} />
            <SidebarItem Icon={DeleteOutlined} title="删除笔记" onClick={handleDeleteNote} disabled={!currentNoteId} />
            <SidebarItem Icon={EditOutlined} title="编辑笔记" disabled />
        </div>
    );
}
