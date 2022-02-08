import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Page.less";
import BookmarkImage from "./bookmark.png";
import BookmarkFilledImage from "./bookmark-filled.png";

import { setCurrentNoteId } from "../../reducer/bookReducer";
import { selectPages, selectPageLoading, selectCurrentNoteId, selectPageNumber } from "../../reducer/bookReducer";
import { selectNotes } from "../../reducer/noteReducer";
import { addBookMark, removeBookMark } from "../../reducer/bookmarkReducer";
import { selectBookmarks } from "../../reducer/bookmarkReducer";

interface IPageProps {
    isPageTwo?: boolean;
}

export default function Page(props: IPageProps) {
    const dispatch = useDispatch();
    const _pageNumber = useSelector(selectPageNumber);
    const pageNumber = props.isPageTwo ? _pageNumber + 1 : _pageNumber;
    const pages = useSelector(selectPages);
    const loading = useSelector(selectPageLoading);
    const notes = useSelector(selectNotes);
    const currentNoteId = useSelector(selectCurrentNoteId);
    const bookmarks = useSelector(selectBookmarks);

    const getLineContent = (lineText: string, firstCharId: number) => {
        return Array.from(lineText).map((char, index) => {
            const charId = firstCharId + index;
            let noteId = null;

            for (const note of notes) {
                if (charId >= note.firstCharId && charId <= note.lastCharId) {
                    noteId = note.id;
                    break;
                }
            }

            if (noteId) {
                const className = currentNoteId && currentNoteId === noteId ? "underline-selected" : "underline";
                return (
                    <span data-note-id={noteId} data-char-id={charId} key={index} className={className}>
                        {char}
                    </span>
                );
            }

            return (
                <span data-char-id={charId} key={index}>
                    {char}
                </span>
            );
        });
    };

    const getPageContent = () => {
        console.log(Date.now());
        const lines = pages[pageNumber - 1].lines;
        return lines.map((line, index) => {
            let style: any = {
                letterSpacing: line.spacing + "px",
                padding: `${5 + pages[0].spacing / 2}px 0`,
            };

            if (line.isFirstLine) {
                style.marginLeft = "2em";
            }

            if (line.text === "") {
                style.height = "1.2em";
                style.boxSizing = "content-box";
            }

            return (
                <div key={index} className="line" style={style} data-para-id={line.paraId}>
                    {getLineContent(line.text, line.firstCharId)}
                </div>
            );
        });
    };

    const pageLoading = (
        <div className="page-loading">
            <span>加载中......</span>
        </div>
    );

    const handleClick = (e) => {
        const noteId = parseInt(e.target.dataset.noteId);
        if (!noteId) {
            if (currentNoteId) {
                dispatch(setCurrentNoteId(null));
            }
        }

        dispatch(setCurrentNoteId(noteId));
    };

    const getBookMarkContent = () => {
        if (loading || pageNumber > pages.length) return null;
        if (bookmarks.includes(pageNumber)) {
            return (
                <div className="bookmark" onClick={() => dispatch(removeBookMark(pageNumber))}>
                    <img src={BookmarkFilledImage} />
                </div>
            );
        } else {
            return (
                <div className="bookmark" onClick={() => dispatch(addBookMark(pageNumber))}>
                    <img src={BookmarkImage} />
                </div>
            );
        }
    };

    return (
        <div className="page">
            <div className="page-head">{getBookMarkContent()}</div>
            <div className="page-body">
                <div id="page-content" className="page-content" onClick={handleClick}>
                    <span id="char-measurement" className="char-measurement"></span>
                    {loading ? pageLoading : pageNumber > pages.length ? null : getPageContent()}
                </div>
            </div>
            <div className="page-foot">
                {loading || pageNumber > pages.length ? null : `${pageNumber} / ${pages.length}`}
            </div>
        </div>
    );
}
