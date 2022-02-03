import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Page.less";

import { setCurrentNoteId } from "../../reducer/bookReducer";
import { selectPages, selectPageLoading, selectCurrentNoteId } from "../../reducer/bookReducer";
import { selectNotes } from "../../reducer/noteReducer";

interface IPageProps {
    pageNumber: number;
}

export default function Page(props: IPageProps) {
    const dispatch = useDispatch();
    const pageNumber = props.pageNumber;
    const pages = useSelector(selectPages);
    const loading = useSelector(selectPageLoading);
    const notes = useSelector(selectNotes);
    const currentNoteId = useSelector(selectCurrentNoteId);

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
            } else {
                return (
                    <span data-char-id={charId} key={index}>
                        {char}
                    </span>
                );
            }
        });
    };

    const getPageContent = () => {
        const lines = pages[pageNumber - 1].lines;
        return lines.map((line, index) => {
            let style: any = {
                letterSpacing: line.spacing + "px",
                paddingBottom: `${4 + pages[0].spacing / 2}px`,
                paddingTop: `${4 + pages[0].spacing / 2}px`,
            };

            if (line.isFirstLine) {
                style.marginLeft = "2em";
            }

            return (
                <div key={index} className="line" style={style}>
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

    return (
        <div className="page">
            <div className="page-head"></div>
            <div className="page-body">
                <div id="page-content" className="page-content" onClick={handleClick}>
                    <span id="char-measurement" className="char-measurement"></span>
                    {loading ? pageLoading : pageNumber > pages.length ? null : getPageContent()}
                </div>
            </div>
            <div className="page-foot">
                {loading ? null : pageNumber > pages.length ? null : `${pageNumber} / ${pages.length}`}
            </div>
        </div>
    );
}
