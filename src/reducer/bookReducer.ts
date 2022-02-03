import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPage } from "../component/BookContent/book";
import { RootState } from "../store";

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

            state.currentNoteId = null;
            state.range = null;
        },
        prevPage: (state) => {
            if (state.pageNumber === 1) return;

            if (state.twoPage) state.pageNumber -= 2;
            else state.pageNumber -= 1;

            state.currentNoteId = null;
            state.range = null;
        },
        setPages: (state, actions: PayloadAction<IPage[]>) => {
            state.pages = actions.payload;
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
export const { nextPage, prevPage, setPages, setPageLoading, setRange, setCurrentNoteId, setTwoPage } =
    bookSlice.actions;
export const selectRange = (state: RootState) => state.book.range;
export const selectPages = (state: RootState) => state.book.pages;
export const selectPageNumber = (state: RootState) => state.book.pageNumber;
export const selectPageLoading = (state: RootState) => state.book.pageLoading;
export const selectCurrentNoteId = (state: RootState) => state.book.currentNoteId;
export const selectTwoPage = (state: RootState) => state.book.twoPage;
