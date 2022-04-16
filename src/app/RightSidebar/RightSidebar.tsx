import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./RightSidebar.less";
import SidebarItem from "../SidebarItem/SidebarItem";

import ArrowRightSvg from "./svg/arrow-right.svg";
import ArrowLeftSvg from "./svg/arrow-left.svg";
import UnderlineSvg from "./svg/underline.svg";
import EditSvg from "./svg/edit.svg";
import DeleteSvg from "./svg/delete.svg";

import Drawer from "../../component/Drawer/Drawer";
import EditNote from "../EditNote/EditNote";

import {
    selectRange,
    selectPages,
    selectPageNumber,
    selectCurrentNoteId,
    selectTwoPage,
    bookActions,
} from "../../slice/bookSlice";
import { disableNextPage } from "../../slice/bookSlice";
import { noteActions } from "../../slice/noteSlice";

import api from "../../api";

export default function RightSidebar() {
    const dispatch = useDispatch();
    const range = useSelector(selectRange);
    const pages = useSelector(selectPages);
    const pageNumber = useSelector(selectPageNumber);
    const currentNoteId = useSelector(selectCurrentNoteId);
    const twoPage = useSelector(selectTwoPage);
    const { nextPage, prevPage, setRange, setCurrentNoteId } = bookActions;
    const { addNote, deleteNote } = noteActions;
    const [editNote, setEditNote] = useState(true);

    const handleAddNote = async () => {
        const note = await api.addNote(range);
        dispatch(addNote(note));
        dispatch(setRange(null));
    };

    const handleDeleteNote = async () => {
        await api.deleteNote(currentNoteId);
        dispatch(deleteNote(currentNoteId));
        dispatch(setCurrentNoteId(null));
    };

    return (
        <div className="right-sidebar">
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
            <SidebarItem svg={EditSvg} title="编辑笔记" onClick={() => setEditNote(true)} disabled={!currentNoteId} />
            <Drawer visible={editNote} onClose={() => setEditNote(false)}>
                <EditNote />
            </Drawer>
        </div>
    );
}
