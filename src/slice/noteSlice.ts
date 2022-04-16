import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILine } from "../app/Book/books";

interface INote {
    id: number;
    text: string;
    time: number;
    firstCharId: number;
    lastCharId: number;
}

interface INoteState {
    notes: INote[];
}

const initialState: INoteState = {
    notes: [],
};

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        addNote: (state, actions: PayloadAction<INote>) => {
            state.notes.push(actions.payload);
        },
        deleteNote: (state, actions: PayloadAction<number>) => {
            const noteId = actions.payload;
            state.notes = state.notes.filter((note) => note.id !== noteId);
        },
        setNotes: (state, actions: PayloadAction<INote[]>) => {
            state.notes = actions.payload;
        },
    },
});

export default noteSlice.reducer;
export const noteActions = noteSlice.actions;
export const selectNotesByLine = (state, line: ILine) => {
    const notes = state.note.notes as INote[];
    const firstCharId = line.firstCharId;
    const lastCharId = line.firstCharId + line.text.length - 1;
    let notesByLine = notes.filter((note) => {
        if (note.lastCharId < firstCharId || note.firstCharId > lastCharId) return false;
        return true;
    });

    return JSON.stringify(notesByLine);
};
