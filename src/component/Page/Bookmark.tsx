import React from "react";
import { useSelector, useDispatch } from "react-redux";

import BookmarkImage from "./bookmark.png";
import BookmarkFilledImage from "./bookmark-filled.png";

import { addBookMark, removeBookMark } from "../../reducer/bookmarkReducer";
import { selectBookmarks } from "../../reducer/bookmarkReducer";

interface IPageHeadProps {
    pageNumber?: number;
}

export default function Bookmark(props: IPageHeadProps) {
    const dispatch = useDispatch();
    const bookmarks = useSelector(selectBookmarks);
    const pageNumber = props.pageNumber;

    const hasBookmark = bookmarks.includes(pageNumber);

    const handleClick = () => {
        if (hasBookmark) dispatch(removeBookMark(pageNumber));
        else dispatch(addBookMark(pageNumber));
    };

    return (
        <div className="bookmark" onClick={handleClick}>
            <img src={hasBookmark ? BookmarkFilledImage : BookmarkImage} />
        </div>
    );
}
