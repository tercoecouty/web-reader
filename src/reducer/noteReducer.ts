import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IRange {
    firstCharId: number;
    lastCharId: number;
    text: string;
}

interface INote {
    id: number;
    text: string;
    time: number;
    firstCharId: number;
    lastCharId: number;
}

interface INoteState {
    notes: INote[];
    noteId: number;
}

const initialState: INoteState = {
    notes: [],
    noteId: 1,
};

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        addNote: (state, actions: PayloadAction<IRange>) => {
            const { firstCharId, lastCharId, text } = actions.payload;
            const note: INote = {
                id: state.noteId++,
                time: Date.now(),
                text,
                firstCharId,
                lastCharId,
            };
            state.notes.push(note);
        },
        deleteNote: (state, actions: PayloadAction<number>) => {
            const noteId = actions.payload;
            state.notes = state.notes.filter((note) => note.id !== noteId);
        },
    },
});

export default noteSlice.reducer;
export const { addNote, deleteNote } = noteSlice.actions;
export const selectNotes = (state: RootState) => state.note.notes;
