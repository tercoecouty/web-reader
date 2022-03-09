import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IBookmarkState {
    bookmarks: number[];
}

const initialState: IBookmarkState = {
    bookmarks: [],
};

const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState,
    reducers: {
        addBookmark: (state, actions: PayloadAction<number>) => {
            const pageNumber = actions.payload;
            state.bookmarks.push(pageNumber);
        },
        removeBookmark: (state, actions: PayloadAction<number>) => {
            const pageNumber = actions.payload;
            state.bookmarks = state.bookmarks.filter((value) => value !== pageNumber);
        },
        setBookmark: (state, actions: PayloadAction<number[]>) => {
            const bookmarks = actions.payload;
            state.bookmarks = bookmarks;
        },
    },
});

export default bookmarkSlice.reducer;
export const bookmarkActions = bookmarkSlice.actions;
export const selectBookmarks = (state: RootState) => state.bookmark.bookmarks;
