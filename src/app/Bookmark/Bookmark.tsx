import React from "react";
import { useSelector, useDispatch } from "react-redux";

import BookmarkImage from "./bookmark.png";
import BookmarkFilledImage from "./bookmark-filled.png";

import { bookmarkActions } from "../../slice/bookmarkSlice";
import { selectBookmarks } from "../../slice/bookmarkSlice";

import api from "../../api";

interface IPageHeadProps {
    pageNumber?: number;
}

export default function Bookmark(props: IPageHeadProps) {
    const dispatch = useDispatch();
    const bookmarks = useSelector(selectBookmarks);
    const { addBookmark, removeBookmark } = bookmarkActions;
    const pageNumber = props.pageNumber;

    const hasBookmark = bookmarks.includes(pageNumber);

    const handleClick = async () => {
        if (hasBookmark) {
            await api.removeBookmark(pageNumber);
            dispatch(removeBookmark(pageNumber));
        } else {
            await api.addBookmark(pageNumber);
            dispatch(addBookmark(pageNumber));
        }
    };

    return (
        <div className="bookmark" onClick={handleClick}>
            <img src={hasBookmark ? BookmarkFilledImage : BookmarkImage} />
        </div>
    );
}
