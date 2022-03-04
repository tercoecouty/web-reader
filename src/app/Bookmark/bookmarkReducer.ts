import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

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
        addBookMark: (state, actions: PayloadAction<number>) => {
            const pageNumber = actions.payload;
            state.bookmarks.push(pageNumber);
        },
        removeBookMark: (state, actions: PayloadAction<number>) => {
            const pageNumber = actions.payload;
            state.bookmarks = state.bookmarks.filter((value) => value !== pageNumber);
        },
    },
});

export default bookmarkSlice.reducer;
export const { addBookMark, removeBookMark } = bookmarkSlice.actions;
export const selectBookmarks = (state: RootState) => state.bookmark.bookmarks;
