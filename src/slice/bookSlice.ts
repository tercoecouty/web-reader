import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPage, ILine } from "../app/Book/books";
import { RootState } from "../store";
import api from "../api";

interface IRange {
    firstCharId: number;
    lastCharId: number;
    text: string;
}

interface IBookState {
    pageNumber: number;
    pages: IPage[];
    pageLoading: boolean;
    range: IRange;
    currentNoteId: number;
    twoPage: boolean;
}

const initialState: IBookState = {
    pageNumber: 1,
    pages: [],
    pageLoading: true,
    range: null,
    currentNoteId: null,
    twoPage: true,
};

export function disableNextPage(pageNumber: number, totalPage: number, twoPage: boolean) {
    if (twoPage) {
        if (totalPage % 2 === 0) {
            return pageNumber === totalPage - 1;
        } else {
            return pageNumber === totalPage;
        }
    } else {
        return pageNumber === totalPage;
    }
}

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        nextPage: (state) => {
            if (disableNextPage(state.pageNumber, state.pages.length, state.twoPage)) return;

            if (state.twoPage) state.pageNumber += 2;
            else state.pageNumber += 1;
            api.setLastRead(state.pageNumber);

            state.currentNoteId = null;
            state.range = null;
        },
        prevPage: (state) => {
            if (state.pageNumber === 1) return;

            if (state.twoPage) state.pageNumber -= 2;
            else state.pageNumber -= 1;
            api.setLastRead(state.pageNumber);

            state.currentNoteId = null;
            state.range = null;
        },
        setPageNumber: (state, actions: PayloadAction<number>) => {
            state.pageNumber = actions.payload;
        },
        setPages: (state, actions: PayloadAction<IPage[]>) => {
            state.pages = actions.payload;
            if (state.pageNumber > state.pages.length) {
                state.pageNumber = 1;
                api.setLastRead(state.pageNumber);
            }
        },
        setPageLoading: (state, actions: PayloadAction<boolean>) => {
            state.pageLoading = actions.payload;
        },
        setRange: (state, actions: PayloadAction<IRange>) => {
            state.range = actions.payload;
        },
        setCurrentNoteId: (state, actions: PayloadAction<number>) => {
            state.currentNoteId = actions.payload;
        },
        setTwoPage: (state, actions: PayloadAction<boolean>) => {
            state.twoPage = actions.payload;
        },
    },
});

export default bookSlice.reducer;
export const bookActions = bookSlice.actions;
export const selectRange = (state: RootState) => state.book.range;
export const selectPages = (state: RootState) => state.book.pages;
export const selectPageNumber = (state: RootState) => state.book.pageNumber;
export const selectPageLoading = (state: RootState) => state.book.pageLoading;
export const selectCurrentNoteId = (state: RootState) => state.book.currentNoteId;
export const selectTwoPage = (state: RootState) => state.book.twoPage;
export const selectCurrentNoteIdByLine = (state, line: ILine) => {
    const currentNoteId = state.book.currentNoteId;
    if (currentNoteId === null) return null;

    const notes = state.note.notes;
    const firstCharId = line.firstCharId;
    const lastCharId = line.firstCharId + line.text.length - 1;
    let notesByLine = notes.filter((note) => {
        if (note.lastCharId < firstCharId || note.firstCharId > lastCharId) return false;
        return true;
    });

    for (const note of notesByLine) {
        if (note.id === currentNoteId) {
            return currentNoteId;
        }
    }

    return null;
};
