import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Book.less";
import Page from "../Page/Page";

import api from "../../api";
import Books from "./books";

import { bookActions, selectRange, selectTwoPage } from "../../slice/bookSlice";
import { bookmarkActions } from "../../slice/bookmarkSlice";
import { noteActions } from "../../slice/noteSlice";

export default function Book() {
    const dispatch = useDispatch();
    const range = useSelector(selectRange);
    const twoPage = useSelector(selectTwoPage);
    const { setPages, setPageLoading, setRange, nextPage, prevPage } = bookActions;
    const [bookText, setBookText] = useState("");
    const [resizeTimer, setResizeTimer] = useState(null);

    const loadPage = (bookText) => {
        const domPageContent = document.getElementById("page-content");
        const totalWidth = domPageContent.getBoundingClientRect().width;
        const totalHeight = domPageContent.getBoundingClientRect().height;
        const domMeasure = document.getElementById("char-measurement");
        const book = new Books(bookText, totalWidth, totalHeight, domMeasure);
        const pages = book.pageBreaking();
        dispatch(setPages(pages));
        dispatch(setPageLoading(false));
    };

    useEffect(() => {
        api.getLastRead()
            .then((lastRead) => {
                dispatch(bookActions.setPageNumber(lastRead));
                console.log("lastRead", lastRead);
                return api.getBookmarks();
            })
            .then((bookmarks) => {
                console.log(bookmarks);
                dispatch(bookmarkActions.setBookmark(bookmarks));
                return api.getNotes();
            })
            .then((notes) => {
                dispatch(noteActions.setNotes(notes));
                return api.getBookText();
            })
            .then((bookText) => {
                setBookText(bookText);
                setTimeout(() => loadPage(bookText), 100);
            });
    }, []);

    useEffect(() => {
        window.onresize = () => {
            clearTimeout(resizeTimer);
            dispatch(setPageLoading(true));
            const timer = setTimeout(() => loadPage(bookText), 1000);
            setResizeTimer(timer);
        };
        window.onkeydown = (e) => {
            switch (e.code) {
                case "Space":
                case "ArrowRight":
                case "ArrowDown":
                    dispatch(nextPage());
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    dispatch(prevPage());
                    break;
            }
        };
        window.onwheel = (e) => {
            if (e.wheelDeltaY < 0) {
                dispatch(nextPage());
            } else if (e.wheelDeltaY > 0) {
                dispatch(prevPage());
            }
        };
    });

    const handleMouseUp = () => {
        const selection = document.getSelection();
        const text = selection.toString();
        if (text === "") {
            if (range) {
                dispatch(setRange(null));
            }

            return;
        }

        const charId1 = parseInt(selection.anchorNode.parentElement.dataset.charId);
        const charId2 = parseInt(selection.focusNode.parentElement.dataset.charId);
        if (!charId1 || !charId2) return;

        dispatch(
            setRange({
                firstCharId: charId1 > charId2 ? charId2 : charId1,
                lastCharId: charId1 > charId2 ? charId1 : charId2,
                text,
            })
        );
    };

    return (
        <div className="book-content" onMouseUp={handleMouseUp}>
            <Page />
            {twoPage ? <Page isSecondPage /> : null}
        </div>
    );
}
