import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ILine } from "..//component/BookContent/book";

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
    noteId: 1, // for generating unique note id
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
