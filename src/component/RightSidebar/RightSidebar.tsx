import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./RightSidebar.less";
import SidebarItem from "../SidebarItem/SidebarItem";

import FullscreenSvg from "./fullscreen.svg";
import ArrowRightSvg from "./arrow-right.svg";
import ArrowLeftSvg from "./arrow-left.svg";
import UnderlineSvg from "./underline.svg";
import EditOutSvg from "./edit.svg";
import DeleteSvg from "./delete.svg";

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
        dispatch(deleteNote(currentNoteId));
        dispatch(setCurrentNoteId(null));
    };

    return (
        <div className="right-sidebar">
            <SidebarItem svg={FullscreenSvg} title="全屏" disabled />
            <SidebarItem
                svg={ArrowLeftSvg}
                title="上一页"
                onClick={() => dispatch(prevPage())}
                disabled={pageNumber === 1}
            />
            <SidebarItem
                svg={ArrowRightSvg}
                title="下一页"
                onClick={() => dispatch(nextPage())}
                disabled={disableNextPage(pageNumber, pages.length, twoPage)}
            />
            <SidebarItem svg={UnderlineSvg} title="划线" onClick={handleAddNote} disabled={!range} />
            <SidebarItem svg={DeleteSvg} title="删除笔记" onClick={handleDeleteNote} disabled={!currentNoteId} />
            <SidebarItem svg={EditOutSvg} title="编辑笔记" disabled />
        </div>
    );
}
